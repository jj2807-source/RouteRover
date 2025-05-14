import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useContext } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { CreateTripContext } from './../../context/CreateTripContext';
import moment from 'moment';

export default function ReviewTrip() {
  const navigation = useNavigation();
  const { tripData } = useContext(CreateTripContext);
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: ''
    });
  }, []);

  return (
    <View style={{
      padding: 25,
      paddingTop: 75,
      backgroundColor: '#fff',
      height: '100%'
    }}>
      <Text style={{
        fontSize: 35,
        fontWeight: '900',
        marginTop: 20
      }}>Review Your Trip</Text>

      <View style={{
        marginTop: 20
      }}>
        <Text style={{
          fontSize: 20,
          fontWeight: '800'
        }}>Before generating your trip, please review your selection</Text>

        {/* Current Location info */}
        <View style={{
          marginTop: 40,
          display: 'flex',
          flexDirection: 'row',
          gap: 20
        }}>
          <Text style={{
            fontSize: 25
          }}>🚗</Text>
          <View>
            <Text style={{
              fontSize: 20,
              fontWeight: '600',
              color: '#808080'
            }}>Current Location</Text>
            <Text style={{
              fontWeight: '800',
              fontSize: 20
            }}>{tripData?.currentLocation?.name}</Text>
          </View>
        </View>

        {/* Destination info */}
        <View style={{
          marginTop: 25,
          display: 'flex',
          flexDirection: 'row',
          gap: 20
        }}>
          <Text style={{
            fontSize: 25
          }}>📍</Text>
          <View>
            <Text style={{
              fontSize: 20,
              fontWeight: '600',
              color: '#808080'
            }}>Destination</Text>
            <Text style={{
              fontWeight: '800',
              fontSize: 20
            }}>{tripData?.locationInfo?.name}</Text>
          </View>
        </View>

        {/* Date Selected info */}
        <View style={{
          marginTop: 25,
          display: 'flex',
          flexDirection: 'row',
          gap: 20
        }}>
          <Text style={{
            fontSize: 25
          }}>📅</Text>
          <View>
            <Text style={{
              fontSize: 20,
              fontWeight: '600',
              color: '#808080'
            }}>Travel Dates</Text>
            <Text style={{
              fontWeight: '800',
              fontSize: 20
            }}>{moment(tripData?.startDate).format('DD MMM')
              + " To " +
              moment(tripData?.endDate).format('DD MMM') + "  "}
              ({tripData?.totalNoOfDays} days)</Text>
          </View>
        </View>

        {/* Who is traveling */}
        <View style={{
          marginTop: 25,
          display: 'flex',
          flexDirection: 'row',
          gap: 20
        }}>
          <Text style={{
            fontSize: 30
          }}>🚌</Text>
          <View>
            <Text style={{
              fontSize: 20,
              fontWeight: '600',
              color: '#808080'
            }}>Travelers</Text>
            <Text style={{
              fontWeight: '800',
              fontSize: 20
            }}>{tripData?.traveler?.title}</Text>
          </View>
        </View>

        {/* Budget Info */}
        <View style={{
          marginTop: 25,
          display: 'flex',
          flexDirection: 'row',
          gap: 20
        }}>
          <Text style={{
            fontSize: 30
          }}>💰</Text>
          <View>
            <Text style={{
              fontSize: 20,
              fontWeight: '600',
              color: '#808080'
            }}>Budget</Text>
            <Text style={{
              fontWeight: '800',
              fontSize: 20
            }}>{tripData?.budget}</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => router.replace('/create-trip/generate-trip')}
          style={{
            padding: 15,
            backgroundColor: 'black',
            borderRadius: 15,
            marginTop: 80
          }}>
          <Text style={{
            textAlign: 'center',
            color: '#fff',
            fontWeight: '600',
            fontSize: 20
          }}>Build My Trip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}









// import { View, Text,TouchableOpacity} from 'react-native'
// import React,{useEffect} from 'react'
// import {useNavigation,useRouter} from 'expo-router'
// import { Ionicons } from '@expo/vector-icons';    //from expo icons
// import {useContext} from 'react';
// import {CreateTripContext} from './../../context/CreateTripContext'
// import moment from 'moment'



