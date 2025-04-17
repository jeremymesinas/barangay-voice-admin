import React from "react";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useFonts } from "expo-font"; // Import the font hook from Expo

interface ActionButtonProps {
  title: string;
  color: string;
  onPress: () => void;
}

export default function ActionButton({ title, color, onPress }: ActionButtonProps) {
  // Load the font using the useFonts hook
  const [fontsLoaded] = useFonts({
    "Anton-Regular": require("../assets/fonts/Anton.ttf"), // Load the custom font
  });

  // Show loading indicator if fonts are not loaded
  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: "center", alignItems: "center" }} />;
  }

  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    backgroundColor: "#E4F1AC",
    borderWidth: 2,
    borderColor: "#000",
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#F72C5B",
    fontFamily: "Anton-Regular", // Apply the Anton font here
    textAlign: "center",
  },
});
