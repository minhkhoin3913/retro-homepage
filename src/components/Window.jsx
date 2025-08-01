import React, { useState, useEffect, useCallback, memo } from "react";
import { useDragDrop } from "../hooks/useDragDrop";
import "../css/variables.css";
import "../css/base.css";
import "../css/components.css";
import "../css/Window.css";

const Window = memo(({
  id,
  title,
  icon,
  onClose,
  onMinimize,
  onFocus,
  children,
  initialPosition = { x: 100, y: 100 },
  zIndex = 1000,
  isMinimized = false,
  isMaximizable = true,
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [isLoading, setIsLoading] = useState(true);
  const [isMaximized, setIsMaximized] = useState(false);
  const [preMaximizePosition, setPreMaximizePosition] = useState(initialPosition);
  const MENU_BAR_HEIGHT = 30; // Height of the menu bar

  // Memoize position update handler for better performance
  const handlePositionChange = useCallback((_, newPos) => {
    if (!isMaximized) setPosition(newPos);
  }, [isMaximized]);

  const { elementRef, handleMouseDown, handleTouchStart } = useDragDrop(
    id,
    position,
    handlePositionChange,
    onFocus
  );

  // Simulate loading delay - only run once
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(loadingTimer);
  }, []);

  // Memoize event handlers
  const handleTitleBarMouseDown = useCallback((e) => {
    if (!e.target.closest(".window-title-bar") || isMaximized) return;
    handleMouseDown(e);
  }, [handleMouseDown, isMaximized]);
  
  const handleTitleBarTouchStart = useCallback((e) => {
    if (!e.target.closest(".window-title-bar") || isMaximized) return;
    handleTouchStart(e);
  }, [handleTouchStart, isMaximized]);

  const handleMinimizeClick = useCallback(() => {
    if (onMinimize) {
      onMinimize(id, { title, icon, position });
    }
  }, [id, title, icon, position, onMinimize]);

  const handleMaximizeClick = useCallback(() => {
    if (isMaximized) {
      setPosition(preMaximizePosition);
      setIsMaximized(false);
    } else {
      setPreMaximizePosition(position);
      setPosition({ x: 0, y: MENU_BAR_HEIGHT });
      setIsMaximized(true);
    }
  }, [isMaximized, position, preMaximizePosition, MENU_BAR_HEIGHT]);

  const handleCloseClick = useCallback(() => {
    if (onClose) {
      onClose(id);
    }
  }, [id, onClose]);

  // Don't render if still loading
  if (isLoading) {
    return null;
  }

  // If minimized, render but hide the window
  if (isMinimized) {
    return (
      <div
        ref={elementRef}
        className="windows-window minimized"
        style={{
          position: "absolute",
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: "auto",
          height: "auto",
          zIndex: zIndex,
          visibility: "hidden",
          pointerEvents: "none",
        }}
      >
        <div className="window-title-bar">
          <span className="window-title">{title}</span>
          <div className="window-controls">
            <button
              className="window-button control-button"
              onClick={handleCloseClick}
              title="Close Window"
              aria-label="Close Window"
            >
              ×
            </button>
            {isMaximizable && (
              <button
                className="window-button control-button"
                onClick={handleMaximizeClick}
                title={isMaximized ? "Restore Window" : "Maximize Window"}
                aria-label={isMaximized ? "Restore Window" : "Maximize Window"}
              >
                •
              </button>
            )}
            <button
              className="window-button control-button"
              onClick={handleMinimizeClick}
              title="Minimize Window"
              aria-label="Minimize Window"
            >
              -
            </button>
          </div>
        </div>
        <div className="window-content">{children}</div>
      </div>
    );
  }

  // Compute window style
  const windowStyle = {
    position: "absolute",
    left: isMaximized ? 0 : `${position.x}px`,
    top: isMaximized ? MENU_BAR_HEIGHT : `${position.y}px`,
    width: isMaximized ? "100vw" : "auto",
    height: isMaximized ? `calc(100vh - ${MENU_BAR_HEIGHT}px)` : "auto",
    zIndex: zIndex,
  };

  return (
    <div
      ref={elementRef}
      className={`windows-window ${isMaximized ? "maximized" : ""}`}
      style={windowStyle}
      onMouseDown={handleTitleBarMouseDown}
      onTouchStart={handleTitleBarTouchStart}
    >
      <div className="window-title-bar">
        <span className="window-title">{title}</span>
        <div className="window-controls">
          <button
            className="window-button control-button"
            onClick={handleCloseClick}
            title="Close Window"
            aria-label="Close Window"
          >
            ×
          </button>
          {isMaximizable && (
            <button
              className="window-button control-button"
              onClick={handleMaximizeClick}
              title={isMaximized ? "Restore Window" : "Maximize Window"}
              aria-label={isMaximized ? "Restore Window" : "Maximize Window"}
            >
              •
            </button>
          )}
          <button
            className="window-button control-button"
            onClick={handleMinimizeClick}
            title="Minimize Window"
            aria-label="Minimize Window"
          >
            -
          </button>
        </div>
      </div>
      <div className="window-content">{children}</div>
    </div>
  );
});

Window.displayName = 'Window';

export default Window;