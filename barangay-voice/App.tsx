import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
// Remove these imports:
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// Remove these imports as well, as your screens are now in the 'app' directory
// import HomeScreen from "../screens/HomeScreen";
// import LandingPage from "../screens/LandingPage";

// Remove the type definition as Expo Router handles routing
// export type RootStackParamList = {
//   HomeScreen: undefined;
//   LandingPage: undefined;
// };

// Remove the Stack navigator
// const Stack = createStackNavigator<RootStackParamList>();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          // "Poppins-Regular": require("./assets/fonts/Poppins.ttf"), // Adjust path if needed
          // "Anton-Regular": require("./assets/fonts/Anton.ttf"),   // Adjust path if needed
          "Poppins-Regular": "https://fonts.googleapis.com/css2?family=Poppins:wght@400&display=swap",
          "Anton-Regular": "https://fonts.googleapis.com/css2?family=Anton&display=swap",
        });
      } catch (e) {
        console.warn("Error loading fonts: ", e);
      } finally {
        setFontsLoaded(true);
        SplashScreen.hideAsync();
      }
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return null; // Expo Router handles the root navigation
}