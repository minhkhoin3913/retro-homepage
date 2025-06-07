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
    allDesktopItems.forEach((item, index) => {
      initialPositions[item.id] = { x: 16, y: 16 + index * 102 };
    });
    return initialPositions;
  });

  // Loading screen and startup sound effect
  useEffect(() => {
    const minDelay = 5000;
    const maxDelay = 10000;
    const randomDelay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Start the delay phase after loading completes
          setTimeout(() => {
            setIsLoading(false);
            setIsDelaying(true);
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

    // Play startup sound
    const playStartupSound = async () => {
      const audioSources = [
        './sounds/wfw311.mp3',
        './sounds/wfw311.wav',
      ];

      audioRef.current = new Audio();
      audioRef.current.volume = 0.7;

      for (const source of audioSources) {
        try {
          audioRef.current.src = source;
          await audioRef.current.load();
          await audioRef.current.play();
          console.log(`Startup sound played from: ${source}`);
          break;
        } catch (error) {
          console.warn(`Failed to play audio from ${source}:`, error);
        }
      }
    };

    playStartupSound().catch(error => {
      console.error("Startup sound failed:", error);
    });

    return () => {
      clearInterval(interval);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleItemDoubleClick = useCallback((id, label) => {
    const item = allDesktopItems.find(item => item.id === id);
    const iconConfig = desktopIcons.find(icon => icon.id === id);
    const folderItemConfig = Object.values(desktopFolders)
      .flatMap(folder => folder.contents || [])
      .find(item => item.id === id);
    
    const isMaximizable = iconConfig?.isMaximizable ?? folderItemConfig?.isMaximizable ?? true;
    const iconSrc = iconConfig?.iconSrc ?? folderItemConfig?.iconSrc;

    if (item?.type === "folder") {
      openWindow(id, label, "folder", id, isMaximizable, iconSrc);
    } else {
      openWindow(id, label, "program", undefined, isMaximizable, iconSrc);
    }
  }, [openWindow, allDesktopItems]);

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
      className="desktop"
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