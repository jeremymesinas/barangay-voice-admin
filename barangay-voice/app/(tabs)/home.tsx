import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image, SafeAreaView, ActivityIndicator, StatusBar } from "react-native";
import { useFonts } from "expo-font";
import ProfileCard from "../../components/ProfileCard";
import ActionButton from "../../components/ActionButton";
import AnnouncementCard from "../../components/AnnouncementCard";
import { ProtectedRoute } from "@/contexts/ProtectedRoutes";
import { router } from "expo-router";

export default function LandingPage() {
  const [fontsLoaded] = useFonts({
    "Anton-Regular": require("../../assets/fonts/Anton.ttf"),
    "Poppins-Regular": require("../../assets/fonts/Poppins.ttf"),
  });

  useEffect(() => {
    StatusBar.setBarStyle('dark-content'); 
    StatusBar.setHidden(false); 
  }, []);

  return (
  // <ProtectedRoute>
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
            <Text style={styles.topLeftText}>BARANGAY{"\n"}VOICE</Text>
            <Image
              source={require("../../assets/images/barangay-voice.png")}
              style={styles.topRightImage}
            />
          </View>
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Welcome to BarangayVoice</Text>
          <Text style={styles.headerSubtitle}>Your connection to community safety & support</Text>
        </View>

          <ProfileCard />

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

        {/* Tip */}
        <Text style={styles.tip}>
          ✅ Tip: Stay alert and know your emergency routes!
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    paddingHorizontal: 20,
    backgroundColor: '#f9f9f9',
    paddingBottom: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  emergencyBtn: {
    backgroundColor: '#EA3A57',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 20,
  },
  emergencyText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  cardContent: {
    fontSize: 14,
    color: '#555',
  },
  tip: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginTop: 30,
    fontStyle: 'italic',
  },
});
