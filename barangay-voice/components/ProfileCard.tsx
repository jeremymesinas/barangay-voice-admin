import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfileCard() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Image 
        source={require("../assets/images/barangay-voice.png")} 
        style={styles.profileImage} 
      />
      <Text style={styles.welcomeText}>Welcome back,</Text>
      <Text style={styles.username}>
        {user ? `${user.first_name} ${user.last_name}` : 'Guest User'}
      </Text>
      {user?.email && (
        <Text style={styles.emailText}>{user.email}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 15,
    marginBottom: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#D5305A',
  },
  welcomeText: {
    fontSize: 14,
    color: "#555",
    fontFamily: "Poppins-Regular",
    marginTop: 8,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#D5305A",
    fontFamily: "Poppins-Regular",
    marginTop: 4,
  },
  emailText: {
    fontSize: 12,
    color: "#777",
    fontFamily: "Poppins-Regular",
    marginTop: 2,
  },
});