import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomePage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome! Choose an Option</Text>

      <ImageBackground
        source={require('./../assets/images/trip.jpg')} // replace with actual path
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
      >
        <TouchableOpacity
          style={styles.overlayButton}
          onPress={() => router.push('/mytrip')}
        >
          <Text style={styles.buttonText}>Plan My Trip</Text>
        </TouchableOpacity>
      </ImageBackground>

      <ImageBackground
        source={require('./../assets/images/school.jpg')} // replace with actual path
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
      >
        <TouchableOpacity
          style={[styles.overlayButton, styles.secondaryOverlayButton]}
          onPress={() => router.push('/schools')}
        >
          <Text style={styles.buttonText}>Find Schools for Specially Abled Child</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  imageBackground: {
    height: 180,
    marginVertical: 12,
    justifyContent: 'flex-end',
    borderRadius: 15,
    overflow: 'hidden',
  },
  imageStyle: {
    resizeMode: 'cover',
  },
  overlayButton: {
    backgroundColor: 'rgba(30, 144, 255, 0.8)',
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  secondaryOverlayButton: {
    backgroundColor: 'rgba(30, 144, 255, 0.8)',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
