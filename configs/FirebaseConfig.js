import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_VplKYEzSNGUDtKlGzscPiuHZem6Ke7E",
  authDomain: "routerover-ab969.firebaseapp.com",
  projectId: "routerover-ab969",
  storageBucket: "routerover-ab969.firebasestorage.app",
  messagingSenderId: "847619490637",
  appId: "1:847619490637:web:d55a54414e517cd50bed04",
  measurementId: "G-GTB0L87KES"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const db = getFirestore(app);
