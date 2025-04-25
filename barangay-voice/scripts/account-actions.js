
import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY } from 'react-native-dotenv';

const supabaseUrl = PUBLIC_SUPABASE_URL;
const supabaseAnonKey = PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = SUPABASE_SERVICE_ROLE_KEY;

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
