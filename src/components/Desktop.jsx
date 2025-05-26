// src/components/Desktop.jsx
import React, { useState, useEffect } from "react";
import Icon from "./Icon";
import Folder from "./Folder";
import Window from "./Window";
import FolderWindow from "./FolderWindow";
import Taskbar from "./Taskbar";
import LoadingScreen from "./LoadingScreen";
import { useWindow } from "../hooks/useWindow";
import "../css/variables.css"
import "../css/base.css"
import "../css/components.css"
import "../css/Desktop.css";
import "../css/FolderWindow.css";
import "../css/Taskbar.css";

import {
  desktopIcons,
  desktopFolders,
  renderWindowContent,
} from "../config/programConfig";

const Desktop = () => {
  const { openWindows, openWindow, closeWindow, focusWindow } = useWindow();
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [folders, setFolders] = useState(desktopFolders);
  const [minimizedWindows, setMinimizedWindows] = useState([]);

  // Combine all desktop items
  const [allDesktopItems] = useState(() => {
    const items = [...desktopIcons];
    Object.entries(desktopFolders).forEach(([folderId, folderData]) => {
      items.push({
        id: folderId,
        label: folderData.label,
        iconSrc: folderData.iconSrc,
        type: "folder",
      });
    });
    return items;
  });

  // Initialize positions
  const [itemPositions, setItemPositions] = useState(() => {
    const initialPositions = {};
    allDesktopItems.forEach((item, index) => {
      initialPositions[item.id] = {
        x: 16,
        y: 16 + index * 96,
      };
    });
    return initialPositions;
  });

  // Loading screen effect
  useEffect(() => {
    const minDelay = 5000;
    const maxDelay = 10000;
    const randomDelay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            
            // Play startup sound with multiple format fallbacks
            const playStartupSound = async () => {
              // List of possible audio file paths and formats to try
              const audioSources = [
                '/sounds/wfw311.mp3',
                '/sounds/wfw311.wav', 
                '/assets/sounds/wfw311.mp3',
                '/assets/sounds/wfw311.wav',
                './sounds/wfw311.mp3',
                './sounds/wfw311.wav',
              ];

              for (const source of audioSources) {
                try {
                  const audio = new Audio(source);
                  audio.volume = 0.7; // Set volume to 70%
                  
                  // Wait for the audio to be ready to play
                  await new Promise((resolve, reject) => {
                    audio.addEventListener('canplaythrough', resolve, { once: true });
                    audio.addEventListener('error', reject, { once: true });
                    audio.load();
                  });
                  
                  await audio.play();
                  console.log(`Startup sound played successfully from: ${source}`);
                  break; // Success, stop trying other sources
                  
                } catch (error) {
                  console.warn(`Failed to play audio from ${source}:`, error);
                  continue; // Try next source
                }
              }
            };

            // Call the function to play startup sound
            playStartupSound().catch(error => {
              console.error("All startup sound attempts failed:", error);
            });
            
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, randomDelay / 20);

    return () => clearInterval(interval);
  }, []);

  const handleItemDoubleClick = (id, label) => {
    const item = allDesktopItems.find(item => item.id === id);
    if (item?.type === "folder") {
      openWindow(id, label, "folder", id);
    } else {
      openWindow(id, label, "program");
    }
  };

  const handleMinimizeWindow = (windowId, windowData) => {
    // Find the window to get its icon
    const window = openWindows.find(w => w.id === windowId);
    const item = allDesktopItems.find(item => item.id === windowId);
    
    // Add to minimized windows with icon
    setMinimizedWindows(prev => {
      // Avoid duplicates
      if (prev.find(w => w.id === windowId)) return prev;
      return [...prev, { 
        id: windowId, 
        title: windowData.title,
        icon: item?.iconSrc || window?.iconSrc
      }];
    });
  };

  const handleRestoreWindow = (windowId) => {
    // Remove from minimized windows first
    setMinimizedWindows(prev => prev.filter(w => w.id !== windowId));
    
    // Small delay to ensure the Window component detects the state change
    setTimeout(() => {
      // Focus the window (this will bring it back to view)
      focusWindow(windowId);
    }, 10);
  };

  const handleCloseWindow = (windowId) => {
    // Remove from both open windows and minimized windows
    closeWindow(windowId);
    setMinimizedWindows(prev => prev.filter(w => w.id !== windowId));
  };

  const handleItemPositionChange = (id, newPosition, contextFolderId = null) => {
    if (contextFolderId) {
      // For folder contents, we no longer need position tracking in grid layout
      // This function is kept for compatibility but positions are managed by CSS Grid
      console.log(`Position change for item ${id} in folder ${contextFolderId} - handled by CSS Grid`);
    } else {
      // Desktop items still use absolute positioning
      setItemPositions(prev => ({
        ...prev,
        [id]: newPosition,
      }));
    }
  };

  const handleMoveIcon = (draggedIconId, sourceFolderId, targetFolderId) => {
    // Move icon from one folder to another
    setFolders(prev => {
      const newFolders = { ...prev };
      
      // Remove from source folder
      if (sourceFolderId && newFolders[sourceFolderId]) {
        newFolders[sourceFolderId] = {
          ...newFolders[sourceFolderId],
          contents: newFolders[sourceFolderId].contents.filter(item => item.id !== draggedIconId)
        };
      }
      
      // Add to target folder
      if (targetFolderId && newFolders[targetFolderId]) {
        const draggedItem = prev[sourceFolderId]?.contents.find(item => item.id === draggedIconId);
        if (draggedItem) {
          newFolders[targetFolderId] = {
            ...newFolders[targetFolderId],
            contents: [...newFolders[targetFolderId].contents, { ...draggedItem, position: null }]
          };
        }
      }
      
      return newFolders;
    });
  };

  const handleDesktopClick = (e) => {
    if (e.target === e.currentTarget) {
      setSelectedIcon(null);
    }
  };

  const renderFolderContent = (folderId) => {
    const folderData = folders[folderId];
    if (!folderData) return <div>Folder not found</div>;

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
        onMoveIcon={handleMoveIcon}
      />
    );
  };

  if (isLoading) {
    return <LoadingScreen progress={progress} />;
  }

  return (
    <div
      className="desktop"
      onClick={handleDesktopClick}
      onDragOver={(e) => e.preventDefault()}
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
          />
        );
      })}

      {openWindows.map(win => {
        const isMinimized = minimizedWindows.some(mw => mw.id === win.id);
        const item = allDesktopItems.find(item => item.id === win.id);
        
        return (
          <Window
            key={win.id}
            id={win.id}
            title={win.title}
            icon={item?.iconSrc}
            initialPosition={win.initialPosition}
            zIndex={win.zIndex}
            isMinimized={isMinimized}
            onClose={handleCloseWindow}
            onMinimize={handleMinimizeWindow}
            onFocus={focusWindow}
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
      />
    </div>
  );
};

export default Desktop;