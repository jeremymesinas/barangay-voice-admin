import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  StyleSheet,
  ActivityIndicator 
} from 'react-native';
import { useRouter } from "expo-router";
import { useFonts } from 'expo-font';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require('../assets/fonts/Poppins.ttf'),
    "Anton-Regular": require('../assets/fonts/Anton.ttf'),
  });

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('OTP sent successfully! Check your email.');
      router.push('/OtpVerify');
    }, 1500);
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#A7D477" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image 
          source={require("../assets/images/barangay-voice.png")} 
          style={styles.logo} 
        />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.instruction}>
          Enter email address for reset password
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#808080"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setError('');
            }}
            style={styles.inputEmail}
          />
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.sendButton}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.sendButtonText}>SEND</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/LogIn')}>
          <Text style={styles.backToSignIn}>Back to Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A7D477'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  formContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 40,
    paddingHorizontal: 25,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E1E1E',
    marginBottom: 15,
    fontFamily: 'Poppins-Regular',
  },
  instruction: {
    fontSize: 14,
    color: '#1E1E1E',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 15,
    fontFamily: 'Poppins-Regular',
  },
  inputContainer: {
    width: '100%',
    height: 50,
    borderColor: '#F72C5B',
    borderWidth: 2,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  inputEmail: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#1E1E1E',
  },
  error: {
    color: '#F72C5B',
    marginBottom: 15,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  sendButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#F72C5B',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  sendButtonText: {
    fontFamily: 'Anton-Regular',
    fontSize: 24,
    color: 'white',
    letterSpacing: 1,
  },
  backToSignIn: {
    color: '#1E1E1E',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    textDecorationLine: 'underline',
  },
});

export default ForgotPassword;