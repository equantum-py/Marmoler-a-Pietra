import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { authCookieNames, isSupabaseConfigured } from '@/lib/supabase/config';
import { supabaseAuthFetch } from '@/lib/supabase/client';

type PasswordGrantResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user: { email?: string };
};

type SupabaseUserResponse = {
  email?: string;
  user_metadata?: Record<string, unknown>;
};

export async function signInAdmin(email: string, password: string) {
  const session = await supabaseAuthFetch<PasswordGrantResponse>('/token?grant_type=password', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  const cookieStore = await cookies();
  cookieStore.set(authCookieNames.accessToken, session.access_token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: session.expires_in,
  });
  cookieStore.set(authCookieNames.refreshToken, session.refresh_token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });

  return session.user;
}

export async function signOutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(authCookieNames.accessToken);
  cookieStore.delete(authCookieNames.refreshToken);
}

export async function getAdminAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get(authCookieNames.accessToken)?.value;
}

export async function getAdminUser(): Promise<SupabaseUserResponse | null> {
  if (!isSupabaseConfigured) {
    return { email: 'mock@pietra.local', user_metadata: { name: 'Admin Pietra' } };
  }

  const token = await getAdminAccessToken();
  if (!token) {
    return null;
  }

  try {
    return await supabaseAuthFetch<SupabaseUserResponse>('/user', {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch {
    return null;
  }
}

export async function requireAdminUser() {
  const user = await getAdminUser();

  if (!user) {
    redirect('/admin/login');
  }

  return user;
}
