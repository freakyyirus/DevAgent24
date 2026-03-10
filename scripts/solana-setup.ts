import { Keypair, Connection, LAMPORTS_PER_SOL } from '@solana/web3.js';
import * as fs from 'fs';
import * as path from 'path';

/**
 * DevAgent24 — Solana Setup Utility
 * 
 * Run with: npx ts-node scripts/solana-setup.ts
 */

async function setup() {
  console.log('🚀 Starting DevAgent24 Solana Setup...');

  const keypairPath = path.join(process.cwd(), 'solana-authority.json');
  let secretKey: Uint8Array;
  let publicKey: string;

  if (fs.existsSync(keypairPath)) {
    console.log('✅ Found existing keypair at:', keypairPath);
    const secret = JSON.parse(fs.readFileSync(keypairPath, 'utf-8'));
    const keypair = Keypair.fromSecretKey(Uint8Array.from(secret));
    secretKey = keypair.secretKey;
    publicKey = keypair.publicKey.toBase58();
  } else {
    console.log('🔧 Generating new keypair...');
    const keypair = Keypair.generate();
    fs.writeFileSync(keypairPath, JSON.stringify(Array.from(keypair.secretKey)));
    console.log('✅ Generated new keypair and saved to:', keypairPath);
    secretKey = keypair.secretKey;
    publicKey = keypair.publicKey.toBase58();
  }

  console.log('🔑 Public Key:', publicKey);
  console.log('⚠️ Secret Key (save this safely):', JSON.stringify(Array.from(secretKey)));

  // Try airdrop
  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
  console.log('💧 Requesting devnet airdrop (1 SOL)...');
  try {
    const signature = await connection.requestAirdrop(
      Keypair.fromSecretKey(secretKey).publicKey,
      LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(signature);
    console.log('✅ Airdrop successful!');
  } catch (e) {
    console.log('❌ Airdrop failed (rate limited?):', (e as Error).message);
    console.log('👉 You can manually get airdrop here: https://faucet.solana.com/');
  }

  const balance = await connection.getBalance(Keypair.fromSecretKey(secretKey).publicKey);
  console.log('💰 Current Balance:', balance / LAMPORTS_PER_SOL, 'SOL');

  console.log('\n--- NEXT STEPS FOR PRODUCTION ---');
  console.log('1. Open .env.local');
  console.log('2. Set SOLANA_PRIVATE_KEY=' + JSON.stringify(Array.from(secretKey)));
  console.log('3. Set SOLANA_PROGRAM_ID= [Your Deployed Program ID]');
  console.log('4. Run "anchor deploy" if you have the Solana CLI installed.');
  console.log('\n🚀 You are now ready to mint real certificates on Devnet!');
}

setup().catch(console.error);
