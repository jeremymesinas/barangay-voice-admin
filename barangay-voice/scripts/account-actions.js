
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kfrjzutpdbffwhejqshm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtmcmp6dXRwZGJmZndoZWpxc2htIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxOTcyOTEsImV4cCI6MjA2MDc3MzI5MX0.mEI6muSCuplnHMpyetNzunovhnf0T9FesKkC3Apdgt8';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtmcmp6dXRwZGJmZndoZWpxc2htIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NTE5NzI5MSwiZXhwIjoyMDYwNzczMjkxfQ.mdQPhCkTe00_f4WpdoG-KpgOuhat5-AbHryry8c-AXo';

const supabase = createClient(supabaseUrl, supabaseAnonKey);
const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

//for user registration
export async function registerUser({ email, password, firstName, middleName, lastName, phoneNumber }) {
  // 1. Sign up with Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    return { error: authError.message };
  }

  const auth_id = authData.user?.id;
  if (!auth_id) {
    return { error: 'Failed to retrieve auth ID after sign up' };
  }

  // 2. Generate 4-digit OTP
  const otp_code = Math.floor(1000 + Math.random() * 9000).toString();
  const expires_at = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 mins

  // 3. Insert user profile and OTP
  const { error: profileError } = await supabaseAdmin.from('users').insert({
    auth_id,
    first_name: firstName,
    middle_name: middleName,
    last_name: lastName,
    phone_number: phoneNumber,
  });

  if (profileError) {
    return { error: profileError.message };
  }

  const { error: otpError } = await supabaseAdmin.from('registration_otps').insert({
    auth_id,
    otp_code,
    expires_at,
  });

  if (otpError) {
    return { error: otpError.message };
  }

  return { success: true, otp_code };
}
