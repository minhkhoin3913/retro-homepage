import { useState, useCallback, useMemo } from 'react';

export const useWindow = () => {
  const [openWindows, setOpenWindows] = useState([]);
  const [focusedWindow, setFocusedWindow] = useState(null);
  const [nextZIndex, setNextZIndex] = useState(1000);

  // Memoize window operations for better performance
  const openWindow = useCallback((windowData) => {
    setOpenWindows(prev => {
      // Check if window already exists
      const existingWindow = prev.find(win => win.id === windowData.id);
      if (existingWindow) {
        // Just focus the existing window
        focusWindow(windowData.id);
        return prev;
      }

      // Create a new window with offset positioning
      const offset = prev.length * 30;
      const newWindow = {
        id: windowData.id,
        title: windowData.title,
        type: windowData.type || 'program',
        folderId: windowData.folderId || null,
        isMaximizable: windowData.isMaximizable !== false,
        isFullScreen: windowData.isFullScreen || false, // Add isFullScreen
        iconSrc: windowData.iconSrc || null,
        initialPosition: { x: 100 + offset, y: 100 + offset },
        zIndex: nextZIndex,
      };

      // Update the next z-index
      setNextZIndex(prevZ => prevZ + 1);
      setFocusedWindow(windowData.id);
      
      return [...prev, newWindow];
    });
  }, [nextZIndex]);

  const closeWindow = useCallback((id) => {
    setOpenWindows(prev => {
      const remainingWindows = prev.filter(win => win.id !== id);
      
      // Update focused window if necessary
      if (focusedWindow === id && remainingWindows.length > 0) {
        // Find the window with highest z-index
        const topWindow = remainingWindows.reduce((highest, current) => 
          current.zIndex > highest.zIndex ? current : highest, remainingWindows[0]);
        setFocusedWindow(topWindow.id);
      } else if (remainingWindows.length === 0) {
        setFocusedWindow(null);
      }
      
      return remainingWindows;
    });
  }, [focusedWindow]);

  const focusWindow = useCallback((id) => {
    if (focusedWindow === id) return; // Already focused, no need to update
    
    setFocusedWindow(id);
    setOpenWindows(prev => {
      return prev.map(win => 
        win.id === id ? { ...win, zIndex: nextZIndex } : win
      );
    });
    setNextZIndex(prev => prev + 1);
  }, [focusedWindow, nextZIndex]);

  // Memoize the return value to prevent unnecessary re-renders
  return useMemo(() => ({
    openWindows,
    focusedWindow,
    openWindow,
    closeWindow,
    focusWindow,
  }), [openWindows, focusedWindow, openWindow, closeWindow, focusWindow]);
};