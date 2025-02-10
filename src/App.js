import React, { useState, useEffect } from 'react';
import './App.css';
import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from './firebase';

function App() {

  const [text, setText] = useState();
  const [permission, setPermission] = useState(Notification.permission);
  const params = new URLSearchParams(window.location.search);

  const handleRequest = async () => {
    const currentPermission = await Notification.requestPermission();
    setPermission(Notification.permission);
    console.log('Notification permission: ', currentPermission);
      const token = await getToken(messaging, {
        vapidKey: "BKze_yuNslV43g44e585Cg2Xr58iuPA-3Su3VVYPKYKtA0eDFSWFgSER7VAqpCHG48-l0yeY3EjjLZ978KuZM5E"
      })
      setText(token);
  }

  useEffect(() => {
    const checkPermissionChange = async () => {
      console.log('haln-check-permission-change', Notification.permission)
      setTimeout(() => handleRequest(), 3000)
    };
    window.addEventListener("focus", checkPermissionChange);
    window.addEventListener("pageshow", checkPermissionChange);
    document.addEventListener("visibilitychange", checkPermissionChange);
    return () => {
      window.removeEventListener("focus", checkPermissionChange);
      window.removeEventListener("pageshow", checkPermissionChange);
      document.removeEventListener("visibilitychange", checkPermissionChange);
    };
  },[]);

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
        <p style={{padding: "12px"}}>{permission}</p>
        <p>{params.get('check')}</p>
      </header>
    </div>
  );
}

export default App;
