import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image, SafeAreaView, ActivityIndicator, StatusBar } from "react-native";
import { useFonts } from "expo-font";
import ProfileCard from "../../components/ProfileCard";
import ActionButton from "../../components/ActionButton";
import AnnouncementCard from "../../components/AnnouncementCard";
import { ProtectedRoute } from "@/contexts/ProtectedRoutes";
import { router } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";

export default function LandingPage() {
  const [fontsLoaded] = useFonts({
    "Anton-Regular": require("../../assets/fonts/Anton.ttf"),
    "Poppins-Regular": require("../../assets/fonts/Poppins.ttf"),
  });

  const { user } = useAuth();

  useEffect(() => {
    StatusBar.setBarStyle('dark-content'); 
    StatusBar.setHidden(false); 
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
          bounces={false}
          overScrollMode="never"
          scrollEventThrottle={16}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.topHalf}>
            <View>
              <Text style={styles.topLeftText}>BARANGAY{"\n"}VOICE</Text>
            </View>
            <Image
              source={require("../../assets/images/barangay-voice.png")}
              style={styles.topRightImage}
            />
          </View>

          <ProfileCard/>

          <View style={styles.actionButtonContainer}>
            <ActionButton
              title="CONCERNS"
              color="#E4F1AC"
              onPress={() => router.push('/concern')}
            />
            <ActionButton
              title="EMERGENCY RESPONSE"
              color="#E4F1AC"
              onPress={() => router.push('/emergency')}
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
    fontFamily: "Anton-Regular",
    fontSize: 30,
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    paddingLeft: 10,
  },
  welcomeText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "white",
    marginLeft: 10,
    marginTop: 5,
  },
  topRightImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginRight: 10,
  },
  header: {
    fontFamily: "Poppins-Regular",
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
    marginTop: 20,
  },
});