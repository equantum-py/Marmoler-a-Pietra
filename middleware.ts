import { NextResponse, type NextRequest } from 'next/server';
import { authCookieNames, supabaseAnonKey, supabaseAuthUrl } from '@/lib/supabase/config';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith('/admin') || pathname === '/admin/login') {
    return NextResponse.next();
  }

  if (!supabaseAuthUrl || !supabaseAnonKey) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get(authCookieNames.accessToken)?.value;

  if (!accessToken) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  const response = await fetch(`${supabaseAuthUrl}/user`, {
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const redirectResponse = NextResponse.redirect(new URL('/admin/login', request.url));
    redirectResponse.cookies.delete(authCookieNames.accessToken);
    redirectResponse.cookies.delete(authCookieNames.refreshToken);
    return redirectResponse;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
