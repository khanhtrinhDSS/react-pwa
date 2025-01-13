/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
// Import the firebase app / messaging packages
self.addEventListener("notificationclick", (event) => {
  console.log("haln-Notification clicked:", event.notification);
  event.notification.close();
  const url = "https://firebase.google.com/support/faq#fcm-depr-service";
  event.waitUntil(clients.openWindow(url))
});

importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js')


firebase.initializeApp({
  apiKey: "AIzaSyB5wkfGlpl-wB3CcgMZoZp32u-6bhmhLEA",
  authDomain: "pwa-183c4.firebaseapp.com",
  projectId: "pwa-183c4",
  storageBucket: "pwa-183c4.firebasestorage.app",
  messagingSenderId: "540690673321",
  appId: "1:540690673321:web:949d78455c41b7feccc3b8",
  measurementId: "G-T0RG7MWDKB"
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage(payload => {
  console.log("Received a bg message: ", payload);
  const title = payload.data.title || 'onBackgroundMessageTitle'
  const notification = {
    body: "onBackgroundMessage",
  }

  self.registration.showNotification(title, notification);
})