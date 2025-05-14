import { View, Text, Image, ActivityIndicator, Alert } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { FindSchoolContext } from '../context/FindSchoolContext';
import { chatSession } from '../configs/AiModal';
import { useRouter } from 'expo-router';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../configs/FirebaseConfig';

export default function GenerateSchoolSearch() {
  const { schoolSearchData } = useContext(FindSchoolContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const user = auth.currentUser;

  useEffect(() => {
    if (schoolSearchData) {
      generateAiSchoolSearch();
    }
  }, [schoolSearchData]);

  const generateAiSchoolSearch = async () => {
    setLoading(true);

  const CUSTOM_PROMPT = `
You are an expert in Indian education directories.

Find up to 10 real, existing schools (preferably CBSE board) in or near ${schoolSearchData?.location} that are suitable for a ${schoolSearchData?.age}-year-old ${schoolSearchData?.gender} student with ${schoolSearchData?.disability}.

For each school, return the following information in a JSON array format:
[
  {
    "name": "",
    "address": "",
    "board": "",
    "age_group_supported": "",
    "annual_fee": "",
    "contact_number": "",
    "website_url": "",
    "rating": 0-5,
    "image_url": "",
    "location": { "lat": 0.0, "lng": 0.0 },
    "reviews": [
      {
        "reviewer_name": "",
        "review_text": "",
        "rating": 0-5
      }
    ]
  }
]

Important:
- Use real Indian school names (avoid placeholders like "School 1").
- Do not add explanations, just return the JSON.
- Keep the response under 1500 words.
`;

    console.log('Generating AI school search results with the following criteria:', {
      location: schoolSearchData?.location,
      age: schoolSearchData?.age,
      disability: schoolSearchData?.disability,
      gender: schoolSearchData?.gender,
    });

    try {
      const result = await chatSession.sendMessage(CUSTOM_PROMPT);
      const rawText = await result.response.text();
      const schoolSuggestions = JSON.parse(rawText);

      if (!schoolSuggestions || schoolSuggestions.length === 0) {
        console.warn('No schools found based on the given criteria:', { schoolSearchData });
        throw new Error('No schools found based on the given criteria.');
      }

      const docId = Date.now().toString();
      
      // Log successful response
      console.log('Received school suggestions from AI:', schoolSuggestions);

      await setDoc(doc(db, 'UserSchools', docId), {
        userEmail: user?.email || 'guest',
        schoolSearchData: JSON.stringify(schoolSearchData),
        suggestions: schoolSuggestions,
        docId,
        createdAt: new Date(),
      });

      setLoading(false);
      console.log('Saved school search results to Firebase with docId:', docId);

      // Navigate with docId
      router.push({ pathname: '/findschools', params: { docId } });
      
    } catch (err) {
      console.error('Error generating school list:', err);
      console.error('Error during school search generation:', {
        error: err.message,
        schoolSearchData
      });

      setLoading(false);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  return (
    <View style={{ padding: 25, paddingTop: 75, backgroundColor: '#fff', height: '100%' }}>
      <Text style={{ fontSize: 35, textAlign: 'center', fontWeight: '900' }}>Please Wait...</Text>

      <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: '600', marginTop: 40 }}>
        We are working to find the best schools for your child.
      </Text>

      <Image
        source={require('./../assets/images/college-back-to-school.gif')}
        style={{
          width: '100%',
          height: 200,
          resizeMode: 'contain',
          marginTop: 30,
        }}
      />

      <Text style={{ fontSize: 16, color: '#808080', textAlign: 'center' }}>
        Please do not go back
      </Text>

      {loading && (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 40 }} />
      )}
    </View>
  );
}
