import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJcJS-EaA1gyVd5TdMZ6kbB45_FN1PFkg",
  authDomain: "nexus-c6655.firebaseapp.com",
  projectId: "nexus-c6655",
  storageBucket: "nexus-c6655.appspot.com",
  messagingSenderId: "738781615552",
  appId: "1:738781615552:web:4d577e9b69b92a799a2425"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);