import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window'); 

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

  const handleSend = () => {
    if (message.trim() !== '') {
      setMessages([...messages, { text: message, sender: 'sender' }]);
      setMessage('');
    }
  };

  const handleEndCall = () => {
    router.push('/emergency');
  };

  return (
    <ScrollView style={styles.scrollArea}>
      <View style={styles.wrapper}>
        {/* Header Section */}
        <View style={styles.topHalf}>
          <View>
            <Text style={styles.topLeftText}>BARANGAY{"\n"}VOICE</Text>
          </View>
          <Image
            source={require('@/assets/images/barangay-voice.png')}
            style={styles.topRightImage}
          />
        </View>

        {/* Red Banner */}
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
  topHalf: {
    backgroundColor: "#A7D477",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: '100%',
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
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: width * 0.05,
    justifyContent: 'center', 
    alignItems: 'center', 
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
    borderRadius: 20,
    width: 285,
    height: 83,
    alignSelf: 'center',
    marginTop: 20, 
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
  scrollArea: {
    backgroundColor: '#fff',
  },
  statusText: {
    fontWeight: 'bold',
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
    fontWeight: 'bold',
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
    fontWeight: 'bold',
    marginTop: 15,
    textAlign: 'center',
  },
  infoText: {
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
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
    color: '#000',
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
  },
  locationBox: {
    backgroundColor: '#DAF0A2',
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 10,
  },
  locationLabel: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#EA3A57',
  },
  locationText: {
    fontSize: 14,
  },
});
