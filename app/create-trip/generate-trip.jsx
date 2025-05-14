/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

import { View, Text,Image } from 'react-native'
import React, { useContext,useEffect,useState } from 'react'
import {CreateTripContext} from '../../context/CreateTripContext'
import { AI_PROMPT } from '../../constants/Options';
import {chatSession} from '../../configs/AiModal';
import {useNavigation,useRouter} from 'expo-router'
import {doc, setDoc} from 'firebase/firestore'
import {auth,db} from './../../configs/FirebaseConfig'



 export default function GenerateTrip() {

 const {tripData,setTripData}=useContext(CreateTripContext);
 const [loading,setLoading]=useState(false);
 const router=useRouter();
 const user=auth.currentUser;

  useEffect(()=>{
    tripData&&GenerateAiTrip()

  },[])

  const GenerateAiTrip=async()=>{
    setLoading(true);
    const FINAL_PROMPT=AI_PROMPT.replace('{destination}', tripData?.locationInfo?.name)
    .replace('{currentLocation}', tripData?.currentLocation?.name)
    .replace('{totalDays}',tripData?.totalNoOfDays)
    .replace('{totalNights}',tripData.totalNoOfDays-1)
    .replace('{traveler}',tripData.traveler?.title)
    .replace('{budget}',tripData.budget)
    .replace('{totalDays}',tripData?.totalNoOfDays)
    .replace('{totalNights}',tripData.totalNoOfDays-1)

    console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result.response.text());
    const tripResp=JSON.parse(result.response.text())

    setLoading(false);
    const docId=(Date.now()).toString();

    const result_= await setDoc(doc(db,"UserTrips",docId),{
      userEmail:user.email,
      tripPlan:tripResp, //AI result
      tripData:JSON.stringify(tripData), //user selection data
      docId:docId
    })
    
    router.push('(tabs)/mytrip');
 }

return (

    <View style={{
      padding:25,
      paddingTop:75,
      backgroundColor:'#fff',
      height:'100%'
    }}>
      <Text style={{
        fontSize:35,
        textAlign:'center',
        fontWeight:'900'
      }}>Please Wait...</Text>

      <Text style={{
        fontSize:20,
        textAlign:'center',
        fontWeight:'600',
        marginTop:40
      }}>We are working to generate your dream trip</Text>
      
      <Image source={require('./../../assets/images/plane3.gif')} 
      style={{
        width:'100%',
        alignItems:'center',
        height:200,
        objectFit:'contain',
         marginTop:30
      }}/>

      <Text style={{
        fontSize:16,
        color:'#808080',
        textAlign:'center'
      }}> 
      Do Not GO Back
      </Text>

   </View>
  )
 }