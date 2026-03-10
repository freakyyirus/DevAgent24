import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  // In production: exchange code for Supabase session
  // Redirect to dashboard after successful auth
  const redirectUrl = new URL('/dashboard', req.url);

  return NextResponse.redirect(redirectUrl);
}
