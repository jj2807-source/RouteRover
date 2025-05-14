import { View, Text, Image, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import moment from 'moment';
import FlightInfo from '../../Components/TripDetails/FlightInfo';
import HotelList from '../../Components/TripDetails/HotelList';
import PlannedTrip from '../../Components/TripDetails/PlannedTrip';


export default function TripDetails(tripData) {
  const navigation = useNavigation();
  const { trip } = useLocalSearchParams();
  const [tripDetails, setTripDetails] = useState(null);
  const formatData = (data) => {
    return JSON.parse(data);
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });
     console.log(JSON.parse(trip))
    setTripDetails(JSON.parse(trip));
  }, []);

  useEffect(() => {
    if (tripDetails) {
      console.log('Trip Details:', tripDetails);
    }
  }, [tripDetails]);

  return tripDetails && (
    <ScrollView>
      <Image source={{uri:'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference='+formatData(tripDetails.tripData).locationInfo?.photoRef+'&key='+process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}}
              style={{
                width: '100%',
                height: 260,
                objectFit: 'cover',
                borderRadius: 15
              }}
        />
      <View
        style={{
          padding: 15,
          backgroundColor: '#fff',
          height: '100%',
          marginTop: -20,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <Text
          style={{
            fontSize: 25,
            fontWeight: '900',
          }}
        >
          {formatData(tripDetails.tripData)?.locationInfo?.name || formatData(tripDetails.tripData)?.destination}

        </Text>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 5,
            marginTop: 5,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: '#808080',
            }}
          >
            {moment(formatData(tripDetails.tripData).startDate).format('DD MMM yyyy')}
          </Text>

          <Text
            style={{
              fontSize: 18,
              color: '#808080',
            }}
          >
            -{moment(formatData(tripDetails.tripData).endDate).format('DD MMM yyyy')}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 17,
            color:'gray'
          }}
        >
          🚌 {formatData(tripDetails.tripData)?.traveler?.title}
        </Text>

        {/* Flight Info */}
        <FlightInfo flightData={tripDetails?.tripPlan?.tripDetails?.flightDetails} />

        {/* Hotel List */}
        <HotelList hotelList ={tripDetails?.tripPlan?.tripDetails?.hotelOptions}/>

        {/* Trip Day Planner Info */}
        <PlannedTrip details={tripDetails?.tripPlan?.tripDetails?.itinerary}/>
      </View>

      
    </ScrollView>
  );
}
