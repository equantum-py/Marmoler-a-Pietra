export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, '') ?? '';
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabaseRestUrl = supabaseUrl ? `${supabaseUrl}/rest/v1` : '';
export const supabaseAuthUrl = supabaseUrl ? `${supabaseUrl}/auth/v1` : '';

export const authCookieNames = {
  accessToken: 'pietra-sb-access-token',
  refreshToken: 'pietra-sb-refresh-token',
};
