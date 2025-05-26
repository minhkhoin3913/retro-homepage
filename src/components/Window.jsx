// src/components/Window.jsx
import React, { useState } from "react";
import { useDragDrop } from "../hooks/useDragDrop";
import "../css/variables.css";
import "../css/base.css";
import "../css/components.css";
import "../css/Window.css";

const Window = ({
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
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [isOpening, setIsOpening] = useState(true);
  const [isRestoring, setIsRestoring] = useState(false);
  const [wasMinimized, setWasMinimized] = useState(false);

  // Custom drag logic for windows (title bar only)
  const { elementRef, handleMouseDown } = useDragDrop(
    id,
    position,
    (_, newPos) => setPosition(newPos),
    onFocus
  );

  // Track minimize/restore state changes
  React.useEffect(() => {
    if (wasMinimized && !isMinimized) {
      // Window is being restored from minimized state
      setIsRestoring(true);
    }
    setWasMinimized(isMinimized);
  }, [isMinimized, wasMinimized]);

  const handleTitleBarMouseDown = (e) => {
    if (!e.target.closest(".window-title-bar")) return;
    handleMouseDown(e);
  };

  const handleAnimationEnd = () => {
    setIsOpening(false);
    setIsRestoring(false);
  };

  const handleMinimize = () => {
    if (onMinimize) {
      onMinimize(id, { title, icon, position });
    }
  };

  // Don't render if minimized
  if (isMinimized) {
    return null;
  }

  const windowStyle = {
    position: "absolute",
    left: `${position.x}px`,
    top: `${position.y}px`,
    zIndex: zIndex,
  };

  return (
    <div
      ref={elementRef}
      className={`retro-window ${isOpening ? "opening" : ""} ${
        isRestoring ? "opening" : ""
      }`}
      style={windowStyle}
      onMouseDown={handleTitleBarMouseDown}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className="window-title-bar">
        <span className="window-title">{title}</span>
        <div className="window-controls">
          <button
            className="window-button control-button"
            onClick={() => onClose(id)}
            aria-label="Close window"
          >
            ×
          </button>
          <button
            className="window-button control-button"
            onClick={handleMinimize}
            aria-label="Minimize window"
          >
            -
          </button>
        </div>
      </div>
      <div className="window-content">{children}</div>
    </div>
  );
};

export default Window;
