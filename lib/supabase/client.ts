import { supabaseAnonKey, supabaseAuthUrl, supabaseRestUrl } from '@/lib/supabase/config';

type FetchOptions = {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: unknown;
  accessToken?: string;
  prefer?: string;
};

export async function supabaseFetch<T>(path: string, options: FetchOptions = {}): Promise<T> {
  if (!supabaseRestUrl || !supabaseAnonKey) {
    throw new Error('Supabase is not configured.');
  }

  const headers: HeadersInit = {
    apikey: supabaseAnonKey,
    Authorization: `Bearer ${options.accessToken ?? supabaseAnonKey}`,
  };

  if (options.body) {
    headers['Content-Type'] = 'application/json';
  }

  if (options.prefer) {
    headers.Prefer = options.prefer;
  }

  const response = await fetch(`${supabaseRestUrl}${path}`, {
    method: options.method ?? 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: 'no-store',
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Supabase request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export async function supabaseAuthFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  if (!supabaseAuthUrl || !supabaseAnonKey) {
    throw new Error('Supabase Auth is not configured.');
  }

  const response = await fetch(`${supabaseAuthUrl}${path}`, {
    ...options,
    headers: {
      apikey: supabaseAnonKey,
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Supabase Auth request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}
