// src/hooks/useDragDrop.js
import { useState, useRef, useEffect } from 'react';

export const useDragDrop = (id, position, onPositionChange, onSelect) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const elementRef = useRef(null);

  // Handle cases where position might be undefined (e.g., grid layout)
  const safePosition = position || { x: 0, y: 0 };
  const isAbsolutePositioned = position !== null && position !== undefined;

  const handleMouseDown = (e) => {
    onSelect?.(id);
    
    if (e.detail === 2) return; // Prevent dragging on double-click
    
    // Only enable dragging for absolutely positioned items
    if (!isAbsolutePositioned) return;
    
    setIsDragging(true);
    const rect = elementRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !isAbsolutePositioned) return;
    
    const container = elementRef.current.closest('.desktop') || elementRef.current.closest('.folder-content');
    const containerRect = container.getBoundingClientRect();
    const newX = e.clientX - containerRect.left - dragOffset.x;
    const newY = e.clientY - containerRect.top - dragOffset.y;
    
    // Basic bounds checking
    const elementWidth = 64;
    const elementHeight = 64;
    const maxX = containerRect.width - elementWidth;
    const maxY = containerRect.height - elementHeight;
    
    const clampedX = Math.max(0, Math.min(newX, maxX));
    const clampedY = Math.max(0, Math.min(newY, maxY));
    
    onPositionChange(id, { x: clampedX, y: clampedY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  });

  return {
    elementRef,
    isDragging,
    handleMouseDown,
    elementStyle: isAbsolutePositioned ? {
      position: 'absolute',
      left: `${safePosition.x}px`,
      top: `${safePosition.y}px`,
      cursor: isDragging ? 'grabbing' : 'grab',
      zIndex: isDragging ? 1000 : 1,
    } : {
      cursor: 'pointer',
      position: 'relative',
    }
  };
};