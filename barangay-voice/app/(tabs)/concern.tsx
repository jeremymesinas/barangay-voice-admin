import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView,
  ScrollView, Platform, Image, Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import { useRouter } from 'expo-router';

type SeverityLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export default function ConcernScreen() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [severity, setSeverity] = useState<SeverityLevel>('LOW');
  const [contact, setContact] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const router = useRouter();

  const handleSubmit = () => {
    setIsModalVisible(true);
  };

  const getSeverityStyle = (level: SeverityLevel) => {
    switch (level) {
      case 'LOW':
        return styles.severityLOW;
      case 'MEDIUM':
        return styles.severityMEDIUM;
      case 'HIGH':
        return styles.severityHIGH;
      case 'CRITICAL':
        return styles.severityCRITICAL;
      default:
        return styles.severityLOW;
    }
  };

  const navigateToReport = () => {
    setIsModalVisible(false);
    router.push('/Report');
  };

  return (
    <ScrollView style={styles.scrollView}>
      {/* Header */}
      <View style={styles.header}>
        <SafeAreaView style={styles.headerContent}>
          <Text style={styles.headerText}>BARANGAY{'\n'}VOICE</Text>
          <Image source={require('@/assets/images/banner.png')} style={styles.flagIcon} />
        </SafeAreaView>
      </View>

      {/* Red Banner */}
      <View style={styles.redBanner}>
        <Text style={styles.bannerText}>EMERGENCY RESPONSE</Text>
      </View>

      {/* Form Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>REPORT A CONCERN</Text>
        <Text style={styles.subtext}>
          Help us improve our barangay by reporting any issues or concerns you encounter.
          Select a category, describe the issue, and add a location or photo if possible.
          Our team will address it as soon as possible.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="#808080"
          value={name}
          onChangeText={setName}
        />

        <View style={styles.pickerContainer}>
          <RNPickerSelect
            onValueChange={(value) => setCategory(value)}
            value={category}
            placeholder={{ label: 'Select a Category', value: null }}
            items={[
              { label: 'Waste and Sanitation', value: 'waste' },
              { label: 'Health Concerns', value: 'health' },
              { label: 'Road and Traffic Issues', value: 'road' },
              { label: 'Environmental Concerns', value: 'environment' },
              { label: 'Public Safety', value: 'safety' },
              { label: 'Neighbor Concerns', value: 'neighbor' },
              { label: 'Community Services', value: 'services' },
              { label: 'Financial Assistance', value: 'finance' },
              { label: 'Other (Please Specify)', value: 'other' },
            ]}
            style={pickerStyles}
          />
        </View>

        <TextInput
          style={[styles.input, styles.textArea]}
          multiline
          numberOfLines={4}
          placeholderTextColor="#808080"
          placeholder="Briefly explain your concern"
          value={description}
          onChangeText={setDescription}
        />

        <TextInput
          style={styles.input}
          placeholderTextColor="#808080"
          placeholder="Enter Address (Optional)"
          value={address}
          onChangeText={setAddress}
        />

        <Text style={styles.label}>Importance Level:</Text>
        <View style={styles.severityRow}>
          {(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] as SeverityLevel[]).map((level) => (
            <View key={level} style={styles.severityColumn}>
              <TouchableOpacity
                style={[styles.severityBtn, severity === level && styles.selectedSeverity, getSeverityStyle(level)]}
                onPress={() => setSeverity(level)}
              >
                <Text style={styles.severityText}>{level}</Text>
              </TouchableOpacity>
              <Text style={styles.severityDescription}>
                {level === 'LOW' && 'Non-Urgent'}
                {level === 'MEDIUM' && 'Moderate Urgency'}
                {level === 'HIGH' && 'Immediate Attention\nNeeded'}
                {level === 'CRITICAL' && 'Emergency'}
              </Text>
            </View>
          ))}
        </View>

        <TextInput
          style={styles.input}
          placeholderTextColor="#808080"
          placeholder="Enter your Phone Number or Email"
          value={contact}
          onChangeText={setContact}
        />

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitText}>SUBMIT</Text>
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

            {/* ✅ Check Icon */}
            <Text style={styles.modalTitle}>REQUEST SUBMITTED.</Text>
            <Ionicons name="checkmark-circle" size={60} color="#4CAF50" style={styles.checkIcon} />
            <Text style={styles.modalMessage}>
              Your report has been successfully submitted. Our team will check and respond as soon as possible.
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
                onPress={navigateToReport} 
              >
                <Text style={styles.modalButtonText}>VIEW STATUS</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const pickerStyles = {
  inputIOS: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    color: 'black',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  inputAndroid: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    color: 'black',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
};

const styles = StyleSheet.create({
  scrollView: {
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
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Anton-Regular',
    color: '#EA3A57',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtext: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginBottom: 15,
    backgroundColor: '#F5F5F5',
    fontFamily: 'Poppins-Regular',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
    backgroundColor: '#F5F5F5',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    fontFamily: 'Poppins-Regular',
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  severityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  severityColumn: {
    alignItems: 'center',
    flex: 1,
  },
  severityBtn: {
    paddingVertical: 10,
    backgroundColor: '#ccc',
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  selectedSeverity: {
    borderWidth: 2,
    borderColor: '#fff',
  },
  severityText: {
    fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
    color: '#000',
  },
  severityDescription: {
    fontSize: 8,
    color: '#000',
    fontFamily: 'Poppins-Regular',
    marginTop: 5,
    textAlign: 'center',
  },
  severityLOW: { backgroundColor: '#4CAF50' },
  severityMEDIUM: { backgroundColor: '#FFEB3B' },
  severityHIGH: { backgroundColor: '#FF9800' },
  severityCRITICAL: { backgroundColor: '#F44336' },
  submitBtn: {
    backgroundColor: '#EA3A57',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  submitText: {
    color: '#fff',
    fontFamily: 'Anton-Regular',
    fontSize: 30,
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
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Anton-Regular',
    color: '#EA3A57',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#EA3A57',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  modalButtonText: {
    color: '#000',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
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
  verticalDivider: {
    width: 1,
    backgroundColor: '#ccc',
  },
  checkIcon: {
    marginBottom: 10,
    color: '#EA3A57',
  },
});

