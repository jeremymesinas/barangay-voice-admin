import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export default function ReportDetails() {
  return (
    <View style={styles.wrapper}>
      {/* Header */}
      <View style={styles.header}>
        <SafeAreaView style={styles.headerContent}>
          <Text style={styles.headerText}>BARANGAY{'\n'}VOICE</Text>
          <Image source={require('@/assets/images/banner.png')} style={styles.flagIcon} />
        </SafeAreaView>
      </View>

      {/* Red Banner with Back Arrow and Title */}
      <View style={styles.redBanner}>
        <Text style={styles.bannerText}>REPORTS</Text>
      </View>

      {/* Content */}
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.reportCard}>
            <View style={styles.reportHeader}>
              <Image source={require('@/assets/images/logo.png')} style={styles.avatar} />
              <View style={styles.reportMeta}>
                <Text style={styles.reportTitle}>PATANGGAL NG MGA GRAFFITI</Text>
                <Text style={styles.meta}>by: user1234507, October 28, 6:20 PM</Text>
              </View>
            </View>

            <Text style={styles.reportText}>
            Magandang araw! Nais ko sanang ipabatid ang isang sitwasyon na nagdudulot ng abala sa aming komunidad. Napansin ko na may matinding amoy ng ihi mula sa bahay ng isang kapitbahay, na marahil ay dulot ng kanilang aso na hindi nililinis nang maayos. Ang amoy ay nagiging sanhi ng hindi komportableng kondisyon sa paligid.
              {'\n\n'}
              Nauunawaan ko na may mga pagkakataong ang ganitong sitwasyon ay maaaring hindi sinasadya, ngunit ito ay nagiging sanhi ng alalahanin sa mga residente sa paligid. Nais ko sanang humiling ng tulong mula sa barangay upang masolusyunan ang problemang ito.
              {'\n\n'}
              Umaasa ako na sa pamamagitan ng inyong tulong, makakahanap tayo ng paraan upang maayos ang sitwasyong ito para sa kapakanan ng lahat. Salamat sa inyong atensyon at pang-unawa.
            </Text>

            {/* Buttons */}
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.buttonText}>RESPOND</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.buttonText}>MARK AS READ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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
