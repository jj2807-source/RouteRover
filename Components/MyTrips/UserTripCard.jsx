import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function UserTripCard({ trip }) {
  const formatData = (data) => JSON.parse(data);
  const tripData = formatData(trip.tripData);
  const router = useRouter();

  return (
    <View
      style={{
        marginTop: 5,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
      }}
    >
      <Image source={{uri:'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference='+formatData(trip.tripData)?.locationInfo?.photoRef+'&key='+process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}}
              style={{
                width: 100,
                height: 100,
                borderRadius: 10,
                resizeMode: 'cover',
              }}
              />
      {/* <Image
        source={require('./../../assets/images/R.jpeg')}
        style={{
          width: 100,
          height: 100,
          borderRadius: 10,
          resizeMode: 'cover',
        }}
      /> */}
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
          }}
        >
          {tripData?.locationInfo?.name || tripData?.destination}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: '#808080',
            marginTop: 5,
          }}
        >
          {moment(tripData.startDate).format('DD MMM yyyy')}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: '#808080',
            marginTop: 5,
          }}
        >
          Traveling: {tripData.traveler.title}
        </Text>
        <TouchableOpacity 
          style={{
            backgroundColor: 'black',
            padding: 8,
            borderRadius: 7,
            width: 40,
          }}
          onPress={() => router.push({ pathname: '/trip-details', params: { trip: JSON.stringify(trip) } })}
        >
          <Ionicons name="navigate" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}