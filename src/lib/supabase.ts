import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://svgiplyjhtsqjeihemfb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2Z2lwbHlqaHRzcWplaWhlbWZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU3NjQzNzAsImV4cCI6MjAyMTM0MDM3MH0.SbUXc7oE7LmYl7DPBgLNXEgbw_GEVQQjjY0Lj_dkHlA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});