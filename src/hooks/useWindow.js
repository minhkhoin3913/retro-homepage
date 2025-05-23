// src/hooks/useWindow.js
import { useState } from 'react';

export const useWindow = () => {
  const [openWindows, setOpenWindows] = useState([]);
  const [focusedWindow, setFocusedWindow] = useState(null);
  const [nextZIndex, setNextZIndex] = useState(1000);

  const openWindow = (id, title, type = 'program', folderId = null) => {
    const existingWindow = openWindows.find(win => win.id === id);
    if (existingWindow) {
      setFocusedWindow(id);
      return;
    }

    const offset = openWindows.length * 30;
    const newWindow = {
      id,
      title,
      type,
      folderId,
      initialPosition: { x: 100 + offset, y: 100 + offset },
      zIndex: nextZIndex,
    };

    setOpenWindows(prev => [...prev, newWindow]);
    setFocusedWindow(id);
    setNextZIndex(prev => prev + 1);
  };

  const closeWindow = (id) => {
    setOpenWindows(prev => prev.filter(win => win.id !== id));
    if (focusedWindow === id) {
      const remainingWindows = openWindows.filter(win => win.id !== id);
      if (remainingWindows.length > 0) {
        const topWindow = remainingWindows.reduce((prev, current) =>
          prev.zIndex > current.zIndex ? prev : current
        );
        setFocusedWindow(topWindow.id);
      } else {
        setFocusedWindow(null);
      }
    }
  };

  const focusWindow = (id) => {
    if (focusedWindow !== id) {
      setFocusedWindow(id);
      setOpenWindows(windows =>
        windows.map(win =>
          win.id === id ? { ...win, zIndex: nextZIndex } : win
        )
      );
      setNextZIndex(prev => prev + 1);
    }
  };

  return {
    openWindows,
    focusedWindow,
    openWindow,
    closeWindow,
    focusWindow,
  };
};
