export type PublicSiteSettings = {
  id: string;
  logo_desktop?: string | null;
  logo_mobile?: string | null;
  company_name?: string | null;
  whatsapp?: string | null;
  email?: string | null;
  address?: string | null;
  instagram?: string | null;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function getPublicSiteSettings(): Promise<PublicSiteSettings | null> {
  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  try {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/site_settings?id=eq.pietra&select=*&limit=1`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
        next: { revalidate: 60 },
      },
    );

    if (!response.ok) {
      return null;
    }

    const rows = await response.json();

    return Array.isArray(rows) ? rows[0] ?? null : null;
  } catch {
    return null;
  }
}
