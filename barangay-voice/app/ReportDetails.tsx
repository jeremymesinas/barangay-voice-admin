import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { updateConcernStatus, addConcernResponse } from '@/scripts/account-actions';

export default function ReportDetails() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const [status, setStatus] = useState(params.status);
  const [isRespondModalVisible, setIsRespondModalVisible] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

const formatDate = (dateInput) => {
  try {
    const dateString = Array.isArray(dateInput) ? dateInput[0] : dateInput;
    if (!dateString) return 'Unknown date';
    
    const date = new Date(dateString);
    return isNaN(date.getTime()) 
      ? 'Invalid date' 
      : date.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
  } catch {
    return 'Invalid date';
  }
};
  const handleMarkAsResolved = async () => {
    try {
      setIsSubmitting(true);
      const { error } = await updateConcernStatus(params.id, 'RESOLVED');
      
      if (error) throw error;
      
      setStatus('RESOLVED');
      Alert.alert('Success', 'The concern has been marked as resolved');
    } catch (error) {
      Alert.alert('Error', 'Failed to update status');
    } finally {
      setIsSubmitting(false);
    }
  };

const handleRespond = async () => {
  if (!responseText.trim()) {
    Alert.alert('Error', 'Please enter a response');
    return;
  }

  try {
    setIsSubmitting(true);
    
    // Only pass concernId and response
    const { error } = await addConcernResponse(
      params.id.toString(), // Ensure string type
      responseText
    );

    if (error) throw error;
    
    Alert.alert('Success', 'Response submitted successfully');
    setIsRespondModalVisible(false);
    setResponseText('');
    
  } catch (error) {
    console.error('Submission error:', error);
    Alert.alert(
      'Error', 
      error.message || 'Failed to submit response'
    );
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <View style={styles.wrapper}>
      {/* Header */}
      <View style={styles.topHalf}>
        <View>
          <Text style={styles.topLeftText}>BARANGAY{"\n"}VOICE</Text>
        </View>
        <Image
          source={require('@/assets/images/barangay-voice.png')}
          style={styles.topRightImage}
        />
      </View>

      <Text style={styles.headerTitle}>REPORT DETAILS</Text>

      {/* Content */}
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.reportCard}>
            <View style={styles.reportHeader}>
              <Image source={require('@/assets/images/logo.png')} style={styles.avatar} />
              <View style={styles.reportMeta}>
                <Text style={styles.reportTitle}>{params.header}</Text>
                <Text style={styles.meta}>{formatDate(params.date)}</Text>
                <Text
                  style={[
                    styles.status,
                    status === 'PENDING' ? styles.pending : styles.resolved,
                  ]}
                >
                  {status}
                </Text>
              </View>
            </View>

            <Text style={styles.reportText}>
              {params.content}
            </Text>

            {/* Response section if exists */}
            {params.response && (
              <View style={styles.responseSection}>
                <Text style={styles.responseLabel}>ADMIN RESPONSE:</Text>
                <Text style={styles.responseText}>{params.response}</Text>
              </View>
            )}

            {/* Buttons */}
            <View style={styles.buttonRow}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => setIsRespondModalVisible(true)}
                disabled={isSubmitting}
              >
                <Text style={styles.buttonText}>RESPOND</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.actionButton, status === 'RESOLVED' && styles.resolvedButton]}
                onPress={handleMarkAsResolved}
                disabled={status === 'RESOLVED' || isSubmitting}
              >
                <Text style={styles.buttonText}>
                  {status === 'RESOLVED' ? 'RESOLVED' : 'MARK AS RESOLVED'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Respond Modal */}
      <Modal
        visible={isRespondModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>ADD RESPONSE</Text>
            
            <TextInput
              style={styles.responseInput}
              multiline
              numberOfLines={5}
              placeholder="Enter your response here..."
              value={responseText}
              onChangeText={setResponseText}
            />

            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setIsRespondModalVisible(false)}
                disabled={isSubmitting}
              >
                <Text style={styles.modalButtonText}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.submitButton]}
                onPress={handleRespond}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.modalButtonText}>SUBMIT</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  responseSection: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  responseLabel: {
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 5,
  },
  responseText: {
    color: '#333',
    fontSize: 14,
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EA3A57',
    marginBottom: 15,
    textAlign: 'center',
  },
  responseInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    minHeight: 120,
    marginBottom: 15,
    textAlignVertical: 'top',
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 0.48,
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  submitButton: {
    backgroundColor: '#EA3A57',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  resolvedButton: {
    backgroundColor: '#4CAF50',
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  pending: {
    color: '#f32d5d',
  },
  resolved: {
    color: '#4CAF50',
  },
  wrapper: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  // New header styles to match Report.tsx
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#EA3A57',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'Poppins-Regular',
  },
  header: {
    backgroundColor: '#88C057',
    // paddingTop: Platform.OS === 'android' ? 40 : 0,
    paddingBottom: 20,
    width: '100%',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 24,
  },
  flagIcon: {
    width: 40,
    height: 30,
    resizeMode: 'contain',
  },
  redBanner: {
    backgroundColor: '#EA3A57',
    paddingVertical: 12,
    paddingHorizontal: 25,
    width: 285,
    borderRadius: 20,
    height: 83,
    alignSelf: 'center',
    marginTop: -15,
    marginBottom: 20,
    justifyContent: 'center', 
    alignItems: 'center',    
    flexDirection: 'row',    
  },
  bannerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center', 
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  content: {
    paddingTop: 30,
    paddingBottom: 40,
  },
  reportCard: {
    backgroundColor: '#E4F1AC',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    height: 80,
    backgroundColor: '#F1F8D5',
    padding: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    resizeMode: 'contain',
  },
  reportMeta: {
    flex: 1,
  },
  reportTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#EA3A57',
  },
  meta: {
    fontSize: 12,
    color: '#777',
  },
  reportText: {
    fontSize: 13,
    color: '#000',
    marginTop: 10,
    lineHeight: 18,
    borderRadius: 10,
    backgroundColor: '#F1F8D5',
    padding: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: '#B5E655',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 0.48,
    alignItems: 'center',
    borderWidth: 1,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 13,
  },
});
