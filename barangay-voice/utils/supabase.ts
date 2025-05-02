import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kfrjzutpdbffwhejqshm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtmcmp6dXRwZGJmZndoZWpxc2htIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxOTcyOTEsImV4cCI6MjA2MDc3MzI5MX0.mEI6muSCuplnHMpyetNzunovhnf0T9FesKkC3Apdgt8';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase URL or Anon Key');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);