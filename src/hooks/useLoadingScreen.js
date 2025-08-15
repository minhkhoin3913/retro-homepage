// src/hooks/useLoadingScreen.js
import { useState, useEffect, useRef, useCallback } from 'react';

export const useLoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDelaying, setIsDelaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuBarVisible, setMenuBarVisible] = useState(false);
  const audioRef = useRef(null);
  const intervalRef = useRef(null);
  const bootSequenceTimerRef = useRef(null);

  // Skip loading function
  const skipLoading = useCallback(() => {
    // Clear all timers
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (bootSequenceTimerRef.current) {
      clearTimeout(bootSequenceTimerRef.current);
      bootSequenceTimerRef.current = null;
    }
    
    // Immediately show desktop
    setIsLoading(false);
    setIsDelaying(false);
    setMenuBarVisible(true);
    
    // Play startup sound
    playStartupSound();
  }, []);

  // Improved startup sound function with path handling for different environments
  const playStartupSound = async () => {
    // Prevent duplicate sound playing
    if (audioRef.current) {
      console.log('Sound already playing, not playing again');
      return;
    }
    
    // Get base URL for assets - handles both localhost and GitHub Pages
    const baseUrl = import.meta.env.BASE_URL || '/';
    
    // Create array of possible sound paths with different formats and paths
    const audioSources = [
      `${baseUrl}sounds/logon.mp3`,
      `/sounds/logon.mp3`,
      `./sounds/logon.mp3`,
      `../public/sounds/logon.mp3`,
    ];

    // Create and configure audio element
    audioRef.current = new Audio();
    audioRef.current.volume = 0.7;
    
    // Try each source until one works
    for (const source of audioSources) {
      try {
        console.log(`Attempting to play audio from: ${source}`);
        audioRef.current.src = source;
        
        // Use a promise to handle the audio loading
        await new Promise((resolve, reject) => {
          audioRef.current.oncanplaythrough = resolve;
          audioRef.current.onerror = reject;
          audioRef.current.load();
        });
        
        // Play the audio with user interaction handling
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          await playPromise;
          console.log(`Startup sound played successfully from: ${source}`);
          
          // Add an event listener to clear the audio reference when playback ends
          audioRef.current.onended = () => {
            console.log('Sound playback ended, clearing audio reference');
            audioRef.current = null;
          };
          
          return; // Exit if successful
        }
      } catch (error) {
        console.warn(`Failed to play audio from ${source}:`, error);
        // Continue to next source
      }
    }
    
    console.error("All audio sources failed to play");
    audioRef.current = null; // Clear reference if all sources failed
  };

  // Loading screen and startup sound effect
  useEffect(() => {
    // Boot sequence takes about 7 seconds, so delay the progress bar start
    const bootSequenceDelay = 10000; // Increased to account for the boot sequence + black screen
    
    // Start the progress bar after the boot sequence
    bootSequenceTimerRef.current = setTimeout(() => {
      // Define target duration for loading (5-7 seconds)
      const targetDuration = Math.floor(Math.random() * 2000) + 5000; // 5000-7000ms
      let soundPlayed = false;
      let lastProgress = 0;
      let startTime = Date.now();

      // Create inconsistent progress updates
      intervalRef.current = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const elapsedPercentage = Math.min(100, (elapsedTime / targetDuration) * 100);
        
        // Create inconsistent jumps in progress
        const randomJump = Math.random();
        let newProgress;
        
        if (randomJump < 0.7) {
          // 70% chance: small increment (0-3%)
          newProgress = lastProgress + Math.random() * 3;
        } else if (randomJump < 0.9) {
          // 20% chance: medium increment (3-8%)
          newProgress = lastProgress + 3 + Math.random() * 5;
        } else {
          // 10% chance: large increment (8-15%)
          newProgress = lastProgress + 8 + Math.random() * 7;
        }
        
        // Ensure progress doesn't exceed what it should be based on elapsed time
        newProgress = Math.min(newProgress, elapsedPercentage);
        
        // Occasionally stall (no progress)
        if (Math.random() < 0.15 && newProgress < 90) {
          newProgress = lastProgress;
        }
        
        // Cap at 100%
        newProgress = Math.min(100, newProgress);
        lastProgress = newProgress;
        
        setProgress(newProgress);
        
        // Check if loading is complete
        if (newProgress >= 100) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          // Start the delay phase after loading completes
          setTimeout(() => {
            setIsLoading(false);
            setIsDelaying(true);
            
            // Play sound when loading completes (only if not already played)
            if (!soundPlayed) {
              playStartupSound();
              soundPlayed = true;
            }
            
            // After 2 seconds delay, show desktop
            setTimeout(() => {
              setIsDelaying(false);
              
              // Add a delay before showing the menu bar
              setTimeout(() => {
                setMenuBarVisible(true);
              }); 
            }, 2000);
          }, 500);
        }
      }, 100); // Update every 100ms for smoother animation
    }, bootSequenceDelay);

    // Effect for loading cursor
    if (isDelaying) {
      document.body.classList.add('loading');
    } else {
      document.body.classList.remove('loading');
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (bootSequenceTimerRef.current) {
        clearTimeout(bootSequenceTimerRef.current);
        bootSequenceTimerRef.current = null;
      }
      if (audioRef.current) {
        // Remove any event listeners
        audioRef.current.onended = null;
        audioRef.current.oncanplaythrough = null;
        audioRef.current.onerror = null;
        
        // Pause and release the audio
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
      
      // Ensure loading class is removed
      document.body.classList.remove('loading');
    };
  }, []);

  return {
    isLoading,
    isDelaying,
    progress,
    menuBarVisible,
    skipLoading
  };
}; 