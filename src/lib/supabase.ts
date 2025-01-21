import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://svgiplyjhtsqjeihemfb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2Z2lwbHlqaHRzcWplaWhlbWZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2MDEzNjYsImV4cCI6MjA1MjE3NzM2Nn0.8TUsyOACeoIVRxgj_ZuUaufXbze4NJHq8IRhJwqsQF0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: 'supabase.auth.token'
  }
});