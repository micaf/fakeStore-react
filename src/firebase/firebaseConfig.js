// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
// Required for side-effects
import "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAI01RjuCgrDw0Vs2kTZBrRz44opva1eTg",
  authDomain: "ecommerce-fakestore.firebaseapp.com",
  projectId: "ecommerce-fakestore",
  storageBucket: "ecommerce-fakestore.appspot.com",
  messagingSenderId: "120523401369",
  appId: "1:120523401369:web:e49314d338a41fc4fa7008"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);