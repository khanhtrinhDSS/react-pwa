import React, { useState, useEffect } from 'react';
import './App.css';
import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from './firebase';

function App() {

  const [text, setText] = useState();
  const params = new URLSearchParams(window.location.search);

  const handleRequest = async () => {
    const permission = await Notification.requestPermission();
    console.log('Notification permission: ', permission);
      const token = await getToken(messaging, {
        vapidKey: "BKze_yuNslV43g44e585Cg2Xr58iuPA-3Su3VVYPKYKtA0eDFSWFgSER7VAqpCHG48-l0yeY3EjjLZ978KuZM5E"
      })
      setText(token);
  }

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register(`/firebase-messaging-sw.js`);
      });
    }
  }, []);
  console.log(messaging)
  useEffect(() => {
    const setupListener = async () => {
      console.log(messaging)
      if (!messaging) return;

      const unsubscribe = onMessage(messaging, (payload) => {
        if (Notification.permission !== "granted") return;
        const title = payload?.data?.title ?? "";
        const notification = {
          body: 'onMessage',
          data: { link: 'https://fb.com' },
        };
        navigator.serviceWorker.ready.then(function (registration) {
          console.log('Notification serviceworker-registration', registration)
          registration?.showNotification(title, notification);
        });
      });
      return unsubscribe;
    };
    let unsubscribe = null;
    setupListener();
    return () => unsubscribe?.();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleRequest} >Request</button>
        <div className="text-container">
        <p style={{padding: "12px"}}>{text}</p>
        </div>
        <p>{params.get('check')}</p>
      </header>
    </div>
  );
}

export default App;
