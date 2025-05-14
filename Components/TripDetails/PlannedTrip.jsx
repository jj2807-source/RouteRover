import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { GetPhotoRef } from '../../services/GooglePlaceApi';

export default function PlannedTrip({ details }) {
  const [photoRefs, setPhotoRefs] = useState({});

  useEffect(() => {
    const fetchPhotos = async () => {
      const refs = {};

      for (const [_, dayDetails] of Object.entries(details)) {
        // For planned places
        if (Array.isArray(dayDetails.places)) {
          for (const place of dayDetails.places) {
            if (place?.name && !refs[place.name]) {
              const ref = await GetPhotoRef(place.name);
              refs[place.name] = ref;
            }
          }
        }

        // For hotel photo
        if (dayDetails.hotel?.name && !refs[dayDetails.hotel.name]) {
          const ref = await GetPhotoRef(dayDetails.hotel.name);
          refs[dayDetails.hotel.name] = ref;
        }

        // For keyword images if no places
        if ((!dayDetails.places || dayDetails.places.length === 0) && dayDetails.description) {
          const keywords = extractKeywords(dayDetails.description);
          for (const word of keywords) {
            if (!refs[word]) {
              const ref = await GetPhotoRef(word);
              refs[word] = ref;
            }
          }
        }
      }

      setPhotoRefs(refs);
    };

    fetchPhotos();
  }, [details]);

  const extractKeywords = (text) => {
    return [...new Set(
      text
        .split(/\s+/)
        .map(w => w.replace(/[^a-zA-Z]/g, ''))
        .filter(w => w.length > 4 || w[0] === w[0]?.toUpperCase())
        .slice(0, 3)
    )];
  };

  const openInMaps = (place) => {
    if (place?.location?.lat && place?.location?.lng) {
      const { lat, lng } = place.location;
      const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
      Linking.openURL(url);
    } else if (place?.name) {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name)}`;
      Linking.openURL(url);
    }
  };

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: '900' }}>📝 Plan Details</Text>

      {Object.entries(details).map(([day, dayDetails], index) => (
        <View key={day}>
          <Text style={{ fontSize: 17, fontWeight: '600', marginTop: 20, marginBottom: 10 }}>
            Day {index + 1}
          </Text>

          {dayDetails.description ? (
            <Text style={{ fontSize: 15, color: 'gray', marginBottom: 10 }}>
              {dayDetails.description}
            </Text>
          ) : null}

          {/* Hotel Section */}
          {dayDetails.hotel?.name && (
            <View
              style={{
                backgroundColor: '#f0f8ff',
                padding: 10,
                borderRadius: 15,
                borderWidth: 1,
                borderColor: '#ccc',
                marginBottom: 10,
              }}
            >
              {photoRefs[dayDetails.hotel.name] ? (
                <Image
                  source={{
                    uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRefs[dayDetails.hotel.name]}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
                  }}
                  style={{ width: '100%', height: 180, borderRadius: 15 }}
                />
              ) : (
                <View
                  style={{
                    width: '100%',
                    height: 180,
                    borderRadius: 15,
                    backgroundColor: '#ddd',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text>Hotel Image Not Available</Text>
                </View>
              )}

              <View style={{ marginTop: 8, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                  <Text style={{ fontWeight: '900', fontSize: 16 }}>
                    🏨 {dayDetails.hotel.name}
                  </Text>
                  <Text style={{ fontSize: 14, color: 'gray' }}>
                    {dayDetails.hotel.details}
                  </Text>
                </View>

                <TouchableOpacity
                  style={{
                    backgroundColor: '#4285F4',
                    padding: 8,
                    borderRadius: 7,
                    alignSelf: 'flex-start',
                  }}
                  onPress={() => openInMaps(dayDetails.hotel)}
                >
                  <Ionicons name="map" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Places Section */}
          {dayDetails.places && dayDetails.places.length > 0 ? (
            dayDetails.places.map((place, idx) => (
              <View
                key={`${place.name}-${idx}`}
                style={{
                  backgroundColor: '#f2f2fe',
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 15,
                  borderColor: 'gray',
                  marginTop: 20,
                }}
              >
                {photoRefs[place.name] ? (
                  <Image
                    source={{
                      uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRefs[place.name]}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
                    }}
                    style={{ width: '100%', height: 200, borderRadius: 15 }}
                  />
                ) : (
                  <View
                    style={{
                      width: '100%',
                      height: 200,
                      backgroundColor: '#ccc',
                      borderRadius: 15,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text>Image Not Available</Text>
                  </View>
                )}

                <View style={{ marginTop: 5 }}>
                  <Text style={{ fontSize: 17, fontWeight: '900', marginBottom: 5 }}>
                    {place?.name}
                  </Text>
                  <Text style={{ fontSize: 16, color: 'gray' }}>{place?.details}</Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <View>
                      <Text style={{ fontSize: 14, marginTop: 5, fontWeight: '500' }}>
                        🎫 Ticket Price:{' '}
                        <Text style={{ fontWeight: '900' }}>{place?.ticketPricing}</Text>
                      </Text>
                      <Text style={{ fontSize: 14, marginTop: 5 }}>
                        🕒 Time to Visit: {place?.timeToVisit}
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={{
                        backgroundColor: '#4285F4',
                        padding: 8,
                        borderRadius: 7,
                      }}
                      onPress={() => openInMaps(place)}
                    >
                      <Ionicons name="map" size={20} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <>
              <Text
                style={{
                  color: 'gray',
                  fontStyle: 'italic',
                  marginTop: 10,
                  marginBottom: 10,
                }}
              >
                No places planned for this day.
              </Text>

              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                {extractKeywords(dayDetails.description || '').map((word) => (
                  <View key={word} style={{ width: '48%', marginTop: 10 }}>
                    {photoRefs[word] ? (
                      <Image
                        source={{
                          uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRefs[word]}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
                        }}
                        style={{
                          width: '100%',
                          height: 120,
                          borderRadius: 10,
                        }}
                      />
                    ) : (
                      <View
                        style={{
                          width: '100%',
                          height: 120,
                          borderRadius: 10,
                          backgroundColor: '#eee',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Text>{word}</Text>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            </>
          )}
        </View>
      ))}
    </View>
  );
}
