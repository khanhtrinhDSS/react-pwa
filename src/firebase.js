// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOZ9P6Vkp43aZv-FPP7BRZ2XQ2qhmZt1I",
  authDomain: "react-pwa-54922.firebaseapp.com",
  projectId: "react-pwa-54922",
  storageBucket: "react-pwa-54922.firebasestorage.app",
  messagingSenderId: "943712142983",
  appId: "1:943712142983:web:ddcf30e0922854eb579a22",
  measurementId: "G-JVNMR0B0VE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);