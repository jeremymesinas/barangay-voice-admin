import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image, SafeAreaView, ActivityIndicator } from "react-native";
import { useFonts } from "expo-font"; // Import the font hook from Expo
import ProfileCard from "../components/ProfileCard";
import ActionButton from "../components/ActionButton";
import AnnouncementCard from "../components/AnnouncementCard";
import BottomNavigation from "../components/BottomNavigation";

export default function LandingPage() {
  // Load fonts using the useFonts hook
  const [fontsLoaded] = useFonts({
    "Anton-Regular": require("../assets/fonts/Anton.ttf"), // Custom font 1
    "Poppins-Regular": require("../assets/fonts/Poppins.ttf"), // Custom font 2
  });

  // Show loading indicator while fonts are loading
  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: "center", alignItems: "center" }} />;
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true} // Ensure scroll bar is visible
          bounces={false}
          overScrollMode="never"
          scrollEventThrottle={16} // Improves scroll performance
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.topHalf}>
            <Text style={styles.topLeftText}>BARANGAY{"\n"}VOICE</Text>
            <Image
              source={require("../assets/images/barangay-voice.png")}
              style={styles.topRightImage}
            />
          </View>

          <ProfileCard />

          <View style={styles.actionButtonContainer}>
            <ActionButton
              title="CONCERNS"
              color="#E4F1AC"
              onPress={() => alert("Concerns Clicked")}
            />
            <ActionButton
              title="EMERGENCY RESPONSE"
              color="#E4F1AC"
              onPress={() => alert("Emergency Clicked")}
            />
          </View>

          <View style={styles.announcements}>
            <Text style={styles.header}>Announcements!</Text>
          </View>

          <AnnouncementCard
            title="Barangay Health Center Schedule"
            description="The Barangay Health Center will be open for free health consultations every Sunday from 8:00 am to 11:00 am. Please bring your health records."
          />
          <AnnouncementCard
            title="Clean-up Drive"
            description="A barangay-wide clean-up drive will be held on March 25, 2025, at Maginhawa Street."
          />
          <AnnouncementCard
            title="Traffic Advisory"
            description="Santos Street will be closed for repairs from March 20 to April 2."
          />

          <View style={{ height: 100 }} />
        </ScrollView>
      </View>
      <BottomNavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  container: {
    flex: 1,
    // Ensure the container allows scrolling
    height: "100%",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  announcements: {
    backgroundColor: "#E4F1AC",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
  },
  actionButtonContainer: {
    paddingHorizontal: 20,
  },
  topHalf: {
    backgroundColor: "#A7D477",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  topLeftText: {
    fontFamily: "Anton-Regular", // Using Anton font
    fontSize: 30,
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    paddingLeft: 10,
  },
  topRightImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginRight: 10,
  },
  header: {
    fontFamily: "Poppins-Regular", // Using Poppins font
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
    marginTop: 20,
  },
});
