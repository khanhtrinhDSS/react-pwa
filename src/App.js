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

  console.log(messaging)
  useEffect(() => {
    const setupListener = async () => {
      console.log('haln-12-messaging',messaging)
      if (!messaging) return;

      const unsubscribe = onMessage(messaging, (payload) => {
        console.log('haln-12-payload',Notification.permission, payload)
        if (Notification.permission !== "granted") return;
        const title = payload?.data?.title ?? "onMessageTitle";
        const notification = {
          body: 'onMessage',
          data: { link: 'https://fb.com' },
        };
        console.log('haln-12-notification', notification)
        navigator.serviceWorker.ready.then(function (registration) {
        console.log('haln-12-registration', registration)
        setTimeout(() => {
          registration?.showNotification(title, notification)}, 100)
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
