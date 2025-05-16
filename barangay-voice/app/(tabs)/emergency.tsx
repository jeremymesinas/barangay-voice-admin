import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Linking,
  Alert
} from 'react-native';
import { 
  getActiveEmergencyCalls,
  updateCallStatus,
  addCallResponse,
  getCallDetails
} from '@/scripts/account-actions';
import { EmergencyCall, EmergencyResponse } from '@/types'; // Import the types

const AdminCallReceiverScreen = () => {
  // State with proper types
  const [calls, setCalls] = useState<EmergencyCall[]>([]);
  const [selectedCall, setSelectedCall] = useState<EmergencyCall | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [responseText, setResponseText] = useState<string>('');
  const [isResponding, setIsResponding] = useState<boolean>(false);
  const router = useRouter();

  // Location type
  interface Location {
    latitude: number;
    longitude: number;
  }

  // Fetch active calls on mount
  useEffect(() => {
    const loadCalls = async () => {
      try {
        setLoading(true);
        const { data, error } = await getActiveEmergencyCalls();
        if (error) throw error;
        setCalls(data || []);
      } catch (error) {
        Alert.alert('Error', 'Failed to load emergency calls');
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadCalls();
  }, []);

  // Handle opening maps with location
  const openMap = (location: Location) => {
    if (!location?.latitude || !location?.longitude) {
      Alert.alert('Error', 'Invalid location data');
      return;
    }
    const url = `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`;
    Linking.openURL(url).catch(err => console.error("Map error:", err));
  };

  // Call management functions
  const handleSelectCall = async (callId: string) => {
    try {
      const { data, error } = await getCallDetails(callId);
      if (error) throw error;
      if (data) setSelectedCall(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load call details');
    }
  };

  const handleStartCall = async (callId: string) => {
    try {
      const { error } = await updateCallStatus(callId, 'in_progress');
      if (error) throw error;
      await fetchActiveCalls();
    } catch (error) {
      Alert.alert('Error', 'Failed to update call status');
    }
  };

  const handleResolveCall = async (callId: string) => {
    try {
      const { error } = await updateCallStatus(callId, 'resolved');
      if (error) throw error;
      setSelectedCall(null);
      await fetchActiveCalls();
    } catch (error) {
      Alert.alert('Error', 'Failed to resolve call');
    }
  };

  const handleSubmitResponse = async () => {
    if (!responseText.trim()) {
      Alert.alert('Error', 'Please enter a response');
      return;
    }

    if (!selectedCall) return;

    try {
      setIsResponding(true);
      const { error } = await addCallResponse(selectedCall.id, responseText);
      if (error) throw error;
      
      setResponseText('');
      const { data } = await getCallDetails(selectedCall.id);
      if (data) setSelectedCall(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to submit response');
    } finally {
      setIsResponding(false);
    }
  };

  const fetchActiveCalls = async () => {
    const { data, error } = await getActiveEmergencyCalls();
    if (!error && data) setCalls(data);
  };

  // Loading state
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#EA3A57" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>BARANGAY{"\n"}VOICE</Text>
        <Image
          source={require('@/assets/images/barangay-voice.png')}
          style={styles.headerImage}
        />
      </View>

      <SafeAreaView style={styles.contentContainer}>
        <Text style={styles.screenTitle}>EMERGENCY CALLS</Text>

        {selectedCall ? (
          // Call Detail View
          <View style={styles.detailView}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => setSelectedCall(null)}
            >
              <Text style={styles.backButtonText}>← Back to calls</Text>
            </TouchableOpacity>

            <Text style={styles.callTitle}>
              Emergency from {selectedCall.profiles?.name || 'Unknown'}
            </Text>
            
            <Text style={styles.callSubtitle}>
              Phone: {selectedCall.profiles?.phone_number || 'N/A'}
            </Text>

            <TouchableOpacity 
              onPress={() => openMap(selectedCall.caller_location)}
              style={styles.locationBox}
            >
              <Text style={styles.locationText}>
                📍 {selectedCall.caller_address || 'Location unknown'}
              </Text>
              <Text style={styles.mapLink}>View on Map</Text>
            </TouchableOpacity>

            <View style={styles.responseSection}>
              <Text style={styles.sectionTitle}>Call Responses</Text>
              {selectedCall.responses?.length > 0 ? (
                selectedCall.responses.map((response: EmergencyResponse) => (
                  <View key={response.id} style={styles.responseBubble}>
                    <Text style={styles.responseAuthor}>
                      {response.responder?.name || 'Admin'}:
                    </Text>
                    <Text style={styles.responseText}>{response.response_text}</Text>
                    <Text style={styles.responseTime}>
                      {new Date(response.created_at).toLocaleTimeString()}
                    </Text>
                  </View>
                ))
              ) : (
                <Text style={styles.noResponses}>No responses yet</Text>
              )}
            </View>

            <TextInput
              style={styles.responseInput}
              placeholder="Type your response..."
              value={responseText}
              onChangeText={setResponseText}
              multiline
              editable={!isResponding}
            />

            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.actionButton, styles.resolveButton]}
                onPress={() => selectedCall && handleResolveCall(selectedCall.id)}
              >
                <Text style={styles.buttonText}>Resolve Call</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleSubmitResponse}
                disabled={isResponding || !responseText.trim()}
              >
                {isResponding ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Send Response</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          // Call List View
          <ScrollView style={styles.callList}>
            {calls.length > 0 ? (
              calls.map((call: EmergencyCall) => (
                <TouchableOpacity 
                  key={call.id}
                  style={styles.callCard}
                  onPress={() => handleSelectCall(call.id)}
                >
                  <View style={styles.callHeader}>
                    <Text style={styles.callName}>
                      {call.profiles?.name || 'Unknown caller'}
                    </Text>
                    <Text style={styles.callTime}>
                      {new Date(call.created_at).toLocaleTimeString()}
                    </Text>
                  </View>
                  <Text style={styles.callAddress}>
                    {call.caller_address || 'Location unknown'}
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.statusButton,
                      call.status === 'in_progress' && styles.inProgressButton
                    ]}
                    onPress={() => handleStartCall(call.id)}
                  >
                    <Text style={styles.statusButtonText}>
                      {call.status === 'active' ? 'Take Call' : 'In Progress'}
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.noCallsText}>No active emergency calls</Text>
            )}
          </ScrollView>
        )}
      </SafeAreaView>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: "#A7D477",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontFamily: "Anton-Regular",
    fontSize: 30,
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    paddingLeft: 10,
  },
  headerImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginRight: 10,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#EA3A57',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'Poppins-Regular',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callList: {
    width: '100%',
  },
  callCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  callHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  callName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  callTime: {
    color: '#666',
    fontSize: 14,
  },
  callAddress: {
    color: '#444',
    marginBottom: 10,
  },
  statusButton: {
    backgroundColor: '#EA3A57',
    padding: 8,
    borderRadius: 5,
    alignSelf: 'flex-start',
    minWidth: 100,
    alignItems: 'center',
  },
  inProgressButton: {
    backgroundColor: '#FF9800',
  },
  statusButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  detailView: {
    flex: 1,
    padding: 15,
  },
  backButton: {
    marginBottom: 15,
  },
  backButtonText: {
    color: '#EA3A57',
    fontWeight: 'bold',
  },
  callTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  callSubtitle: {
    fontSize: 16,
    marginBottom: 15,
    color: '#555',
  },
  locationBox: {
    backgroundColor: '#DAF0A2',
    padding: 15,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 20,
  },
  locationText: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
  },
  mapLink: {
    color: '#1a73e8',
    textDecorationLine: 'underline',
    marginTop: 5,
    textAlign: 'center',
  },
  responseSection: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 16,
  },
  responseBubble: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  responseAuthor: {
    fontWeight: 'bold',
    color: '#EA3A57',
  },
  responseText: {
    marginVertical: 5,
  },
  responseTime: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
  },
  noResponses: {
    fontStyle: 'italic',
    color: '#666',
    textAlign: 'center',
    marginVertical: 10,
  },
  responseInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    minHeight: 100,
    marginBottom: 15,
    textAlignVertical: 'top',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#EA3A57',
    padding: 15,
    borderRadius: 10,
    flex: 0.48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resolveButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noCallsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});

export default AdminCallReceiverScreen;