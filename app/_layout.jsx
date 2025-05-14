import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { CreateTripContext } from './../context/CreateTripContext';
import { FindSchoolContext } from './../context/FindSchoolContext';
import { useFonts } from 'expo-font';

export default function RootLayout() {
  useFonts({
    'outfit': require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('./../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('./../assets/fonts/Outfit-Bold.ttf')
  });

  const [tripData, setTripData] = useState([]);
  const [schoolSearchData, setSchoolSearchData] = useState({
    age: '',
    gender: '',
    disability: '',
    location: '',
    dayScholar: true,
  });
  

  return (
    <CreateTripContext.Provider value={{ tripData, setTripData }}>
      <FindSchoolContext.Provider value={{ schoolSearchData, setSchoolSearchData }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </FindSchoolContext.Provider>
    </CreateTripContext.Provider>
  );
}
