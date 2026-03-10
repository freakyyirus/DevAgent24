import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const { userId, trackName, score, skills, recipientName } = await req.json();

    // Generate blockchain-style hash
    const data = `${userId}-${trackName}-${score}-${Date.now()}`;
    const hash = '0x' + crypto.createHash('sha256').update(data).digest('hex');

    // In production: mint NFT on Polygon, upload PDF to IPFS via Pinata
    const certificate = {
      id: crypto.randomUUID(),
      user_id: userId || 'demo',
      track_name: trackName,
      score,
      blockchain_hash: hash,
      pdf_url: '#',
      issued_at: new Date().toISOString(),
      recipient_name: recipientName || 'Developer',
      skills: skills || [],
      verified: true,
    };

    return NextResponse.json(certificate);
  } catch (error) {
    return NextResponse.json({ error: 'Certificate issuance failed' }, { status: 500 });
  }
}
