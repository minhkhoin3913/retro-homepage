// src/components/Window.jsx
import React, { useState } from 'react';
import { useDragDrop } from '../hooks/useDragDrop';
import "../css/variables.css"
import "../css/base.css"
import "../css/components.css"
import '../css/Window.css';

const Window = ({ 
  id, 
  title, 
  onClose, 
  onFocus, 
  children, 
  initialPosition = { x: 100, y: 100 }, 
  zIndex = 1000 
}) => {
  const [position, setPosition] = useState(initialPosition);
  
  // Custom drag logic for windows (title bar only)
  const { elementRef, handleMouseDown } = useDragDrop(
    id, position, (_, newPos) => setPosition(newPos), onFocus
  );

  const handleTitleBarMouseDown = (e) => {
    if (!e.target.closest('.window-title-bar')) return;
    handleMouseDown(e);
  };

  const windowStyle = {
    position: 'absolute',
    left: `${position.x}px`,
    top: `${position.y}px`,
    zIndex: zIndex,
  };

  return (
    <div
      ref={elementRef}
      className="retro-window"
      style={windowStyle}
      onMouseDown={handleTitleBarMouseDown}
    >
      <div className="window-title-bar">
        <span className="window-title">{title}</span>
        <button 
          className="window-close-button"
          onClick={() => onClose(id)}
          aria-label="Close window"
        >
          ×
        </button>
      </div>
      <div className="window-content">
        {children}
      </div>
    </div>
  );
};

export default Window;