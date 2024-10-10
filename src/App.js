import React, { useCallback, useEffect, useState } from 'react';
import PWAPrompt from 'react-ios-pwa-prompt'
import logo from './logo.svg';
import './App.css';

function App() {

  const [installPrompt, setInstallPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    setInstallPrompt(event);
  });

  const handleInstall = async () => {
    if (!installPrompt) {
      return;
    }
    const result = await installPrompt.prompt();
    console.log(`Install prompt was: ${result.outcome}`);
    installPrompt = null;
  }

  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to rqwkmdkas
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn heheh
        </a>
        <button id="install" onClick={handleInstall} >Install</button>
      </header>
    </div>
  );
}

export default App;
