// src/hooks/useShutdown.js
import { useState, useCallback } from 'react';

export const useShutdown = () => {
  const [isShuttingDown, setIsShuttingDown] = useState(false);
  const [shutdownStage, setShutdownStage] = useState(0); // 0: normal, 1: desktop disappearing, 2: shutdown screen

  // Shutdown sound function
  const playShutdownSound = async () => {
    // Get base URL for assets - handles both localhost and GitHub Pages
    const baseUrl = import.meta.env.BASE_URL || '/';
    
    // Create array of possible sound paths with different formats and paths
    const audioSources = [
      `${baseUrl}sounds/LOGOFF.flac`,
      `/sounds/LOGOFF.flac`,
      `./sounds/LOGOFF.flac`,
      `../public/sounds/LOGOFF.flac`,
    ];

    // Create and configure audio element
    const audio = new Audio();
    audio.volume = 0.7;
    
    // Try each source until one works
    for (const source of audioSources) {
      try {
        console.log(`Attempting to play shutdown audio from: ${source}`);
        audio.src = source;
        
        // Use a promise to handle the audio loading
        await new Promise((resolve, reject) => {
          audio.oncanplaythrough = resolve;
          audio.onerror = reject;
          audio.load();
        });
        
        // Play the audio with user interaction handling
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          await playPromise;
          console.log(`Shutdown sound played successfully from: ${source}`);
          return; // Exit if successful
        }
      } catch (error) {
        console.warn(`Failed to play shutdown audio from ${source}:`, error);
        // Continue to next source
      }
    }
    
    console.error("All shutdown audio sources failed to play");
  };

  // Start shutdown sequence
  const startShutdown = useCallback(() => {
    setIsShuttingDown(true);
    
    // Play shutdown sound
    playShutdownSound();
    
    // Start shutdown sequence with delays
    setTimeout(() => {
      // After 3 seconds, start desktop disappearing effect
      setShutdownStage(1);
    }, 3000);
    
    setTimeout(() => {
      // After 6 seconds, show shutdown screen
      setShutdownStage(2);
    }, 6000);
  }, []);

  return {
    isShuttingDown,
    shutdownStage,
    startShutdown
  };
}; 