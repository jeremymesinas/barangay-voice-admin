import React, { useState, useRef } from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import OngoingCall from '../ongoingcall';

export default function EmergencyResponseScreen() {
  const [isCalling, setIsCalling] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const callCancelledRef = useRef(false); 
  const router = useRouter();
  
  const handleCall = () => {
    callCancelledRef.current = false;
    setIsCalling(true);
  
    setTimeout(() => {
      if (!callCancelledRef.current) {
        setIsCalling(false);
        router.push('/ongoingcall');
      }
    }, 3000);
  };
  

  if (isConnected) {
    return <OngoingCall onEndCall={() => {
      setIsCalling(false);
      setIsConnected(false);
    }} />;
  }
  

  return (
    <View style={styles.wrapper}>
      {/* Header */}
      <View style={styles.header}>
        <SafeAreaView style={styles.headerContent}>
          <Text style={styles.headerText}>BARANGAY{'\n'}VOICE</Text>
          <Image source={require('@/assets/images/banner.png')} style={styles.flagIcon} />
        </SafeAreaView>
      </View>

      <SafeAreaView style={styles.container}>
        {/* Red Banner */}
        <View style={styles.redBanner}>
          <Text style={styles.bannerText}>EMERGENCY RESPONSE</Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {isCalling ? (
            <>
              <Text style={styles.title}>Connecting to Barangay Maclab…</Text>
              <Text style={styles.subtitle}>Please wait while we connect your emergency call.</Text>
              <Image source={require('@/assets/images/call.png')} style={styles.sosImage} />
              <TouchableOpacity
                onPress={() => {
                    callCancelledRef.current = true;
                    setIsCalling(false);
                }}
                style={styles.cancelBtn}
                >
                <Text style={styles.cancelText}>Cancel call</Text>
            </TouchableOpacity>

              <Text style={styles.subtitle}>Keep calm. Help is on the way…</Text>
              <ActivityIndicator size="small" color="#EA3A57" style={{ marginVertical: 30 }} />
            </>
          ) : (
            <>
              <Text style={styles.title}>Are you safe?</Text>
              <TouchableOpacity onPress={handleCall}>
                <Image source={require('@/assets/images/sos.png')} style={styles.sosImage} />
              </TouchableOpacity>
              <Text style={styles.subtitle}>
                Press the button if you think you are in danger. You will be directed to a call with Barangay Maclab.
              </Text>
            </>
          )}

          <View style={styles.locationBox}>
            <Text style={styles.locationText}>
              📍 938 Aurora Blvd, Cubao, Quezon City, 1109 Metro Manila
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#88C057',
    paddingTop: Platform.OS === 'android' ? 40 : 0,
    paddingBottom: 20,
    width: '100%',
  },
  headerContent: {
    marginLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
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
    marginRight: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  redBanner: {
    backgroundColor: '#EA3A57',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
    width: 285,
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
    fontFamily: 'Anton-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontFamily: 'Poppins-Regular',
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginHorizontal: 10,
    marginTop: 10,
  },
  sosImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  locationBox: {
    backgroundColor: '#DAF0A2',
    padding: 15,
    borderRadius: 15,
    marginTop: 30,
    width: '100%',
  },
  locationText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#000',
    textAlign: 'center',
  },
  cancelBtn: {
    backgroundColor: '#DAF0A2',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 20,
  },
  cancelText: {
    color: '#EA3A57',
    fontFamily: 'Anton-Regular',
    fontSize: 16,
  },
});