// export default function ReivewTrip() {

//   const navigation=useNavigation();
//   const {tripData,useTripData}=useContext(CreateTripContext)
//   const router=useRouter();

//   useEffect(()=>{
//     navigation.setOptions({
//       headerShown:true,
//       headerTransparent:true,
//       headerTitle:''
//     })
//   },[])

//   return (
//     <View style={{
//       padding:25,
//       paddingTop:75,
//       backgroundColor:'#fff',
//       height:'100%'
//     }}> 
//       <Text style={{
//         fontSize:35,
//         fontWeight:'900',
//         marginTop:20
//       }}>Reivew Your Trip</Text>

//       <View style={{
//         marginTop:20
//       }}>
//         <Text style={{
//           fontSize:20,
//           fontWeight:'800'
//         }}>Before generating your trip,please review your selection</Text>


//        {/* Destination info */}
//        <View style={{
//         marginTop:40,
//         display:'flex',
//         flexDirection:'row',
//         gap:20
//         }}>
//         {/* <Ionicons name="location-sharp" size={34} color="black" /> */}
//         <Text style={{
//           fontSize:25
//         }}>📍</Text>
//         <View>
//           <Text style={{
//             fontSize:20,
//             fontWeight:'600',
//             color:'#808080'
//           }}>Destination</Text>
//           <Text style={{
//             fontWeight:'800',
//             fontSize:20
//           }}>{tripData?.locationInfo?.name}</Text>
//         </View>
//         </View>


//         {/* Date Selected info */}
//        <View style={{
//         marginTop:25,
//         display:'flex',
//         flexDirection:'row',
//         gap:20
//         }}>
//         {/* <Ionicons name="location-sharp" size={34} color="black" /> */}
//         <Text style={{
//           fontSize:25
//         }}>📅</Text>
//         <View>
//           <Text style={{
//             fontSize:20,
//             fontWeight:'600',
//             color:'#808080'
//           }}>Travel Dates</Text>
//           <Text style={{
//             fontWeight:'800',
//             fontSize:20
//           }}>{moment(tripData?.startDate).format('DD MMM')
//           +" To "+
//           moment(tripData?.endDate).format('DD MMM')+"  "}
//           ({tripData?.totalNoOfDays} days)</Text>
//         </View>
//         </View>


//         {/* Who is traveling*/}
//        <View style={{
//         marginTop:25,
//         display:'flex',
//         flexDirection:'row',
//         gap:20
//         }}>
//         <Text style={{
//           fontSize:30
//         }}>🚌</Text>
//         <View>
//           <Text style={{
//             fontSize:20,
//             fontWeight:'600',
//             color:'#808080'
//           }}>Travelers</Text>
//           <Text style={{
//             fontWeight:'800',
//             fontSize:20
//           }}>{tripData?.traveler?.title}</Text>
//         </View>
//         </View>


//          {/* Budget Info*/}
//        <View style={{
//         marginTop:25,
//         display:'flex',
//         flexDirection:'row',
//         gap:20
//         }}>
//         <Text style={{
//           fontSize:30
//         }}>💰</Text>
//         <View>
//           <Text style={{
//             fontSize:20,
//             fontWeight:'600',
//             color:'#808080'
//           }}>Budget</Text>
//           <Text style={{
//             fontWeight:'800',
//             fontSize:20
//           }}>{tripData?.budget}</Text>
//         </View>
//         </View>

//         <TouchableOpacity 
//         onPress={()=>router.replace('/create-trip/generate-trip')}
//         style={{
//             padding:15,
//             backgroundColor:'black',
//             borderRadius:15,
//             marginTop:80
//         }}>
//           <Text style={{
//                textAlign:'center',
//                color:'#fff',
//                fontWeight:'600',
//                fontSize:20
//           }}> Build My Trip </Text> 

//         </TouchableOpacity>

//       </View>
//     </View>
//   )
// }