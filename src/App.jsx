import React, { useState, useCallback } from 'react';
import Desktop from './components/Desktop';
// import ScreensaverManager from './components/ScreensaverManager';
import './App.css';
import './css/base.css';
import './css/Desktop.css';

function App() {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreenChange = useCallback((isFullScreenActive) => {
    setIsFullScreen(isFullScreenActive);
  }, []);

  return (
    <div className={`App ${isFullScreen ? 'fullscreen' : ''}`}>
      <Desktop onFullScreenChange={handleFullScreenChange} />
      {/* <ScreensaverManager /> */}
    </div>
  );
}

export default App;