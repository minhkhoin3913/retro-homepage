// src/components/DraggableItem.jsx
import React, { useState, useCallback, memo } from 'react';
import { useDragDrop } from '../hooks/useDragDrop';
import { useContrastColor } from '../hooks/useContrastColor';

const DraggableItem = memo(({ 
  id, 
  label, 
  iconSrc, 
  defaultIcon,
  position, 
  onPositionChange, 
  onDoubleClick, 
  onSelect,
  isSelected,
  className,
  children,
  onDrop,
  onDragOver,
  onDragLeave,
  isDraggable = false,
  onDragStart
}) => {
  // Provide default position if not specified (for grid items)
  const effectivePosition = position || null;
  const effectiveOnPositionChange = position ? onPositionChange : () => {};
  
  // State for drop target styling
  const [isDropTarget, setIsDropTarget] = useState(false);
  
  // Get drag-drop functionality from hook
  const { elementRef, handleMouseDown, handleTouchStart, elementStyle } = useDragDrop(
    id, effectivePosition, effectiveOnPositionChange, onSelect
  );

  // Get contrast-appropriate text color
  const textColor = useContrastColor(elementRef);

  // Memoized event handlers for better performance
  const handleDragOver = useCallback((e) => {
    if (!onDrop) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDropTarget(true);
    onDragOver?.(e, id);
  }, [onDrop, onDragOver, id]);

  const handleDragLeave = useCallback((e) => {
    if (!elementRef.current?.contains(e.relatedTarget)) {
      setIsDropTarget(false);
    }
    onDragLeave?.(e);
  }, [elementRef, onDragLeave]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDropTarget(false);
    
    try {
      const draggedData = e.dataTransfer.getData('text/plain');
      if (draggedData && onDrop) {
        // Try to parse as JSON first
        try {
          const parsedData = JSON.parse(draggedData);
          onDrop(parsedData.id || draggedData, id);
        } catch {
          // If not JSON, use as plain text
          onDrop(draggedData, id);
        }
      }
    } catch (error) {
      console.error("Error handling drop:", error);
    }
  }, [id, onDrop]);

  const handleDragStart = useCallback((e) => {
    e.dataTransfer.setData('text/plain', id);
    onDragStart?.(e, id);
  }, [id, onDragStart]);

  // Double tap detection for mobile devices
  const [lastTap, setLastTap] = useState(0);
  const handleTap = useCallback(() => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300; // ms
    if (now - lastTap < DOUBLE_TAP_DELAY) {
      // Double tap detected
      onDoubleClick?.();
    }
    setLastTap(now);
  }, [lastTap, onDoubleClick]);

  // Handle image error fallback
  const handleImageError = useCallback((e) => {
    if (defaultIcon && e.target.src !== defaultIcon) {
      e.target.src = defaultIcon;
    }
  }, [defaultIcon]);

  // Consolidated props for the main div
  const itemProps = {
    ref: elementRef,
    className: `${className} ${isSelected ? 'selected' : ''} ${isDropTarget ? 'drop-target' : ''}`,
    style: elementStyle,
    onMouseDown: handleMouseDown,
    onTouchStart: (e) => {
      handleTouchStart(e);
      handleTap();
    },
    onDoubleClick,
    tabIndex: 0,
    role: "button",
    "aria-label": label,
    ...(onDrop && {
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop,
    }),
    ...(isDraggable && {
      draggable: true,
      onDragStart: handleDragStart,
    })
  };

  return (
    <div {...itemProps}>
      <div className="item-image">
        <img 
          src={iconSrc || defaultIcon} 
          alt={label}
          onError={handleImageError}
        />
      </div>
      <div 
        className="item-label"
        style={{ color: textColor }}
      >
        {label}
      </div>
      {children}
    </div>
  );
});

DraggableItem.displayName = 'DraggableItem';

export default DraggableItem;