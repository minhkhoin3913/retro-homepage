import React, { useState, useCallback, memo } from "react";
import Icon from "./Icon";
import Folder from "./Folder";
import Window from "./Window";
import FolderWindow from "./FolderWindow";
import Taskbar from "./Taskbar";
import MenuBar from "./MenuBar";
import LoadingScreen from "./LoadingScreen";
import ShutdownScreen from "./ShutdownScreen";
import { useWindow } from "../hooks/useWindow";
import { useDesktop } from "../hooks/useDesktop";
import { useLoadingScreen } from "../hooks/useLoadingScreen";
import { useWindowManager } from "../hooks/useWindowManager";
import { useShutdown } from "../hooks/useShutdown";
import "../css/variables.css";
import "../css/base.css";
import "../css/components.css";
import "../css/Desktop.css";
import "../css/FolderWindow.css";
import "../css/Taskbar.css";
import "../css/MenuBar.css";
import { desktopFolders, renderWindowContent } from "../config/programConfig";

const Desktop = memo(() => {
  // Use custom hooks
  const { openWindows, openWindow, closeWindow, focusWindow } = useWindow();
  const { allDesktopItems, itemPositions, handleItemPositionChange } = useDesktop();
  const { isLoading, isDelaying, progress, menuBarVisible, skipLoading } = useLoadingScreen();
  const { 
    minimizedWindows, 
    loadingWindows, 
    handleItemDoubleClick: handleItemDoubleClickBase,
    handleMinimizeWindow,
    handleRestoreWindow: handleRestoreWindowBase,
    handleCloseWindow: handleCloseWindowBase
  } = useWindowManager();

  // Use shutdown hook
  const { isShuttingDown, shutdownStage, startShutdown } = useShutdown();

  // Local state
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [folders] = useState(desktopFolders);

  // Create handlers with necessary dependencies
  const handleItemDoubleClick = useCallback((id, label) => {
    handleItemDoubleClickBase(id, label, openWindows, openWindow, focusWindow);
  }, [handleItemDoubleClickBase, openWindows, openWindow, focusWindow]);

  const handleRestoreWindow = useCallback((windowId) => {
    handleRestoreWindowBase(windowId, focusWindow);
  }, [handleRestoreWindowBase, focusWindow]);

  const handleCloseWindow = useCallback((windowId) => {
    handleCloseWindowBase(windowId, closeWindow);
  }, [handleCloseWindowBase, closeWindow]);

  const handleDesktopClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      setSelectedIcon(null);
    }
  }, []);

  const handleShutdown = useCallback(() => {
    startShutdown();
  }, [startShutdown]);

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
    return <LoadingScreen progress={progress} onSkip={skipLoading} />;
  }

  // Show shutdown screen
  if (isShuttingDown && shutdownStage === 2) {
    return <ShutdownScreen onComplete={() => window.close()} />;
  }

  // Show empty desktop during delay phase
  if (isDelaying) {
    return (
      <>
        <MenuBar visible={menuBarVisible} />
        <div
          className="desktop delaying"
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
      </>
    );
  }

  return (
    <>
      <MenuBar visible={menuBarVisible && shutdownStage === 0} onShutdown={handleShutdown} />
      <div
        className={`desktop ${loadingWindows.size > 0 ? 'loading' : ''} ${shutdownStage === 1 ? 'shutting-down' : ''}`}
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
            />
          );
        })}

        {openWindows.map(win => {
          const isMinimized = minimizedWindows.some(mw => mw.id === win.id);
          
          return (
            <Window
              key={win.id}
              id={win.id}
              title={win.title}
              icon={win.iconSrc}
              initialPosition={win.initialPosition}
              zIndex={win.zIndex}
              isMinimized={isMinimized}
              isMaximizable={win.isMaximizable}
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
    </>
  );
});

Desktop.displayName = 'Desktop';

export default Desktop;