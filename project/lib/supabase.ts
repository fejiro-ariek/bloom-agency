import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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