// src/components/Desktop.jsx - Streamlined
import React, { useState, useEffect } from "react";
import Icon from "./Icon";
import Folder from "./Folder";
import Window from "./Window";
import LoadingScreen from "./LoadingScreen";
import { useWindow } from "../hooks/useWindow";
import "../css/variables.css"
import "../css/base.css"
import "../css/components.css"
import "../css/Desktop.css";
import "../css/FolderWindow.css";

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
            const audio = new Audio('./src/assets/sounds/startup.wav');
            audio.play().catch(error => console.error("Audio play failed:", error));
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

  const handleItemPositionChange = (id, newPosition, contextFolderId = null) => {
    if (contextFolderId) {
      setFolders(prev => ({
        ...prev,
        [contextFolderId]: {
          ...prev[contextFolderId],
          contents: prev[contextFolderId].contents.map(item =>
            item.id === id ? { ...item, position: newPosition } : item
          ),
        },
      }));
    } else {
      setItemPositions(prev => ({
        ...prev,
        [id]: newPosition,
      }));
    }
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
      <div className="folder-items-area">
        {folderData.contents.map(item => {
          const ItemComponent = item.type === 'folder' ? Folder : Icon;
          return (
            <ItemComponent
              key={item.id}
              id={item.id}
              label={item.label}
              iconSrc={item.iconSrc}
              position={item.position || { x: 16, y: 16 }}
              onPositionChange={(id, pos) => handleItemPositionChange(id, pos, folderId)}
              onDoubleClick={() => handleItemDoubleClick(item.id, item.label)}
              isSelected={selectedIcon === item.id}
              onSelect={setSelectedIcon}
            />
          );
        })}
      </div>
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

      {openWindows.map(win => (
        <Window
          key={win.id}
          id={win.id}
          title={win.title}
          initialPosition={win.initialPosition}
          zIndex={win.zIndex}
          onClose={closeWindow}
          onFocus={focusWindow}
        >
          {win.type === "folder"
            ? renderFolderContent(win.folderId)
            : renderWindowContent(win.id, win.title)}
        </Window>
      ))}
    </div>
  );
};

export default Desktop;