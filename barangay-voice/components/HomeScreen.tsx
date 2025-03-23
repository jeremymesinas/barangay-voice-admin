import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function HomeScreen() {
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

        <TouchableOpacity style={styles.button}>
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
    fontSize: 24,
    fontFamily: "Poppins-Regular",
    fontWeight: "bold",
    color: "#D5305A",
    textAlign: "center",
    marginVertical: 10,
  },
  description: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#D5305A",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "Anton-Regular",
    textAlign: "center",
  },
  loginText: {
    marginTop: 10,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#555",
  },
});
