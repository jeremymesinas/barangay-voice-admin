import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import ProfileCard from "../components/ProfileCard";
import ActionButton from "../components/ActionButton";
import AnnouncementCard from "../components/AnnouncementCard";
import BottomNavigation from "../components/BottomNavigation";

export default function LandingPage() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Section */}
        <View style={styles.topHalf}>
          <Text style={styles.topLeftText}>BARANGAY{"\n"}VOICE</Text>
               <ProfileCard />
        </View>
            

        {/* Action Buttons */}
        <ActionButton title="CONCERNS" color="#F8F7A3" onPress={() => alert("Concerns Clicked")} />
        <ActionButton title="EMERGENCY RESPONSE" color="#F8F7A3" onPress={() => alert("Emergency Clicked")} />

        {/* Announcements */}
        <Text style={styles.header}>Announcements!</Text>
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
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation title="Announcements" description="Latest updates in your Barangay" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  scrollContainer: {
    padding: 20,
  },
  topHalf: {
    flex: 1, 
    backgroundColor: "#A7D477", 
    alignItems: "flex-start",
    justifyContent: "center",
    textAlign: "left",
  },
  topLeftText: {
    fontFamily: "Anton-Regular",
    fontSize: 30,
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginTop: 20,
  },
});