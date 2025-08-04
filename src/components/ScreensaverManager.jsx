import React, { useState, useEffect, useCallback, useRef } from "react";
import PipesScreensaver from "./PipesScreensaver";
import "../css/ScreensaverManager.css";

const ScreensaverManager = () => {
  const [isActive, setIsActive] = useState(false);
  const inactivityTimerRef = useRef(null);
  const isActiveRef = useRef(false);

  const INACTIVITY_DELAY = 5000; // 5 seconds for testing (change back to 30000 for production)

  // Update ref when state changes
  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    
    inactivityTimerRef.current = setTimeout(() => {
      console.log('Screensaver activating...');
      setIsActive(true);
    }, INACTIVITY_DELAY);
  }, []);

  const handleUserActivity = useCallback(() => {
    if (isActiveRef.current) {
      console.log('Screensaver deactivating...');
      setIsActive(false);
    }
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  useEffect(() => {
    // Start the initial inactivity timer
    resetInactivityTimer();

    // Add event listeners for user activity
    const events = ['mousedown', 'mousemove', 'keydown', 'keypress', 'touchstart', 'touchmove', 'scroll', 'wheel'];
    
    events.forEach(event => {
      document.addEventListener(event, handleUserActivity, { passive: true });
    });

    // Cleanup function
    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
      
      events.forEach(event => {
        document.removeEventListener(event, handleUserActivity);
      });
    };
  }, [handleUserActivity, resetInactivityTimer]);

  return (
    <>
      {isActive && (
        <div className="screensaver-overlay">
          <div style={{ color: 'white', position: 'absolute', top: '10px', left: '10px', zIndex: 10001 }}>
            Screensaver Active - {new Date().toLocaleTimeString()}
          </div>
          <PipesScreensaver />
        </div>
      )}
      {/* Debug indicator - remove in production */}
      <div style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        background: isActive ? '#ff0000' : '#00ff00',
        color: 'white',
        padding: '5px',
        borderRadius: '3px',
        fontSize: '12px',
        zIndex: 10000,
        pointerEvents: 'none'
      }}>
        Screensaver: {isActive ? 'ACTIVE' : 'INACTIVE'} - {new Date().toLocaleTimeString()}
      </div>
    </>
  );
};

export default ScreensaverManager; 