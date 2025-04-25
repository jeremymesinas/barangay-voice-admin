import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router"; // Import the useRouter hook
import { useFonts } from "expo-font"; // Import the font hook from Expo
import * as SplashScreen from "expo-splash-screen"; // Import splash screen handling
import { ActivityIndicator } from 'react-native';


SplashScreen.preventAutoHideAsync(); // Prevent splash screen from hiding

export default function LogIn() {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins.ttf"),
    "Anton-Regular": require("../assets/fonts/Anton.ttf"),
  });

  const router = useRouter();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      {/* Top bar with the logo */}
      <View style={styles.topHalf}>
        <Image source={require("../assets/images/barangay-voice.png")} style={styles.logo} />
      </View>

      {/* Bottom part with Email, Password fields, and buttons */}
      <View style={styles.bottomHalf}>
        {/* Email field with user icon */}
        <View style={styles.inputContainer}>
          <Image source={require("../assets/images/user.png")} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password field with lock icon */}
        <View style={styles.inputContainer}>
          <Image source={require("../assets/images/password.png")} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            autoCapitalize="none"
          />
        </View>
 
      <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>   
      
      <TouchableOpacity style={styles.button} onPress={() => router.push("/home")}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topHalf: {
    flex: 1,
    backgroundColor: "#A7D477",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomHalf: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
    alignItems: "center",
  },
  logo: {
    width: 350,
    height: 350,
    resizeMode: "contain",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    width: "90%",
    height: 50,
    marginBottom: 15,
    borderRadius: 25,
    paddingHorizontal: 15,
    borderColor: '#F72C5B',
    borderWidth: 3, 
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
  forgotPassword: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#555",
    marginBottom: 20,
    textDecorationLine: "underline",
  },
  button: {
    backgroundColor: "#D5305A",
    paddingVertical: 9,
    paddingHorizontal: 80,
    borderRadius: 30,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 30,
    fontFamily: "Anton-Regular",
    textAlign: "center",
  },
});
