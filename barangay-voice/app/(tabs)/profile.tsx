import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Profile() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: 'https://www.example.com/profile-image.jpg' }}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileLocation}>Barangay Maclab, Quezon City</Text>
        </View>

        {/* Profile Edit Section */}
        <View style={styles.editSection}>
          <Text style={styles.sectionTitle}>Edit Profile</Text>
          <TextInput style={styles.inputField} placeholder="Full Name" />
          <TextInput style={styles.inputField} placeholder="Email Address" />
          <TextInput style={styles.inputField} placeholder="Phone Number" />
          <Pressable style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </Pressable>
        </View>

        {/* Settings Section */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <Pressable style={styles.settingsButton}>
            <Text style={styles.settingsButtonText}>Change Password</Text>
          </Pressable>
          <Pressable style={styles.settingsButton}>
            <Text style={styles.settingsButtonText}>Log Out</Text>
          </Pressable>
        </View>
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
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  profileLocation: {
    fontSize: 16,
    color: '#666',
  },
  editSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  inputField: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  saveButton: {
    backgroundColor: '#EA3A57',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  settingsSection: {
    marginTop: 20,
  },
  settingsButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  settingsButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
