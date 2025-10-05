import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabase = null as any;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  // Don't throw during import - allow the app to run even if env vars are not set
  // (e.g., during build or local dev without .env). We'll fallback to logging in saveApplication.
  console.warn('Supabase env vars are not set. saveApplication will fall back to console logging.');
}

export interface ApplicationData {
  instagram: string;
  full_name: string;
  university: string;
  degree: string;
  phone: string;
  why_you: string;
  experience: string;
  female_uk: boolean;
  privacy: boolean;
}

export async function saveApplication(data: ApplicationData): Promise<void> {
  try {
    if (!supabase) {
      console.log('Supabase client not available - logging application data instead of saving.');
      console.log('=== APPLICATION DATA ===');
      console.log('Timestamp:', new Date().toISOString());
      console.log('Data:', JSON.stringify(data, null, 2));
      console.log('========================');
      return;
    }

    const { error } = await supabase
      .from('applications')
      .insert([data]);

    if (error) {
      console.error('Supabase error:', error);
      console.log('Falling back to console logging');
      console.log('=== APPLICATION DATA ===');
      console.log('Timestamp:', new Date().toISOString());
      console.log('Data:', JSON.stringify(data, null, 2));
      console.log('========================');
      return;
    }
  } catch (err) {
    console.error('Database connection error:', err);
    console.log('Falling back to console logging');
    console.log('=== APPLICATION DATA ===');
    console.log('Timestamp:', new Date().toISOString());
    console.log('Data:', JSON.stringify(data, null, 2));
    console.log('========================');
  }
}