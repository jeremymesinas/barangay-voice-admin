import React from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, ScrollView, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/contexts/AuthContext';
import { logoutUser } from '../../scripts/account-actions';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { fetchBarangayById } from '../../scripts/barangay-actions';

export default function Profile() {
  const { user, logout, updateUserBarangay } = useAuth();
  const [loadingBarangay, setLoadingBarangay] = useState(true);

  useEffect(() => {
    console.log('Current user:', user); // Check user object structure
    console.log('Barangay ID:', user?.barangay_id); // Verify ID exists
  
    const loadBarangayData = async () => {
      if (user?.barangay_id) {
        console.log('Fetching barangay for ID:', user.barangay_id);
        try {
          const barangay = await fetchBarangayById(user.barangay_id);
          console.log('Fetched barangay:', barangay);
          
          if (barangay) {
            updateUserBarangay(barangay);
          } else {
            console.warn('No barangay found with ID:', user.barangay_id);
          }
        } catch (error) {
          console.error('Fetch error:', error);
        } finally {
          setLoadingBarangay(false);
        }
      } else {
        console.warn('No barangay_id found on user');
        setLoadingBarangay(false);
      }
    };
  
    loadBarangayData();
  }, [user?.barangay_id, updateUserBarangay]);
  
  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      if (response.error) {
        Alert.alert('Logout Failed', response.error);
      } else {
        logout();
        router.replace('/LogIn');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred during logout');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image
            source={require("../../assets/images/barangay-voice.png")}
            style={styles.topRightImage}
          />
          <Text style={styles.profileName}>
            {user?.first_name || 'First'} {user?.last_name || 'Last'}
          </Text>
          <Text style={styles.profileLocation}>
      {loadingBarangay ? 'Loading location...' : `Barangay Maclab, Quezon City`}
        </Text>
        </View>

        {/* Profile Edit Section */}
        <View style={styles.editSection}>
          <Text style={styles.sectionTitle}>Edit Profile</Text>
          <TextInput 
            style={styles.inputField} 
            placeholder="Full Name" 
            value={`${user?.first_name || ''} ${user?.last_name || ''}`}
            editable={false}
          />
          <TextInput 
            style={styles.inputField} 
            placeholder="Email Address" 
            value={user?.email || ''}
            editable={false}
          />
          <TextInput 
            style={styles.inputField} 
            placeholder="Phone Number" 
            // Add phone number if available in your user object
          />
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
          <Pressable 
            style={styles.settingsButton} 
            onPress={handleLogout}
          >
            <Text style={[styles.settingsButtonText, { color: '#EA3A57' }]}>Log Out</Text>
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
    marginVertical: 30,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Poppins-Regular',
  },
  profileLocation: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },
  editSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
    fontFamily: 'Poppins-Regular',
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
    fontFamily: 'Poppins-Regular',
  },
  saveButton: {
    backgroundColor: '#EA3A57',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
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
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
  },
  topRightImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginRight: 10,
  },
});