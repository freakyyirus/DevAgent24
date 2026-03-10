import { NextRequest, NextResponse } from 'next/server';
import { mintCertificate } from '@/lib/blockchain/solana-client';
import { triggerN8nWebhook } from '@/lib/n8n-client';

export async function POST(req: NextRequest) {
  try {
    const { userId, trackName, score, skills, recipientName } = await req.json();

    if (!trackName || score === undefined) {
      return NextResponse.json({ error: 'Track name and score are required' }, { status: 400 });
    }

    // Mint certificate on Solana (or demo mode)
    const mintResult = await mintCertificate({
      recipient: userId || 'demo-user-pubkey',
      recipientName: recipientName || 'Developer',
      trackName,
      score: Math.min(100, Math.max(0, score)),
      skills: skills || [],
    });

    if (!mintResult.success) {
      return NextResponse.json({ error: 'Certificate minting failed' }, { status: 500 });
    }

    const certificate = {
      id: mintResult.certificateAddress,
      user_id: userId || 'demo',
      track_name: trackName,
      score,
      blockchain_hash: mintResult.transactionHash,
      explorer_url: mintResult.explorerUrl,
      certificate_address: mintResult.certificateAddress,
      pdf_url: '#',
      issued_at: new Date().toISOString(),
      recipient_name: recipientName || 'Developer',
      skills: skills || [],
      verified: true,
      mode: mintResult.mode,
    };

    // Trigger n8n webhook (non-blocking)
    triggerN8nWebhook('certificate_issued', {
      certificate_id: certificate.id,
      recipient: certificate.recipient_name,
      track: certificate.track_name,
      score: certificate.score,
      blockchain_hash: certificate.blockchain_hash,
    }).catch(() => {}); // Don't fail the request if webhook fails

    return NextResponse.json(certificate);
  } catch (error) {
    console.error('Certificate issuance error:', error);
    return NextResponse.json({ error: 'Certificate issuance failed' }, { status: 500 });
  }
}
