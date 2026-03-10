import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

// Basic in-memory rate limiting (Note: In a multi-region deployment like Vercel Edge, 
// this is per-instance. For strict global limiting, use Upstash Redis.)
const rateLimit = new Map<string, { count: number; reset: number }>();

export async function middleware(request: NextRequest) {
  const isApiRoute = request.nextUrl.pathname.startsWith('/api');

  // 1. Rate Limiting for API routes
  if (isApiRoute) {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute
    
    // Granular limits based on route
    let limit = 20; // Default
    if (request.nextUrl.pathname.includes('/api/execute-code')) limit = 10;
    if (request.nextUrl.pathname.includes('/api/interview')) limit = 15;
    if (request.nextUrl.pathname.includes('/api/travel')) limit = 5;

    const record = rateLimit.get(ip);

    if (!record || now > record.reset) {
      rateLimit.set(ip, { count: 1, reset: now + windowMs });
    } else {
      if (record.count >= limit) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Try again in a minute.', limit, current: record.count }, 
          { status: 429 }
        );
      }
      record.count++;
    }
  }

  // 2. Supabase Auth Session update
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return await updateSession(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
