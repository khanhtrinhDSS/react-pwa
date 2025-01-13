// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig ={
  apiKey: "AIzaSyB5wkfGlpl-wB3CcgMZoZp32u-6bhmhLEA",
  authDomain: "pwa-183c4.firebaseapp.com",
  projectId: "pwa-183c4",
  storageBucket: "pwa-183c4.firebasestorage.app",
  messagingSenderId: "540690673321",
  appId: "1:540690673321:web:949d78455c41b7feccc3b8",
  measurementId: "G-T0RG7MWDKB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);