import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, SafeAreaView, StatusBar } from 'react-native';

export default function Home() {
  useEffect(() => {
    StatusBar.setBarStyle('dark-content'); 
    StatusBar.setHidden(false); 
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Welcome to BarangayVoice</Text>
          <Text style={styles.headerSubtitle}>Your connection to community safety & support</Text>
        </View>

        {/* Emergency Button */}
        <Pressable style={styles.emergencyBtn}>
          <Text style={styles.emergencyText}>🚨 Tap for Emergency Help</Text>
        </Pressable>

        {/* Announcements */}
        <Text style={styles.sectionTitle}>📣 Latest Announcements</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Community Cleanup Drive</Text>
          <Text style={styles.cardContent}>
            Join us this Saturday at 8 AM for a barangay-wide cleanup. Meeting at the basketball court.
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Free Medical Check-up</Text>
          <Text style={styles.cardContent}>
            Get a free medical check-up on April 20, 9 AM to 12 NN at the Barangay Health Center.
          </Text>
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
