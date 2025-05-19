
import React, { useState, useRef } from 'react';
import "../css/Icon.css";

const Icon = ({ id, label, iconSrc, onDoubleClick, position, onPositionChange, isSelected, onSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const iconRef = useRef(null);

  const handleMouseDown = (e) => {
    // Select the icon when clicked
    onSelect(id);
    
    // Prevent dragging if double-click is in progress
    if (e.detail === 2) return;
    
    setIsDragging(true);
    const rect = iconRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    
    // Prevent default to avoid text selection
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    // Calculate new position relative to the desktop container
    const desktopRect = iconRef.current.closest('.desktop').getBoundingClientRect();
    const newX = e.clientX - desktopRect.left - dragOffset.x;
    const newY = e.clientY - desktopRect.top - dragOffset.y;
    
    // Ensure icon stays within desktop bounds
    const iconWidth = 64;
    const iconHeight = 64;
    const maxX = desktopRect.width - iconWidth;
    const maxY = desktopRect.height - iconHeight;
    
    const clampedX = Math.max(0, Math.min(newX, maxX));
    const clampedY = Math.max(0, Math.min(newY, maxY));
    
    onPositionChange(id, { x: clampedX, y: clampedY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add global event listeners for mouse move and up when dragging
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

  const iconStyle = {
    position: 'absolute',
    left: `${position.x}px`,
    top: `${position.y}px`,
    cursor: isDragging ? 'grabbing' : 'grab',
    zIndex: isDragging ? 1000 : 1,
  };

  return (
    <div
      ref={iconRef}
      className={`retro-icon ${isSelected ? 'selected' : ''}`}
      style={iconStyle}
      onMouseDown={handleMouseDown}
      onDoubleClick={onDoubleClick}
      tabIndex={0}
      role="button"
      aria-label={label}
    >
      <div className="icon-image">
        <img 
          src={iconSrc || "src/assets/icons/PROGM027.PNG"} 
          alt={label}
          onError={(e) => {
            // Fallback to default icon if custom icon fails to load
            if (e.target.src !== "src/assets/icons/PROGM027.PNG") {
              e.target.src = "src/assets/icons/PROGM027.PNG";
            }
          }}
        />
      </div>
      <div className="icon-label">{label}</div>
    </div>
  );
};

export default Icon;