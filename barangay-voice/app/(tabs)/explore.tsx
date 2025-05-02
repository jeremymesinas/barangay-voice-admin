import React from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Jobs() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Job Opportunities</Text>
          <Text style={styles.headerSubtitle}>Find your next job in the community</Text>
        </View>

        {/* Search Bar */}
        <TextInput style={styles.searchBar} placeholder="Search jobs..." />

        {/* Job Cards */}
        <Text style={styles.sectionTitle}>Featured Jobs</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Community Cleaner</Text>
          <Text style={styles.cardLocation}>Location: Barangay Maclab</Text>
          <Text style={styles.cardDescription}>Help clean up the neighborhood every weekend.</Text>
          <Pressable style={styles.cardButton}>
            <Text style={styles.cardButtonText}>Apply Now</Text>
          </Pressable>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Medical Assistant</Text>
          <Text style={styles.cardLocation}>Location: Barangay Health Center</Text>
          <Text style={styles.cardDescription}>Assist in medical checkups and first-aid treatments.</Text>
          <Pressable style={styles.cardButton}>
            <Text style={styles.cardButtonText}>Apply Now</Text>
          </Pressable>
        </View>

        {/* Tip */}
        <Text style={styles.tip}>
          ✅ Tip: Update your profile to improve your job application chances!
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
  searchBar: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
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
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  cardLocation: {
    fontSize: 14,
    color: '#777',
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
  },
  cardButton: {
    backgroundColor: '#EA3A57',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cardButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tip: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginTop: 30,
    fontStyle: 'italic',
  },
});
