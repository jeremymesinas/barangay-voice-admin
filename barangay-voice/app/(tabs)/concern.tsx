import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView,
  ScrollView, Modal, ActivityIndicator, Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { createAnnouncement, fetchAnnouncements } from '@/scripts/account-actions';

interface Announcement {
  announcement_header: string;
  announcement_content: string;
  created_at: string;
}


export default function AnnouncementScreen() {
 const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(true);

  const router = useRouter();
  const { user } = useAuth();

  const [fontsLoaded] = useFonts({
    "Anton-Regular": require("../../assets/fonts/Anton.ttf"),
    "Poppins-Regular": require("../../assets/fonts/Poppins.ttf"),
  });
  useEffect(() => {
    const loadAnnouncements = async () => {
      try {
        setLoadingAnnouncements(true);
        const data = await fetchAnnouncements();
        setAnnouncements(data);
      } catch (error) {
        console.error('Failed to load announcements:', error);
      } finally {
        setLoadingAnnouncements(false);
      }
    };

    loadAnnouncements();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const showAlert = (title: string, message: string) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setIsAlertVisible(true);
  };

  const handleSubmit = async () => {
    if (!title || !content) {
      showAlert('Missing Information', 'Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await createAnnouncement({
        announcement_header: title,
        announcement_content: content,
        // user_id: user?.id || ''
      });

      if (error) {
        throw new Error(error);
      }

      setIsModalVisible(true);
    } catch (error: any) {
      showAlert('Submission Error', error.message || 'Failed to create announcement');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.topHalf}>
          <View>
            <Text style={styles.topLeftText}>BARANGAY{"\n"}VOICE</Text>
          </View>
          <Image
            source={require('@/assets/images/barangay-voice.png')}
            style={styles.topRightImage}
          />
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.title}>CREATE ANNOUNCEMENT</Text>
          <Text style={styles.subtext}>
            Share important information with the barangay community.
            Write a clear title and detailed content for your announcement.
          </Text>

          <Text style={styles.label}>Title *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter announcement title"
            placeholderTextColor="#808080"
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.label}>Content *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            multiline
            numberOfLines={8}
            placeholderTextColor="#808080"
            placeholder="Write your announcement content here"
            value={content}
            onChangeText={setContent}
          />

          <TouchableOpacity 
            style={styles.submitBtn} 
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitText}>PUBLISH ANNOUNCEMENT</Text>
            )}
          </TouchableOpacity>
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>ANNOUNCEMENT PUBLISHED</Text>
              <Ionicons name="checkmark-circle" size={60} color="#4CAF50" style={styles.checkIcon} />
              <Text style={styles.modalMessage}>
                Your announcement has been successfully published to the community.
              </Text>

              <View style={styles.modalDivider} />

              <View style={styles.modalButtonRow}>
                <TouchableOpacity
                  style={styles.modalButtonHalf}
                  onPress={() => setIsModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>OK</Text>
                </TouchableOpacity>

                <View style={styles.verticalDivider} />

                <TouchableOpacity
                  style={styles.modalButtonHalf}
                  // onPress={navigateToAnnouncements}
                >
                  <Text style={styles.modalButtonText}>VIEW ANNOUNCEMENTS</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="fade"
          transparent={true}
          visible={isAlertVisible}
          onRequestClose={() => setIsAlertVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>{alertTitle}</Text>
              <Ionicons 
                name={alertTitle === 'Submission Error' ? 'close-circle' : 'alert-circle'} 
                size={60} 
                color="#EA3A57" 
                style={styles.checkIcon} 
              />
              <Text style={styles.modalMessage}>
                {alertMessage}
              </Text>

              <View style={styles.modalDivider} />

              <TouchableOpacity
                style={[styles.modalButtonFull, { backgroundColor: '#EA3A57' }]}
                onPress={() => setIsAlertVisible(false)}
              >
                <Text style={[styles.modalButtonText, { color: '#fff' }]}>UNDERSTOOD</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={styles.announcementsSection}>
          <Text style={styles.sectionTitle}>RECENT ANNOUNCEMENTS</Text>
          
          {loadingAnnouncements ? (
            <ActivityIndicator size="small" color="#EA3A57" />
          ) : announcements.length === 0 ? (
            <Text style={styles.noAnnouncementsText}>No announcements yet</Text>
          ) : (
            announcements.map((announcement, index) => (
              <View key={index} style={styles.announcementCard}>
                <View style={styles.announcementHeader}>
                  <Text style={styles.announcementTitle}>
                    {announcement.announcement_header}
                  </Text>
                  <Text style={styles.announcementDate}>
                    {formatDate(announcement.created_at)}
                  </Text>
                </View>
                <Text style={styles.announcementContent}>
                  {announcement.announcement_content}
                </Text>
              </View>
            ))
          )}
        </View>            

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
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
  topRightImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginRight: 10,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#EA3A57',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'Poppins-Regular',
  },
  subtext: {
    fontSize: 13,
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Poppins-Regular',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
    fontFamily: 'Poppins-Regular',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#F5F5F5',
    fontFamily: 'Poppins-Regular',
  },
  textArea: {
    height: 200,
    textAlignVertical: 'top',
  },
  submitBtn: {
    backgroundColor: '#EA3A57',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 25,
    marginHorizontal: 30,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 5,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EA3A57',
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  modalMessage: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Poppins-Regular',
  },
  modalButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  modalDivider: {
    height: 1,
    backgroundColor: '#ccc',
    width: '100%',
    marginVertical: 15,
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButtonHalf: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalButtonFull: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  verticalDivider: {
    width: 1,
    backgroundColor: '#ccc',
  },
  checkIcon: {
    marginBottom: 10,
  },
  announcementsSection: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EA3A57',
    marginBottom: 15,
    fontFamily: 'Poppins-Regular',
  },
  announcementCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  announcementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    fontFamily: 'Poppins-Regular',
  },
  announcementDate: {
    fontSize: 12,
    color: '#777',
    fontFamily: 'Poppins-Regular',
  },
  announcementContent: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    fontFamily: 'Poppins-Regular',
  },
  noAnnouncementsText: {
    textAlign: 'center',
    color: '#777',
    fontStyle: 'italic',
    marginVertical: 20,
    fontFamily: 'Poppins-Regular',
  },
});