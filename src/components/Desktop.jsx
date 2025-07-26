import React, { useState, useEffect, useCallback, useRef } from "react";
import Icon from "./Icon";
import Folder from "./Folder";
import Window from "./Window";
import FolderWindow from "./FolderWindow";
import Taskbar from "./Taskbar";
import LoadingScreen from "./LoadingScreen";
import { useWindow } from "../hooks/useWindow";
import "../css/variables.css";
import "../css/base.css";
import "../css/components.css";
import "../css/Desktop.css";
import "../css/FolderWindow.css";
import "../css/Taskbar.css";
import { desktopIcons, desktopFolders, renderWindowContent } from "../config/programConfig";

const Desktop = () => {
  const { openWindows, openWindow, closeWindow, focusWindow } = useWindow();
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDelaying, setIsDelaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [folders] = useState(desktopFolders);
  const [minimizedWindows, setMinimizedWindows] = useState([]);
  const [loadingWindows, setLoadingWindows] = useState(new Set());
  const audioRef = useRef(null);

  // Memoized desktop items
  const allDesktopItems = useRef([...desktopIcons, ...Object.entries(desktopFolders).map(([folderId, folderData]) => ({
    id: folderId,
    label: folderData.label,
    iconSrc: folderData.iconSrc,
    type: "folder",
  }))]).current;

  // Initialize positions
  const [itemPositions, setItemPositions] = useState(() => {
    const initialPositions = {};
    let leftIconIndex = 0;
    let rightIconIndex = 0;
    
    // Constants for positioning
    const EDGE_PADDING = 24; // Consistent padding from edges (updated from 16px)
    const ICON_SPACING = 102; // Vertical spacing between icons
    const ICON_WIDTH = 64; // Width of icon from CSS
    
    allDesktopItems.forEach((item) => {
      // Place folders on the right, others on the left
      if (item.type === "folder") {
        initialPositions[item.id] = {
          x: window.innerWidth - ICON_WIDTH - EDGE_PADDING, // Exact icon width + padding
          y: EDGE_PADDING + rightIconIndex * ICON_SPACING,
        };
        rightIconIndex++;
      } else {
        initialPositions[item.id] = {
          x: EDGE_PADDING,
          y: EDGE_PADDING + leftIconIndex * ICON_SPACING,
        };
        leftIconIndex++;
      }
    });
    return initialPositions;
  });

  // Loading screen and startup sound effect
  useEffect(() => {
    const minDelay = 5000;
    const maxDelay = 10000;
    const randomDelay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
    let soundPlayed = false;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Start the delay phase after loading completes
          setTimeout(() => {
            setIsLoading(false);
            setIsDelaying(true);
            
            // Play sound when loading completes
            if (!soundPlayed) {
              playStartupSound();
              soundPlayed = true;
            }
            
            // After 2 seconds delay, show desktop
            setTimeout(() => {
              setIsDelaying(false);
            }, 2000);
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, randomDelay / 20);

    // Improved startup sound function with path handling for different environments
    const playStartupSound = async () => {
      // Get base URL for assets - handles both localhost and GitHub Pages
      const baseUrl = import.meta.env.BASE_URL || '/';
      
      // Create array of possible sound paths with different formats and paths
      const audioSources = [
        `${baseUrl}sounds/LOGON.flac`,
        `/sounds/LOGON.flac`,
        `./sounds/LOGON.flac`,
        `../public/sounds/LOGON.flac`,
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
            return; // Exit if successful
          }
        } catch (error) {
          console.warn(`Failed to play audio from ${source}:`, error);
          // Continue to next source
        }
      }
      
      console.error("All audio sources failed to play");
    };

    return () => {
      clearInterval(interval);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Handle window resize to update icon positions
  useEffect(() => {
    const handleResize = () => {
      setItemPositions(prev => {
        const newPositions = { ...prev };
        const EDGE_PADDING = 24; // Updated from 16px to match the initialization
        const ICON_WIDTH = 64;
        
        // Only update the positions of folder icons on the right side
        allDesktopItems.forEach(item => {
          if (item.type === "folder") {
            newPositions[item.id] = {
              ...newPositions[item.id],
              x: window.innerWidth - ICON_WIDTH - EDGE_PADDING,
            };
          }
        });
        
        return newPositions;
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [allDesktopItems]);

  const handleItemDoubleClick = useCallback((id, label) => {
    const item = allDesktopItems.find(item => item.id === id);
    const iconConfig = desktopIcons.find(icon => icon.id === id);
    const folderItemConfig = Object.values(desktopFolders)
      .flatMap(folder => folder.contents || [])
      .find(item => item.id === id);

    const isMaximizable = iconConfig?.isMaximizable ?? folderItemConfig?.isMaximizable ?? true;
    const iconSrc = iconConfig?.iconSrc ?? folderItemConfig?.iconSrc;

    const isWindowOpen = openWindows.some(win => win.id === id);
    const isWindowMinimized = minimizedWindows.some(win => win.id === id);

    if (isWindowOpen) {
      if (isWindowMinimized) {
        // Restore window
        setMinimizedWindows(prev => prev.filter(w => w.id !== id));
        setTimeout(() => focusWindow(id), 10);
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

    if (item?.type === "folder") {
      openWindow(id, label, "folder", id, isMaximizable, iconSrc);
    } else {
      openWindow(id, label, "program", undefined, isMaximizable, iconSrc);
    }
  }, [openWindow, allDesktopItems, openWindows, minimizedWindows, focusWindow]);

  const handleMinimizeWindow = useCallback((windowId, windowData) => {
    const iconConfig = desktopIcons.find(icon => icon.id === windowId);
    const folderItemConfig = Object.values(desktopFolders)
      .flatMap(folder => folder.contents || [])
      .find(item => item.id === windowId);
    
    const iconSrc = iconConfig?.iconSrc ?? folderItemConfig?.iconSrc;

    setMinimizedWindows(prev => {
      if (prev.find(w => w.id === windowId)) return prev;
      return [...prev, {
        id: windowId,
        title: windowData.title,
        icon: iconSrc, // Use iconSrc from programConfig
      }];
    });
  }, []);

  const handleRestoreWindow = useCallback((windowId) => {
    setMinimizedWindows(prev => prev.filter(w => w.id !== windowId));
    setTimeout(() => focusWindow(windowId), 10);
  }, [focusWindow]);

  const handleCloseWindow = useCallback((windowId) => {
    closeWindow(windowId);
    setMinimizedWindows(prev => prev.filter(w => w.id !== windowId));
  }, [closeWindow]);

  const handleItemPositionChange = useCallback((id, newPosition, contextFolderId = null) => {
    if (contextFolderId) {
      console.log(`Position change for item ${id} in folder ${contextFolderId} - handled by CSS Grid`);
    } else {
      setItemPositions(prev => ({
        ...prev,
        [id]: newPosition,
      }));
    }
  }, []);

  const handleDesktopClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      setSelectedIcon(null);
    }
  }, []);

  const renderFolderContent = useCallback((folderId) => {
    const folderData = folders[folderId];
    if (!folderData) return <div role="alert">Folder not found</div>;

    return (
      <FolderWindow
        folderId={folderId}
        folderData={folderData}
        onIconDoubleClick={handleItemDoubleClick}
        onFolderDoubleClick={handleItemDoubleClick}
        onIconPositionChange={handleItemPositionChange}
        onFolderPositionChange={handleItemPositionChange}
        onIconSelect={setSelectedIcon}
        onFolderSelect={setSelectedIcon}
        selectedItem={selectedIcon}
      />
    );
  }, [folders, handleItemDoubleClick, handleItemPositionChange, selectedIcon]);

  // Show loading screen
  if (isLoading) {
    return <LoadingScreen progress={progress} />;
  }

  // Show empty desktop during delay phase
  if (isDelaying) {
    return (
      <div
        className="desktop"
        onClick={handleDesktopClick}
        onDragOver={(e) => e.preventDefault()}
        role="main"
        aria-label="Desktop environment"
      >
        <Taskbar
          minimizedWindows={minimizedWindows}
          onRestore={handleRestoreWindow}
          aria-label="System taskbar"
        />
      </div>
    );
  }

  return (
    <div
      className={`desktop ${loadingWindows.size > 0 ? 'loading' : ''}`}
      onClick={handleDesktopClick}
      onDragOver={(e) => e.preventDefault()}
      role="main"
      aria-label="Desktop environment"
    >
      {allDesktopItems.map(item => {
        const ItemComponent = item.type === 'folder' ? Folder : Icon;
        return (
          <ItemComponent
            key={item.id}
            id={item.id}
            label={item.label}
            iconSrc={item.iconSrc}
            position={itemPositions[item.id]}
            onPositionChange={handleItemPositionChange}
            onDoubleClick={() => handleItemDoubleClick(item.id, item.label)}
            isSelected={selectedIcon === item.id}
            onSelect={setSelectedIcon}
            aria-label={`${item.label} ${item.type === 'folder' ? 'folder' : 'application'}`}
            draggable={true}
            onDragStart={(e) => {
              e.dataTransfer.setData('text/plain', JSON.stringify({ id: item.id }));
            }}
            onDragEnd={(e) => {
              const newPosition = {
                x: e.clientX - 32, // Adjust for icon size
                y: e.clientY - 32,
              };
              handleItemPositionChange(item.id, newPosition);
            }}
          />
        );
      })}

      {openWindows.map(win => {
        const isMinimized = minimizedWindows.some(mw => mw.id === win.id);
        const item = allDesktopItems.find(item => item.id === win.id);
        const iconConfig = desktopIcons.find(icon => icon.id === win.id);
        const folderItemConfig = Object.values(desktopFolders)
          .flatMap(folder => folder.contents || [])
          .find(item => item.id === win.id);
        const isMaximizable = iconConfig?.isMaximizable ?? folderItemConfig?.isMaximizable ?? win.isMaximizable ?? true;

        return (
          <Window
            key={win.id}
            id={win.id}
            title={win.title}
            icon={item?.iconSrc}
            initialPosition={win.initialPosition}
            zIndex={win.zIndex}
            isMinimized={isMinimized}
            isMaximizable={isMaximizable}
            onClose={handleCloseWindow}
            onMinimize={handleMinimizeWindow}
            onFocus={focusWindow}
            aria-label={`${win.title} window`}
          >
            {win.type === "folder"
              ? renderFolderContent(win.folderId)
              : renderWindowContent(win.id, win.title)}
          </Window>
        );
      })}

      <Taskbar
        minimizedWindows={minimizedWindows}
        onRestore={handleRestoreWindow}
        aria-label="System taskbar"
      />
    </div>
  );
};

export default Desktop;