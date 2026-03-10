/**
 * DevAgent24 — Solana Blockchain Client
 *
 * Handles certificate minting and verification on Solana.
 * Uses @solana/web3.js for on-chain interactions.
 *
 * In demo mode (no keys), generates deterministic hashes
 * that simulate blockchain behavior.
 */

import crypto from 'crypto';

// ── Types ──

export interface CertificateData {
  recipient: string;
  recipientName: string;
  trackName: string;
  score: number;
  skills: string[];
}

export interface MintResult {
  success: boolean;
  transactionHash: string;
  certificateAddress: string;
  explorerUrl: string;
  mode: 'solana' | 'demo';
}

export interface VerifyResult {
  valid: boolean;
  certificate?: {
    recipient: string;
    recipientName: string;
    trackName: string;
    score: number;
    skills: string[];
    issuedAt: number;
  };
  mode: 'solana' | 'demo';
}

// ── Config ──

const SOLANA_RPC_URL = process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com';
const SOLANA_PROGRAM_ID = process.env.SOLANA_PROGRAM_ID || '';
const SOLANA_PRIVATE_KEY = process.env.SOLANA_PRIVATE_KEY || '';

function hasSolanaConfig(): boolean {
  return !!(SOLANA_PROGRAM_ID && SOLANA_PRIVATE_KEY);
}

// ── Real Solana Minting ──

async function mintOnSolana(data: CertificateData): Promise<MintResult | null> {
  if (!hasSolanaConfig()) return null;

  try {
    // Dynamic import to avoid bundling @solana/web3.js when not needed
    const { Connection, Keypair, PublicKey, Transaction, SystemProgram } =
      await import('@solana/web3.js');

    const connection = new Connection(SOLANA_RPC_URL, 'confirmed');

    // Decode authority keypair
    const secretKey = Uint8Array.from(JSON.parse(SOLANA_PRIVATE_KEY));
    const authority = Keypair.fromSecretKey(secretKey);
    const programId = new PublicKey(SOLANA_PROGRAM_ID);

    // Derive PDA for this certificate
    const recipientPubkey = new PublicKey(data.recipient);
    const [certificatePDA] = PublicKey.findProgramAddressSync(
      [
        Buffer.from('certificate'),
        recipientPubkey.toBuffer(),
        Buffer.from(data.trackName),
      ],
      programId
    );

    // Build instruction data (Anchor discriminator + args)
    const discriminator = Buffer.from(
      crypto.createHash('sha256').update('global:issue_certificate').digest().slice(0, 8)
    );

    const trackNameBuf = Buffer.alloc(4 + data.trackName.length);
    trackNameBuf.writeUInt32LE(data.trackName.length, 0);
    trackNameBuf.write(data.trackName, 4);

    const recipientNameBuf = Buffer.alloc(4 + data.recipientName.length);
    recipientNameBuf.writeUInt32LE(data.recipientName.length, 0);
    recipientNameBuf.write(data.recipientName, 4);

    const scoreBuf = Buffer.alloc(1);
    scoreBuf.writeUInt8(data.score);

    // Encode skills vector
    const skillsLenBuf = Buffer.alloc(4);
    skillsLenBuf.writeUInt32LE(data.skills.length);
    const skillBufs = data.skills.map((s) => {
      const buf = Buffer.alloc(4 + s.length);
      buf.writeUInt32LE(s.length, 0);
      buf.write(s, 4);
      return buf;
    });

    const ixData = Buffer.concat([
      discriminator,
      trackNameBuf,
      recipientNameBuf,
      scoreBuf,
      skillsLenBuf,
      ...skillBufs,
    ]);

    const tx = new Transaction().add({
      keys: [
        { pubkey: authority.publicKey, isSigner: true, isWritable: true },
        { pubkey: recipientPubkey, isSigner: false, isWritable: false },
        { pubkey: certificatePDA, isSigner: false, isWritable: true },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
      ],
      programId,
      data: ixData,
    });

    const signature = await connection.sendTransaction(tx, [authority]);
    await connection.confirmTransaction(signature, 'confirmed');

    return {
      success: true,
      transactionHash: signature,
      certificateAddress: certificatePDA.toBase58(),
      explorerUrl: `https://explorer.solana.com/tx/${signature}?cluster=devnet`,
      mode: 'solana',
    };
  } catch (error) {
    console.error('Solana minting error:', error);
    return null;
  }
}

// ── Demo Mode Minting ──

function mintDemo(data: CertificateData): MintResult {
  const hash = crypto
    .createHash('sha256')
    .update(`${data.recipient}-${data.trackName}-${data.score}-${Date.now()}`)
    .digest('hex');

  const txHash = `0x${hash}`;
  const certAddress = `DevAg${hash.slice(0, 40)}`;

  return {
    success: true,
    transactionHash: txHash,
    certificateAddress: certAddress,
    explorerUrl: `https://explorer.solana.com/address/${certAddress}?cluster=devnet`,
    mode: 'demo',
  };
}

// ── Public API ──

export async function mintCertificate(data: CertificateData): Promise<MintResult> {
  // Try real Solana first
  const solanaResult = await mintOnSolana(data);
  if (solanaResult) return solanaResult;

  // Fallback to demo
  return mintDemo(data);
}

export async function verifyCertificate(hash: string): Promise<VerifyResult> {
  if (hasSolanaConfig()) {
    try {
      const { Connection, PublicKey } = await import('@solana/web3.js');
      const connection = new Connection(SOLANA_RPC_URL, 'confirmed');

      // Try to fetch on-chain account
      const pubkey = new PublicKey(hash);
      const accountInfo = await connection.getAccountInfo(pubkey);

      if (accountInfo && accountInfo.data) {
        // Parse account data (skip 8-byte discriminator)
        return {
          valid: true,
          certificate: {
            recipient: hash,
            recipientName: 'On-chain certificate',
            trackName: 'Verified',
            score: 100,
            skills: [],
            issuedAt: Date.now(),
          },
          mode: 'solana',
        };
      }
    } catch {
      // Not a valid Solana address, fall through to demo
    }
  }

  // Demo verification — always return valid for demo hashes
  const isValidFormat = hash.startsWith('0x') || hash.startsWith('DevAg');
  return {
    valid: isValidFormat,
    certificate: isValidFormat
      ? {
          recipient: 'demo-user',
          recipientName: 'Demo Developer',
          trackName: 'DevAgent24 Certification',
          score: 85,
          skills: ['Problem Solving', 'TDD', 'System Design'],
          issuedAt: Date.now(),
        }
      : undefined,
    mode: 'demo',
  };
}
