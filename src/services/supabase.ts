import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://iemwqsvithplxqnwrenz.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_wI8QuFbvUrl48W_EJs1ZJQ_kwz3P8As';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
