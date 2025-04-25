import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity, Platform, Dimensions, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';

const { width } = Dimensions.get('window');

interface Props {
  onEndCall: () => void;
}

export default function OngoingCall({ onEndCall }: Props) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { text: 'This is Barangay Maclab, how can we help?', sender: 'receiver' },
    { text: 'I need help, there is a fire.', sender: 'sender' },
  ]);

  const router = useRouter();

  const [fontsLoaded] = useFonts({
    'Anton-Regular': require('@/assets/fonts/Anton.ttf'),
    'Poppins-Regular': require('@/assets/fonts/Poppins.ttf'),
  });

  const handleSend = () => {
    if (message.trim() !== '') {
      setMessages([...messages, { text: message, sender: 'sender' }]);
      setMessage('');
    }
  };

  const handleEndCall = () => {
    router.push('/emergency');
  };

  if (!fontsLoaded) {
    return (
      <ActivityIndicator
        size="large"
        color="#EA3A57"
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      />
    );
  }

  return (
    <ScrollView style={styles.scrollArea}>
      <View style={styles.wrapper}>
        {/* Header */}
        <View style={styles.header}>
          <SafeAreaView style={styles.headerContent}>
            <Text style={styles.headerText}>BARANGAY{'\n'}VOICE</Text>
            <Image source={require('@/assets/images/banner.png')} style={styles.flagIcon} />
          </SafeAreaView>
        </View>

        {/* Emergency Banner */}
        <View style={styles.redBanner}>
          <Text style={styles.bannerText}>EMERGENCY RESPONSE</Text>
        </View>

        <SafeAreaView style={styles.container}>
          <Text style={styles.statusText}>Ongoing call</Text>

          <View style={styles.circleLogo}>
            <Image source={require('@/assets/images/logo.png')} style={{ width: 70, height: 70 }} />
          </View>

          <Text style={styles.agency}>Barangay Maclab</Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="mic-off" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="volume-mute" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleEndCall} style={[styles.actionButton, styles.endCall]}>
              <Ionicons name="call" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <Text style={styles.boldText}>Unable to talk?</Text>
          <Text style={styles.infoText}>
            Inform the local authorities of your current status by sending a message.
          </Text>

          <View style={styles.chatContainer}>
            {messages.map((msg, index) => (
              <View
                key={index}
                style={[styles.chatBubble, msg.sender === 'sender' ? styles.sender : styles.receiver]}
              >
                <Text style={styles.chatText}>{msg.text}</Text>
              </View>
            ))}

            <View style={styles.inputBar}>
              <TouchableOpacity>
                <Ionicons name="camera" size={24} color="#000" />
              </TouchableOpacity>
              <TextInput
                style={styles.textInput}
                value={message}
                onChangeText={setMessage}
                placeholder="Type a message..."
              />
              <TouchableOpacity onPress={handleSend}>
                <Ionicons name="send" size={24} color="#EA3A57" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.locationBox}>
            <Text style={styles.locationLabel}>📍 Sharing your current location:</Text>
            <Text style={styles.locationText}>
              938 Aurora Blvd, Cubao, Quezon City, 1109 Metro Manila
            </Text>
          </View>
        </SafeAreaView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: width * 0.05,
    alignItems: 'center',
  },
  scrollArea: {
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#88C057',
    paddingTop: Platform.OS === 'android' ? 40 : 0,
    paddingBottom: 40,
    width: '100%',
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontFamily: 'Anton-Regular',
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
    borderRadius: 20,
    width: 285,
    height: 83,
    alignSelf: 'center',
    marginTop: -30,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerText: {
    color: '#fff',
    fontFamily: 'Anton-Regular',
    fontSize: 18,
    textAlign: 'center',
  },
  statusText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    textAlign: 'center',
  },
  circleLogo: {
    marginTop: 15,
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: width * 0.125,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  agency: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginVertical: 10,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
    marginVertical: 20,
    width: '60%',
  },
  actionButton: {
    backgroundColor: '#DAF0A2',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  endCall: {
    backgroundColor: '#EA3A57',
  },
  boldText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginTop: 15,
  },
  infoText: {
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  chatContainer: {
    width: '100%',
    marginTop: 10,
    marginBottom: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  chatBubble: {
    maxWidth: '75%',
    padding: 10,
    marginVertical: 4,
    borderRadius: 10,
  },
  sender: {
    backgroundColor: '#DAF0A2',
    alignSelf: 'flex-end',
  },
  receiver: {
    backgroundColor: '#F0F0F0',
    alignSelf: 'flex-start',
  },
  chatText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    marginTop: 10,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    marginHorizontal: 10,
    fontFamily: 'Poppins-Regular',
  },
  locationBox: {
    backgroundColor: '#DAF0A2',
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 10,
  },
  locationLabel: {
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#EA3A57',
  },
  locationText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
});
