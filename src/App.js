import React, { useState } from 'react';
import './App.css';
import { getToken } from 'firebase/messaging';
import { messaging } from './firebase';

function App() {

  const [text, setText] = useState();


  const handleRequest = async () => {
    const permission = await Notification.requestPermission();
    console.log('mesaging: ', messaging);
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "BH6KL1kaSE6gVfIjv5LFK-rQsUdLuDwp7cF3bgKefw6oKFe0aF19igZxvl4b_N2F8afpqTghrgHYlQ_MgxJ-D7c"
      })
      setText(token);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleRequest} >Request</button>
        <p>{text}</p>
      </header>
    </div>
  );
}

export default App;
