import React, { useState, useRef } from 'react';
import '../css/Window.css';

const Window = ({ id, title, onClose, onFocus, children, initialPosition = { x: 100, y: 100 }, zIndex = 1000 }) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef(null);

  const handleMouseDown = (e) => {
    // Focus this window when clicked
    if (onFocus) {
      onFocus(id);
    }
    
    // Only drag from title bar
    if (!e.target.closest('.window-title-bar')) return;
    
    setIsDragging(true);
    const rect = windowRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const desktopRect = windowRef.current.closest('.desktop').getBoundingClientRect();
    const newX = e.clientX - desktopRect.left - dragOffset.x;
    const newY = e.clientY - desktopRect.top - dragOffset.y;
    
    // Keep window within desktop bounds
    const windowRect = windowRef.current.getBoundingClientRect();
    const maxX = desktopRect.width - windowRect.width;
    const maxY = desktopRect.height - windowRect.height;
    
    const clampedX = Math.max(0, Math.min(newX, maxX));
    const clampedY = Math.max(0, Math.min(newY, maxY));
    
    setPosition({ x: clampedX, y: clampedY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add global event listeners for dragging
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  const windowStyle = {
    position: 'absolute',
    left: `${position.x}px`,
    top: `${position.y}px`,
    zIndex: zIndex,
  };

  return (
    <div
      ref={windowRef}
      className="retro-window"
      style={windowStyle}
      onMouseDown={handleMouseDown}
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