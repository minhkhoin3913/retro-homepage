import { useState, useCallback } from 'react';
import { desktopItems } from "../config/programConfig";

export const useWindowManager = () => {
  const [minimizedWindows, setMinimizedWindows] = useState([]);
  const [loadingWindows, setLoadingWindows] = useState(new Set());
  
  // Sound effects for window operations
  const playWindowSound = useCallback(async (soundType) => {
    const baseUrl = import.meta.env.BASE_URL || '/';
    const audioSources = [
      `${baseUrl}sounds/${soundType}.mp3`,
      `/sounds/${soundType}.mp3`,
      `./sounds/${soundType}.mp3`,
      `${baseUrl}sounds/maximize.mp3`, // Fallback to maximize sound
    ];

    const audio = new Audio();
    audio.volume = 0.7;
    
    for (const source of audioSources) {
      try {
        console.log(`Attempting to play ${soundType} audio from: ${source}`);
        audio.src = source;
        
        await new Promise((resolve, reject) => {
          audio.oncanplaythrough = resolve;
          audio.onerror = reject;
          audio.load();
        });
        
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          await playPromise;
          console.log(`${soundType} sound played successfully from: ${source}`);
          return;
        }
      } catch (error) {
        console.warn(`Failed to play ${soundType} audio from ${source}:`, error);
      }
    }
    
    console.error(`All ${soundType} audio sources failed to play`);
  }, []);
  
  // Handle window operations
  const handleItemDoubleClick = useCallback((id, label, openWindows, openWindow, focusWindow) => {
    const item = desktopItems.find(item => item.id === id) || 
                 desktopItems
                   .flatMap(folder => folder.contents || [])
                   .find(item => item.id === id);
    
    if (!item) {
      console.warn(`Item with id ${id} not found`);
      return;
    }

    // Check if item has a link property
    if (item.link) {
      window.open(item.link, "_blank", "noopener,noreferrer");
      // Play a sound for opening a link
      playWindowSound('open');
      return;
    }

    const isMaximizable = item.isMaximizable ?? true;
    const iconSrc = item.iconSrc;

    const isWindowOpen = openWindows.some(win => win.id === id);
    const isWindowMinimized = minimizedWindows.some(win => win.id === id);

    if (isWindowOpen) {
      if (isWindowMinimized) {
        // Restore window
        setMinimizedWindows(prev => prev.filter(w => w.id !== id));
        setTimeout(() => focusWindow(id), 10);
        // Play maximize sound
        playWindowSound('maximize');
      } else {
        // Just focus the window
        focusWindow(id);
      }
      return;
    }

    // Add window to loading state
    setLoadingWindows(prev => new Set(prev).add(id));

    // Remove from loading state after 2 seconds
    setTimeout(() => {
      setLoadingWindows(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }, 2000);

    if (item.type === "folder") {
      openWindow(id, label, "folder", id, isMaximizable, iconSrc);
    } else {
      openWindow(id, label, "program", undefined, isMaximizable, iconSrc);
    }
  }, [minimizedWindows, playWindowSound]);

  const handleMinimizeWindow = useCallback(async (windowId, windowData) => {
    const item = desktopItems.find(item => item.id === windowId) || 
                 desktopItems
                   .flatMap(folder => folder.contents || [])
                   .find(item => item.id === windowId);
    
    const iconSrc = item?.iconSrc;

    setMinimizedWindows(prev => {
      if (prev.find(w => w.id === windowId)) return prev;
      return [...prev, {
        id: windowId,
        title: windowData.title,
        icon: iconSrc,
      }];
    });

    // Play minimize sound
    await playWindowSound('minimize');
  }, [playWindowSound]);

  const handleRestoreWindow = useCallback(async (windowId, focusWindow) => {
    setMinimizedWindows(prev => prev.filter(w => w.id !== windowId));
    setTimeout(() => focusWindow(windowId), 10);
    
    // Play maximize sound
    await playWindowSound('maximize');
  }, [playWindowSound]);

  const handleCloseWindow = useCallback((windowId, closeWindow) => {
    closeWindow(windowId);
    setMinimizedWindows(prev => prev.filter(w => w.id !== windowId));
  }, []);

  return {
    minimizedWindows,
    loadingWindows,
    handleItemDoubleClick,
    handleMinimizeWindow,
    handleRestoreWindow,
    handleCloseWindow
  };
};