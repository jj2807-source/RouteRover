import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { GetPhotoRef } from '../../services/GooglePlaceApi';

export default function HotelCard({ item }) {
  const [photoRef, setPhotoRef] = useState(null);

  useEffect(() => {
    GetGooglePhotoRef();
  }, []);

  const GetGooglePhotoRef = async () => {
    const result = await GetPhotoRef(item.hotelName || item.name);
    setPhotoRef(result);
  };

  return (
    <View style={{ marginRight: 15, width: 180 }}>
      {photoRef ? (
        <Image
          source={{
            uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
          }}
          style={{
            width: 180,
            height: 120,
            borderRadius: 15,
          }}
        />
      ) : (
        <View
          style={{
            width: 180,
            height: 120,
            borderRadius: 15,
            backgroundColor: '#ccc',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>Image Not Available</Text>
        </View>
      )}

      <View style={{ padding: 5 }}>
        <Text style={{ fontSize: 13, fontWeight: '500' }}>{item.name}</Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text>⭐ {item.rating}</Text>
          <Text>💰 {item.price}</Text>
        </View>
      </View>
    </View>
  );
}
