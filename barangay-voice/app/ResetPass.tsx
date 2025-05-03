import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  SafeAreaView,
  ScrollView,
  FontAwesome 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';

export default function OtpVerify() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const inputRefs = useRef<(TextInput | null)[]>([]); 
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require('../assets/fonts/Poppins.ttf'),
    "Anton-Regular": require('../assets/fonts/Anton.ttf'),
  });

  // Password validation functions
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*]/.test(password);
  const passwordsMatch = password === confirmPassword && password !== "";

  const handleChange = (index: number, value: string) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleSubmit = () => {
    if (otp.join('').length < otp.length) {
      setError('Please enter the complete OTP');
      return;
    }

    if (!hasMinLength || !hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
      setError('Password does not meet all requirements');
      return;
    }

    if (!passwordsMatch) {
      setError('Passwords do not match');
      return;
    }

    setError('');
    router.push('/ResetPass');
  };

  const handleResend = () => {
    // Logic for resending the OTP
  };

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Image source={require("../assets/images/barangay-voice.png")} style={styles.logo} />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.instruction}>
            A one-time OTP has been sent to your email. Please enter the code.
          </Text>
          
          <View style={styles.inputContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => inputRefs.current[index] = ref}
                value={digit}
                onChangeText={(text) => handleChange(index, text)}
                maxLength={1}
                style={styles.otpInput}
                keyboardType="numeric"
                autoFocus={index === 0}
              />
            ))}
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>New Password</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <FontAwesome
                  name={showPassword ? "eye" : "eye-slash"}
                  size={20}
                  color="#F72C5B"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <FontAwesome
                  name={showConfirmPassword ? "eye" : "eye-slash"}
                  size={20}
                  color="#F72C5B"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.passwordPolicyContainer}>
            <Text style={styles.policyTitle}>Password Requirements:</Text>
            
            <View style={styles.policyItem}>
              <FontAwesome
                name={hasMinLength ? "check-circle" : "times-circle"}
                size={16}
                color={hasMinLength ? "#2E8B57" : "#F72C5B"}
              />
              <Text style={styles.policyText}>At least 8 characters</Text>
            </View>
            
            <View style={styles.policyItem}>
              <FontAwesome
                name={hasUpperCase ? "check-circle" : "times-circle"}
                size={16}
                color={hasUpperCase ? "#2E8B57" : "#F72C5B"}
              />
              <Text style={styles.policyText}>At least one uppercase letter</Text>
            </View>
            
            <View style={styles.policyItem}>
              <FontAwesome
                name={hasLowerCase ? "check-circle" : "times-circle"}
                size={16}
                color={hasLowerCase ? "#2E8B57" : "#F72C5B"}
              />
              <Text style={styles.policyText}>At least one lowercase letter</Text>
            </View>
            
            <View style={styles.policyItem}>
              <FontAwesome
                name={hasNumber ? "check-circle" : "times-circle"}
                size={16}
                color={hasNumber ? "#2E8B57" : "#F72C5B"}
              />
              <Text style={styles.policyText}>At least one number</Text>
            </View>
            
            <View style={styles.policyItem}>
              <FontAwesome
                name={hasSpecialChar ? "check-circle" : "times-circle"}
                size={16}
                color={hasSpecialChar ? "#2E8B57" : "#F72C5B"}
              />
              <Text style={styles.policyText}>At least one special character</Text>
            </View>
            
            <View style={styles.policyItem}>
              <FontAwesome
                name={passwordsMatch ? "check-circle" : "times-circle"}
                size={16}
                color={passwordsMatch ? "#2E8B57" : "#F72C5B"}
              />
              <Text style={styles.policyText}>Passwords match</Text>
            </View>
          </View>

          {error && <Text style={styles.error}>{error}</Text>}

          <TouchableOpacity onPress={handleSubmit} style={styles.proceed}>
            <Text style={styles.proceedtxt}>PROCEED</Text>
          </TouchableOpacity>
          
          <Text style={styles.resendLink}>
            If you didn't receive the code.   
            <Text style={styles.resend} onPress={handleResend}>
              Resend
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollContainer: {
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingBottom: 20,
  },
  logoContainer: {
    width: '100%',
    backgroundColor: '#A7D477',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  formContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
  },
  instruction: {
    fontSize: 15,
    color: '#1E1E1E',
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'Poppins-Regular',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderColor: '#F72C5B',
    borderWidth: 3,
    borderRadius: 30,
    textAlign: 'center',
    padding: 10,
    fontSize: 18
  },
  fieldContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#F72C5B',
    fontFamily: 'Poppins-Regular',
  },
  input: {
    borderWidth: 3,
    borderColor: '#F72C5B',
    borderRadius: 25,
    padding: 12,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  passwordInputContainer: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  passwordPolicyContainer: {
    backgroundColor: '#E4F1AC',
    borderRadius: 8,
    padding: 15,
    marginTop: 10,
  },
  policyTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  policyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  policyText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginLeft: 8,
  },
  error: {
    color: '#F72C5B',
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: 'Poppins-Regular',
  },
  proceed: {
    width: '100%',
    height: 48,
    backgroundColor: '#F72C5B',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  proceedtxt: {
    color: '#FFF',
    fontFamily: 'Anton-Regular',
    fontSize: 30,
    fontWeight: '400',
    textAlign: 'center',
  },
  resendLink: {
    marginTop: 20,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: 'black',
  },
  resend: {
    color: '#F72C5B',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    fontWeight: '400',
    textDecorationLine: 'underline',
    marginLeft: 5
  },
});