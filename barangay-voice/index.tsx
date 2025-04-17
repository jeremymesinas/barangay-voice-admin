// import React, { useState, useEffect } from "react";
// import { View, ActivityIndicator } from "react-native";
// import * as Font from "expo-font";
// import * as SplashScreen from "expo-splash-screen";
// import HomeScreen from "../components/HomeScreen";
// import App from "../app/App";

// SplashScreen.preventAutoHideAsync();

// const loadFonts = async () => {
//   await Font.loadAsync({
//     "Poppins-Regular": require("../assets/fonts/Poppins.ttf"),
//     "Anton-Regular": require("../assets/fonts/Anton.ttf"),
//   });
// };

// export default function Index() {
//   const [fontsLoaded, setFontsLoaded] = useState(false);

//   useEffect(() => {
//     async function prepare() {
//       try {
//         await loadFonts();
//       } catch (e) {
//         console.warn(e);
//       } finally {
//         setFontsLoaded(true);
//         SplashScreen.hideAsync();
//       }
//     }
//     prepare();
//   }, []);

//   if (!fontsLoaded) {
//     return <ActivityIndicator size="large" color="#0000ff" />;
//   }

//   return <HomeScreen />;
// }

import { registerRootComponent } from "expo";
import App from "./App"; // Import App.tsx which contains the NavigationContainer

registerRootComponent(App);