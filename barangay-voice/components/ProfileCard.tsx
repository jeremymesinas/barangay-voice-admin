import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function ProfileCard() {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/barangay-voice.png")} style={styles.profileImage} />
      <Text style={styles.welcomeText}>Welcome back,</Text>
      <Text style={styles.username}>Firstname Lastname</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  welcomeText: {
    fontSize: 14,
    color: "#000",
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#D5305A",
  },
});
