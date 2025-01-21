import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://svgiplyjhtsqjeihemfb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2Z2lwbHlqaHRzcWplaWhlbWZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU4NjQ0NzAsImV4cCI6MjAyMTQ0MDQ3MH0.0pMkGEOKQxrwXjMzhxWEEWK4O9nWXFZ_SkYBgRhfT_4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});