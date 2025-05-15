import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

export default function ReportDetails() {
  const params = useLocalSearchParams();
  const { user } = useAuth();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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
                <Text style={styles.meta}>{formatDate(params.date as string)}</Text>
                <Text
                  style={[
                    styles.status,
                    params.status === 'PENDING' ? styles.pending : styles.resolved,
                  ]}
                >
                  {params.status}
                </Text>
              </View>
            </View>

            <Text style={styles.reportText}>
              {params.content}
            </Text>

            {/* Buttons */}
            {/* <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.buttonText}>RESPOND</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.buttonText}>MARK AS READ</Text>
              </TouchableOpacity>
            </View> */}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
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
