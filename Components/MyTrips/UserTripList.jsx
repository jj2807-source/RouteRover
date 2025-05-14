import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import moment from 'moment';
import UserTripCard from './UserTripCard';
import { useRouter } from 'expo-router';

export default function UserTripList({ userTrips }) {
  const LatestTrip = JSON.parse(userTrips[userTrips.length - 1].tripData);
  const router = useRouter();

  return userTrips && (
    <View>
      <View style={{ marginTop: 10 }}>
        {LatestTrip?.locationInfo?.photoRef?<Image source={{uri:'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference='+LatestTrip?.locationInfo?.photoRef+'&key='+process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}}
        style={{
          width: '100%',
          height: 260,
          objectFit: 'cover',
          borderRadius: 15
        }}
        />
        :
        <Image
          source={require('./../../assets/images/travelearth1.webp')}
          style={{
            width: '100%',
            height: 260,
            objectFit: 'cover',
            borderRadius: 15
          }}
        />}

        {/* Location Name */}
        <Text style={{
          fontSize: 24,
          fontWeight: '900',
          marginTop: 4,
          marginBottom: 0, // ✅ Remove bottom margin
          paddingBottom: 0, // ✅ Just in case
        }}>
          {LatestTrip?.locationInfo?.name || LatestTrip?.destination}
        </Text>

        {/* Destination */}
        <Text style={{
          fontSize: 20,
          fontWeight: '600',
          marginTop: -2, // ✅ Pull this closer to previous text
          marginBottom: 0,
          paddingBottom: 0,
        }}>
          {LatestTrip.destination}
        </Text>

        {/* Dates + Traveler */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: -4, // ✅ Pull this even closer
        }}>
          <Text style={{ fontSize: 17 }}>
            {moment(LatestTrip.startDate).format('DD MMM yyyy')}
          </Text>
          <Text style={{ fontSize: 17 }}>
            🚌 {LatestTrip.traveler.title}
          </Text>
        </View>

        {/* Continue Button */}
        <TouchableOpacity 
          onPress={() => router.push({ pathname: '/trip-details', params: { trip: JSON.stringify(userTrips[userTrips.length - 1]) } })}
          style={{
            padding: 15,
            backgroundColor: 'black',
            borderRadius: 15,
            marginTop: 20
          }}
        >
          <Text style={{
            textAlign: 'center',
            color: '#fff',
            fontWeight: '600',
            fontSize: 20
          }}> 
            See your plan 
          </Text>
        </TouchableOpacity>

        {/* User Trip Cards */}
        {userTrips.map((trip,index) => (
       <UserTripCard trip={trip} key={index} />
       ))}
      </View>
    </View>
  );
}
