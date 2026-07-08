'use server';

import { getSiteSettings as readSiteSettings, saveSiteSettings } from '@/lib/site-settings';
import type { MaterialFormState } from '@/lib/supabase/types';

export async function getSiteSettings() {
  return readSiteSettings();
}

export async function updateSiteSettings(state: MaterialFormState, formData: FormData) {
  return saveSiteSettings(state, formData);
}
