import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router"; // Import the useRouter hook
import { useFonts } from "expo-font"; // Import the font hook from Expo
import * as SplashScreen from "expo-splash-screen"; // Import splash screen handling

SplashScreen.preventAutoHideAsync(); // Prevent splash screen from hiding

export default function HomeScreen() {
  // Load fonts using the useFonts hook at the top of the component
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins.ttf"), // Use require to load local font
    "Anton-Regular": require("../assets/fonts/Anton.ttf"), // Use require to load local font
  });

  // Initialize the router
  const router = useRouter();

  // Splash screen hide logic when fonts are loaded
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Display a loading indicator while fonts are being loaded
  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      {/* View 1 for the first half */}
      <View style={styles.topHalf}>
        <Image source={require("../assets/images/barangay-voice.png")} style={styles.logo} />
      </View>

      {/* second half */}
      <View style={styles.bottomHalf}>
        <Text style={styles.heading}>Ka-sangga mo sa Telepono!</Text>

        <Text style={styles.description}>
          Stay informed, file requests, and access essential services from your barangay at your fingertips.
          The Barangay Voice app brings governance closer to you—efficient, transparent, and citizen-focused.
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => router.push("/LandingPage")}>
          <Text style={styles.buttonText}>GET STARTED</Text>
        </TouchableOpacity>

        <Text style={styles.loginText}>Already have an account?</Text>
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
  heading: {
    fontSize: 30,
    fontFamily: "Poppins-Regular", // Keep poppins
    fontWeight: "900",
    color: "#D5305A",
    textAlign: "center",
    marginVertical: 10,
    textShadowColor: "#A7D477",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  description: {
    fontSize: 15,
    fontFamily: "Poppins-Regular", // Using Poppins font
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
    paddingHorizontal: 20,
    fontStyle: "italic",
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
    fontFamily: "Anton-Regular", // Using Anton font
    textAlign: "center",
  },
  loginText: {
    marginTop: 10,
    fontSize: 18,
    fontFamily: "Poppins-Regular", // Using Poppins font
    color: "#555",
    textDecorationLine: "underline",
  },
});
