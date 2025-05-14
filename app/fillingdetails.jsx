import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FindSchoolContext } from './../context/FindSchoolContext';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { auth, db } from './../configs/FirebaseConfig';
import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';

export default function FindSchools() {
  const router = useRouter();
  const { schoolSearchData, setSchoolSearchData } = useContext(FindSchoolContext);
  const [genderModalVisible, setGenderModalVisible] = useState(false);
  const [disabilityModalVisible, setDisabilityModalVisible] = useState(false);

  const genderOptions = ['Male', 'Female', 'Other'];
  const disabilityOptions = [
    'Visual Impairment',
    'Hearing Impairment',
    'Physical Disability',
    'Intellectual Disability',
    'Autism Spectrum Disorder',
    'Speech and Language Disability',
    'Learning Disability',
    'Multiple Disabilities',
    'Cerebral Palsy',
    'Mental Illness',
    'Other',
  ];

  const handleChange = (key, value) => {
    setSchoolSearchData((prev) => ({ ...prev, [key]: value }));
  };

  const handleAgeChange = (text) => {
    if (/^\d{0,2}$/.test(text)) {
      handleChange('age', text);
    }
  };

  const onNavigateToFillDetails = () => {
    router.push('/generateschoolresult');
  };

  const renderModal = (visible, setVisible, options, key) => (
    <Modal transparent visible={visible} animationType="slide" onRequestClose={() => setVisible(false)}>
      <TouchableOpacity style={styles.modalOverlay} onPress={() => setVisible(false)}>
        <View style={styles.modalContent}>
          <FlatList
            data={options}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  handleChange(key, item);
                  setVisible(false);
                }}
              >
                <Text style={styles.modalItemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.page}>
        <TouchableOpacity onPress={() => router.replace('/homepage')} style={styles.backArrow}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        {/* Gender Field */}
        <TouchableOpacity style={styles.inputField} onPress={() => setGenderModalVisible(true)}>
          <Text>{schoolSearchData.gender || 'Select Gender'}</Text>
        </TouchableOpacity>
        {renderModal(genderModalVisible, setGenderModalVisible, genderOptions, 'gender')}

        {/* Disability Field */}
        <TouchableOpacity style={styles.inputField} onPress={() => setDisabilityModalVisible(true)}>
          <Text>{schoolSearchData.disability || 'Select Disability'}</Text>
        </TouchableOpacity>
        {renderModal(disabilityModalVisible, setDisabilityModalVisible, disabilityOptions, 'disability')}

        {/* Age Field */}
        <TextInput
          style={styles.inputField}
          keyboardType="numeric"
          value={schoolSearchData.age}
          onChangeText={handleAgeChange}
          placeholder="Enter Age"
        />

        {/* Day Scholar Field */}
        <View style={styles.inputField}>
          <Text>Day Scholar: {schoolSearchData.dayScholar ? 'Yes' : 'No'}</Text>
          <TouchableOpacity onPress={() => handleChange('dayScholar', !schoolSearchData.dayScholar)}>
            <Text style={styles.toggleButton}>Toggle</Text>
          </TouchableOpacity>
        </View>

        {/* Location Field */}
        <GooglePlacesAutocomplete
          placeholder="Search for a Location"
          fetchDetails
          onPress={(data) => handleChange('location', data.description)}
          query={{
            key: process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
            language: 'en',
            types: '(cities)',
          }}
          onFail={(error) => console.error('Google Places autocomplete failed:', error)}
          debounce={200}
          styles={{
            textInput: styles.inputField,
            listView: { backgroundColor: 'white' },
          }}
        />

        {/* Find School Button */}
        <TouchableOpacity style={styles.button} onPress={onNavigateToFillDetails}>
          <Text style={styles.buttonText}>Find Schools</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  backArrow: {
    marginTop: 10,
    marginBottom: 20,
  },
  inputField: {
    padding: 14,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    paddingVertical: 15,
    backgroundColor: '#000000', // changed to black
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: '85%',
    borderRadius: 12,
    maxHeight: '60%',
  },
  modalItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
  },
  toggleButton: {
    marginTop: 10,
    fontSize: 15,
    color: '#007BFF',
  },
});
