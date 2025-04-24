import React, { useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, TextInput as RNTextInput } from 'react-native';
import { useRouter } from "expo-router";

export default function SignUpOTP() {
  const router = useRouter();
  const [otp, setOtp] = React.useState(["", "", "", ""]);


  // Define refs with proper type
  const inputRefs = [
    useRef<RNTextInput>(null),
    useRef<RNTextInput>(null),
    useRef<RNTextInput>(null),
    useRef<RNTextInput>(null),
  ];
  const handleInputChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
  
    if (text.length > 0 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current?.focus();
    }
  };
  
  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topHalf}>
        <Image source={require("../assets/images/barangay-voice.png")} style={styles.logo} />
      </View>

      <View style={styles.bottomHalf}>
        <Text style={styles.infoText}>
          A one-time OTP has been sent to your email. Please enter the code.
        </Text>

        <View style={styles.codeContainer}>
        {[0, 1, 2, 3].map((_, index) => (
          <TextInput
            key={index}
            ref={inputRefs[index]}
            style={styles.codeInput}
            maxLength={1}
            keyboardType="numeric"
            value={otp[index]}
            onChangeText={(text: string) => handleInputChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            textAlign="center"
          />
        ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={() => router.push("/LogIn")}>
          <Text style={styles.buttonText}>PROCEED</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  topHalf: {
    flex: 1,
    backgroundColor: '#A7D477',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomHalf: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
  },
  infoText: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginBottom: 20,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 30,
  },
  codeInput: {
    width: 50,
    height: 50,
    borderColor: '#F72C5B',
    borderWidth: 3, // Adjusted border width for a more balanced look
    borderRadius: 30, // More rounded border
    textAlign: 'center',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#D5305A',
    paddingVertical: 9,
    paddingHorizontal: 80,
    borderRadius: 30,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 30,
    fontFamily: 'Anton-Regular',
    textAlign: 'center',
  },
});