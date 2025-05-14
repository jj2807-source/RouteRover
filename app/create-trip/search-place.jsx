import React, { useContext, useEffect } from 'react';
import 'react-native-get-random-values';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { CreateTripContext } from './../../context/CreateTripContext';

export default function SearchPlace() {
  const navigation = useNavigation();
  const router = useRouter();
  const { tripData, setTripData } = useContext(CreateTripContext);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: 'Search Place',
    });
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/images/travel-bg.jpg')} // ✅ Your background image path
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.overlay}
      >
        <Text style={styles.heading}>Enter Travel Details</Text>

        <Text style={styles.label}>Current Location</Text>
        <GooglePlacesAutocomplete
          placeholder="Where are you now?"
          fetchDetails
          onPress={(data, details = null) => {
            setTripData((prev) => ({
              ...prev,
              currentLocation: {
                name: data.description,
                cordinates: details?.geometry.location,
                photoRef: details?.photos?.[0]?.photo_reference,
                url: details?.url,
              },
            }));
          }}
          query={{
            key: process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
            language: 'en',
          }}
          styles={autoCompleteStyles}
        />

        <Text style={styles.label}>Destination</Text>
        <GooglePlacesAutocomplete
          placeholder="Where do you want to go?"
          fetchDetails
          onPress={(data, details = null) => {
            setTripData((prev) => ({
              ...prev,
              locationInfo: {
                name: data.description,
                cordinates: details?.geometry.location,
                photoRef: details?.photos?.[0]?.photo_reference,
                url: details?.url,
              },
            }));
            router.push('/create-trip/select-traveler');
          }}
          query={{
            key: process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
            language: 'en',
          }}
          styles={autoCompleteStyles}
        />
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.4)', // semi-transparent white overlay
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 30,
    color: '#111827',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 6,
    color: '#374151',
  },
});

const autoCompleteStyles = {
  textInputContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 20,
  },
  textInput: {
    height: 48,
    borderRadius: 10,
    fontSize: 16,
    paddingHorizontal: 10,
    color: '#111',
  },
  listView: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 4,
    elevation: 3,
  },
};
