import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('Missing Supabase environment variables - using memory storage');
}

export const supabase = createClient(
  supabaseUrl || 'http://localhost:54321', 
  supabaseServiceKey || 'dummy-key'
);