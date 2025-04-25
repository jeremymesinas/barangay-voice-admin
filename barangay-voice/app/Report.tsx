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
import BottomNavigation from '@/components/BottomNavigation';

export default function Report() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <SafeAreaView style={styles.headerContent}>
          <Text style={styles.headerText}>BARANGAY{'\n'}VOICE</Text>
          <Image source={require('@/assets/images/banner.png')} style={styles.flagIcon} />
        </SafeAreaView>
      </View>

      <View style={styles.redBanner}>
        <Text style={styles.bannerText}>REPORTS</Text>
      </View>

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

      <BottomNavigation />
    </View>
  );
}

const reportData = [
  {
    icon: require('@/assets/images/logo.png'),
    title: 'PATANGGAL NG MGA GRAFFITI',
    meta: 'by: user1234507, October 28, 6:20 PM',
    status: 'PENDING',
  },
  {
    icon: require('@/assets/images/logo.png'),
    title: 'Amoy ihi yung kapitbahay ASAP',
    meta: 'by: user235452, October 28, 6:20 PM',
    status: 'PENDING',
  },
  {
    icon: require('@/assets/images/logo.png'),
    title: 'RANDOM PROBLEM',
    meta: 'by: user235452, October 28, 6:20 PM',
    status: 'RESOLVED',
  },
];

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 22,
    fontFamily: 'Anton-Regular',  // Updated to Anton font
    fontWeight: '700',
    lineHeight: 26,
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
    marginTop: -15,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  bannerText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Anton-Regular',  // Updated to Anton font
    fontWeight: '700',
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
    backgroundColor: '#E4F1AC',
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
    fontSize: 16,
    fontFamily: 'Poppins-Regular',  // Updated to Poppins font
    fontWeight: '700',
    color: '#333',
    marginBottom: 5,
  },
  meta: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',  // Updated to Poppins font
    fontWeight: '400',
    color: '#555',
    marginBottom: 8,
  },
  status: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',  // Updated to Poppins font
    fontWeight: '600',
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
    fontSize: 14,
    fontFamily: 'Poppins-Regular',  // Updated to Poppins font
    fontWeight: '600',
  },
});
