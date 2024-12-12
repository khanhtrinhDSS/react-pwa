/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
// Import the firebase app / messaging packages
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js')


const app = firebase.initializeApp({
  apiKey: "AIzaSyAOZ9P6Vkp43aZv-FPP7BRZ2XQ2qhmZt1I",
  authDomain: "react-pwa-54922.firebaseapp.com",
  projectId: "react-pwa-54922",
  storageBucket: "react-pwa-54922.firebasestorage.app",
  messagingSenderId: "943712142983",
  appId: "1:943712142983:web:ddcf30e0922854eb579a22",
  measurementId: "G-JVNMR0B0VE"
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage(payload => {
  console.log("Received a bg message: ", payload);


  const title = payload.notification.title
  const notification = {
    body: "Notification Body",
  }

  self.registration.showNotification(title, notification);
})


self.addEventListener("notificationclick", (event) => {
  console.log("Notification clicked:", event.notification);
  event.notification.close(); // Đóng thông báo

  // Mở hoặc chuyển đến một trang
  event.waitUntil(
    clients.openWindow(`/?check=${event.notification.title}`)
  );
});

