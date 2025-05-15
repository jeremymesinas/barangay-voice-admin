import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';


export default function Report() {
  return (
    <View style={styles.wrapper}>
      {/* Updated Header to match concern.tsx */}
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
      <Text style={styles.headerTitle}>YOUR REPORTS</Text>

      {/* Content */}
      <SafeAreaView style={styles.contentWrapper}>
        <ScrollView contentContainerStyle={styles.content}>
          {reportData.map((report, index) => (
            <View key={index} style={styles.card}>
              <Image source={report.icon} style={styles.avatar} />
              <View style={styles.cardDetails}>
                <Text style={styles.title}>{report.title}</Text>
                <Text style={styles.meta}>{report.meta}</Text>
                <Text
                  style={[
                    styles.status,
                    report.status === 'PENDING' ? styles.pending : styles.resolved,
                  ]}
                >
                  {report.status}
                </Text>
              </View>
              <TouchableOpacity style={styles.viewButton} onPress={() => router.push('/ReportDetails')}>
                <Text style={styles.viewText}>VIEW</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const reportData = [
  {
    icon: require('@/assets/images/logo.png'),
    title: 'PATANGGAL NG MGA GRAFFITI',
    meta: 'October 28, 6:20 PM',
    status: 'PENDING',
  },
  {
    icon: require('@/assets/images/logo.png'),
    title: 'Amoy ihi yung kapitbahay ASAP',
    meta: 'October 28, 6:20 PM',
    status: 'PENDING',
  },
  {
    icon: require('@/assets/images/logo.png'),
    title: 'RANDOM PROBLEM',
    meta: 'October 28, 6:20 PM',
    status: 'RESOLVED',
  },
];

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  // Updated header styles to match concern.tsx
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
  
  redBanner: {
    backgroundColor: '#EA3A57',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
    width: 285,
    height: 83,
    alignSelf: 'center',
    marginTop: 15, // Adjusted margin to account for different header height
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
  contentWrapper: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  content: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    // backgroundColor: '#E4F1AC',
    borderRadius: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F8D5',
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#FF748B',
  },
  avatar: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
    marginRight: 15,
  },
  cardDetails: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#EA3A57',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'Poppins-Regular',
  },
  meta: {
    fontSize: 13,
    color: '#555',
    marginBottom: 8,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  pending: {
    color: '#FFA500',
  },
  resolved: {
    color: '#4CAF50',
  },
  viewButton: {
    backgroundColor: '#E4F1AC',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FF748B',
  },
  viewText: {
    color: '#EA3A57',
    fontWeight: 'bold',
    fontSize: 14,
  },
});