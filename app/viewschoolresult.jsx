import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, Linking, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './../configs/FirebaseConfig';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { GetPhotoRef } from './../services/GooglePlaceApi';

// 🔹 Component to open school website
const SchoolWebsite = ({ website }) => {
  if (!website) return <Text style={styles.noReviews}>Website not available</Text>;

  return (
    <Text style={styles.link} onPress={() => Linking.openURL(website)}>
      Visit School Website
    </Text>
  );
};

// 🔹 Component to open school in Google Maps
const OpenInMapsButton = ({ school }) => {
  const openInMaps = () => {
    const { location, name } = school;
    if (location?.lat && location?.lng) {
      const url = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`;
      Linking.openURL(url);
    } else if (name) {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name)}`;
      Linking.openURL(url);
    }
  };

  return (
    <Text style={styles.link} onPress={openInMaps}>
      📍 Open in Google Maps
    </Text>
  );
};

const ViewSchoolResult = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { docId } = route.params;
  const [schoolData, setSchoolData] = useState(null);
  const [parsedSearchData, setParsedSearchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [photoRefs, setPhotoRefs] = useState({});

  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        const docRef = doc(db, 'UserSchools', docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setSchoolData(data);

          if (typeof data.schoolSearchData === 'string') {
            setParsedSearchData(JSON.parse(data.schoolSearchData));
          } else {
            setParsedSearchData(data.schoolSearchData);
          }

          const refs = {};
          const topSchools = Array.isArray(data.suggestions) ? data.suggestions : [];

          for (const school of topSchools) {
            const ref = await GetPhotoRef(school.name);
            refs[school.name] = ref;
          }

          setPhotoRefs(refs);
        } else {
          console.warn('No school data found for the given docId.');
        }
      } catch (error) {
        console.error('Error fetching school data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchoolData();
  }, [docId]);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (!schoolData || !parsedSearchData) return <Text>No school data available.</Text>;

  const topSchools = Array.isArray(schoolData?.suggestions) ? schoolData.suggestions : [];

  return (
    <ScrollView style={styles.container}>
      {/* 🔙 Back Button */}
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('findschools')}>
          <Ionicons name="arrow-back" size={28} color="#111" />
        </TouchableOpacity>
      </View>

      <Text style={styles.header}>School Search Results</Text>

      <View style={styles.section}>
        <Text style={styles.detailsText}>Location: {parsedSearchData.location}</Text>
        <Text style={styles.detailsText}>Age: {parsedSearchData.age}</Text>
        <Text style={styles.detailsText}>Gender: {parsedSearchData.gender}</Text>
        <Text style={styles.detailsText}>Disability: {parsedSearchData.disability}</Text>
      </View>

      <Text style={styles.subHeader}>Suggested Schools:</Text>

      {topSchools.length > 0 ? (
        topSchools.map((school, index) => (
          <View key={index} style={styles.schoolCard}>
            {/* 📷 School Image */}
            {photoRefs[school.name] ? (
              <Image
                source={{
                  uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRefs[school.name]}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
                }}
                style={styles.schoolImage}
              />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text>Image Not Available</Text>
              </View>
            )}

            <Text style={styles.schoolName}>{school.name}</Text>
            <Text style={styles.detailsText}>Board: {school.board}</Text>
            <Text style={styles.detailsText}>Annual Fee: {school.annual_fee}</Text>
            <Text style={styles.detailsText}>Rating: {school.rating}</Text>
            <Text style={styles.detailsText}>Contact: {school.contact_number}</Text>

            {/* 🔗 External Links */}
            <SchoolWebsite website={school.website_url} />
            <OpenInMapsButton school={school} />

            {/* 💬 Reviews */}
            {school.reviews && school.reviews.length > 0 ? (
              <View style={styles.reviewsSection}>
                <Text style={styles.reviewsHeader}>Reviews:</Text>
                {school.reviews.map((review, reviewIndex) => (
                  <View key={reviewIndex} style={styles.reviewCard}>
                    <Text style={styles.reviewAuthor}>⭐ {review.reviewer_name} ({review.rating}/5)</Text>
                    <Text style={styles.reviewText}>{review.review_text || 'No comment provided.'}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={styles.noReviews}>No reviews available.</Text>
            )}
          </View>
        ))
      ) : (
        <Text style={styles.noSuggestions}>No suggestions available.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#f9f9f9' },
  backButtonContainer: { marginBottom: 4 },
  header: { fontSize: 32, fontWeight: 'bold', marginBottom: 12, color: '#333' },
  subHeader: { fontSize: 20, fontWeight: '600', marginVertical: 12, color: '#555' },
  section: {
    marginBottom: 16,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  detailsText: { fontSize: 16, marginBottom: 4, color: '#555' },
  schoolCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  schoolImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
    borderRadius: 6,
    marginBottom: 8,
  },
  imagePlaceholder: {
    width: '100%',
    height: 180,
    borderRadius: 6,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  schoolName: { fontSize: 18, fontWeight: '600', marginBottom: 4, color: '#333' },
  link: { color: '#007bff', textDecorationLine: 'underline', marginTop: 4 },
  reviewsSection: { marginTop: 12 },
  reviewsHeader: { fontSize: 18, fontWeight: '600', marginBottom: 6, color: '#333' },
  reviewCard: {
    backgroundColor: '#e9e9e9',
    padding: 10,
    marginBottom: 8,
    borderRadius: 8,
  },
  reviewAuthor: { fontWeight: 'bold', marginBottom: 4 },
  reviewText: { fontStyle: 'italic', marginBottom: 4 },
  noReviews: { fontStyle: 'italic', color: '#777', marginTop: 6 },
  noSuggestions: { fontStyle: 'italic', color: '#777' },
});

export default ViewSchoolResult;
