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
  isMaximizable = true,
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [isOpening, setIsOpening] = useState(true);
  const [wasMinimized, setWasMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [preMaximizePosition, setPreMaximizePosition] = useState(initialPosition);

  const { elementRef, handleMouseDown } = useDragDrop(
    id,
    position,
    (_, newPos) => {
      if (!isMaximized) setPosition(newPos);
    },
    onFocus
  );

  React.useEffect(() => {
    setWasMinimized(isMinimized);
  }, [isMinimized, wasMinimized]);

  const handleTitleBarMouseDown = (e) => {
    if (!e.target.closest(".window-title-bar") || isMaximized) return;
    handleMouseDown(e);
  };

  const handleAnimationEnd = (e) => {
    if (e.target !== e.currentTarget) return;
    
    if (e.animationName === 'windowOpen') {
      setIsOpening(false);
    }
  };

  const handleMinimize = () => {
    if (onMinimize) {
      onMinimize(id, { title, icon, position });
    }
  };

  const handleMaximize = () => {
    if (isMaximized) {
      setPosition(preMaximizePosition);
      setIsMaximized(false);
    } else {
      setPreMaximizePosition(position);
      setPosition({ x: 0, y: 0 });
      setIsMaximized(true);
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose(id);
    }
  };

  if (isMinimized) {
    return null;
  }

  const windowStyle = {
    position: "absolute",
    left: isMaximized ? 0 : `${position.x}px`,
    top: isMaximized ? 0 : `${position.y}px`,
    width: isMaximized ? "100vw" : "auto",
    height: isMaximized ? "100vh" : "auto",
    zIndex: zIndex,
  };

  return (
    <div
      ref={elementRef}
      className={`retro-window ${isOpening ? "opening" : ""} ${isMaximized ? "maximized" : ""}`}
      style={windowStyle}
      onMouseDown={handleTitleBarMouseDown}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className="window-title-bar">
        <span className="window-title">{title}</span>
        <div className="window-controls">
          <button
            className="window-button control-button"
            onClick={handleClose}
            title="Close Window"
            aria-label="Close Window"
          >
            ×
          </button>
          {isMaximizable && (
            <button
              className="window-button control-button"
              onClick={handleMaximize}
              title={isMaximized ? "Restore Window" : "Maximize Window"}
              aria-label={isMaximized ? "Restore Window" : "Maximize Window"}
            >
              •
            </button>
          )}
          <button
            className="window-button control-button"
            onClick={handleMinimize}
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
};

export default Window;