// src/hooks/useDragDrop.js
import { useState, useRef, useEffect, useCallback } from 'react';

export const useDragDrop = (id, position, onPositionChange, onSelect) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const elementRef = useRef(null);
  const lastPositionRef = useRef(null);
  const requestRef = useRef(null);

  // Handle cases where position might be undefined (e.g., grid layout)
  const safePosition = position || { x: 0, y: 0 };
  const isAbsolutePositioned = position !== null && position !== undefined;

  // Memoize handlers for better performance
  const handleMouseDown = useCallback((e) => {
    // Call select handler if provided
    onSelect?.(id);
    
    // Prevent dragging on double-click or for non-absolute positioned items
    if (e.detail === 2 || !isAbsolutePositioned) return;
    
    setIsDragging(true);
    const rect = elementRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    
    e.preventDefault();
  }, [id, isAbsolutePositioned, onSelect]);

  // Touch event handlers
  const handleTouchStart = useCallback((e) => {
    // Call select handler if provided
    onSelect?.(id);
    
    // Only enable dragging for absolutely positioned items
    if (!isAbsolutePositioned) return;
    
    // Check if touch is on title bar for windows
    const target = e.target;
    const isTitleBar = target.closest('.window-title-bar');
    
    // Only allow dragging from title bar for windows
    if (elementRef.current.classList.contains('windows-window') && !isTitleBar) {
      return;
    }
    
    setIsDragging(true);
    const rect = elementRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    setDragOffset({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    });
    
    e.preventDefault();
  }, [id, isAbsolutePositioned, onSelect]);

  // Use requestAnimationFrame for smoother dragging
  const updatePosition = useCallback((clientX, clientY) => {
    if (!isDragging || !isAbsolutePositioned || !elementRef.current) return;
    
    // Get container (desktop or folder content)
    const container = elementRef.current.closest('.desktop') || 
                      elementRef.current.closest('.folder-content');
    
    if (!container) return;
    
    const containerRect = container.getBoundingClientRect();
    const newX = clientX - containerRect.left - dragOffset.x;
    const newY = clientY - containerRect.top - dragOffset.y;
    
    // Use different bounds for windows vs icons
    const isWindow = elementRef.current.classList.contains('windows-window');
    const elementWidth = isWindow ? elementRef.current.offsetWidth : 64;
    const elementHeight = isWindow ? elementRef.current.offsetHeight : 64;
    
    // Calculate bounds with padding
    const EDGE_PADDING = 5;
    const maxX = containerRect.width - elementWidth + EDGE_PADDING;
    const maxY = containerRect.height - elementHeight + EDGE_PADDING;
    
    // Apply bounds with minimum position constraints
    const clampedX = Math.max(-EDGE_PADDING, Math.min(newX, maxX));
    const clampedY = Math.max(-EDGE_PADDING, Math.min(newY, maxY));
    
    // Avoid unnecessary updates
    const newPosition = { x: clampedX, y: clampedY };
    if (
      !lastPositionRef.current || 
      Math.abs(lastPositionRef.current.x - newPosition.x) > 1 ||
      Math.abs(lastPositionRef.current.y - newPosition.y) > 1
    ) {
      lastPositionRef.current = newPosition;
      onPositionChange(id, newPosition);
    }
  }, [id, isDragging, isAbsolutePositioned, dragOffset, onPositionChange]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    
    // Cancel any pending animation frame
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
    
    // Schedule position update on next animation frame
    requestRef.current = requestAnimationFrame(() => {
      updatePosition(e.clientX, e.clientY);
    });
  }, [isDragging, updatePosition]);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;
    
    // Cancel any pending animation frame
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
    
    const touch = e.touches[0];
    
    // Schedule position update on next animation frame
    requestRef.current = requestAnimationFrame(() => {
      updatePosition(touch.clientX, touch.clientY);
    });
    
    e.preventDefault(); // Prevent scrolling while dragging
  }, [isDragging, updatePosition]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    
    // Cancel any pending animation frame
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = null;
    }
  }, []);

  // Set up and clean up event listeners
  useEffect(() => {
    if (isDragging) {
      // Mouse events
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleDragEnd);
      
      // Touch events
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleDragEnd);
      document.addEventListener('touchcancel', handleDragEnd);
      
      return () => {
        // Remove mouse events
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleDragEnd);
        
        // Remove touch events
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleDragEnd);
        document.removeEventListener('touchcancel', handleDragEnd);
        
        // Cancel any pending animation frame
        if (requestRef.current) {
          cancelAnimationFrame(requestRef.current);
          requestRef.current = null;
        }
      };
    }
  }, [isDragging, handleMouseMove, handleTouchMove, handleDragEnd]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return {
    elementRef,
    isDragging,
    handleMouseDown,
    handleTouchStart,
    elementStyle: isAbsolutePositioned ? {
      position: 'absolute',
      left: `${safePosition.x}px`,
      top: `${safePosition.y}px`,
      cursor: isDragging ? 'grabbing' : 'pointer',
      zIndex: isDragging ? 1000 : 1,
    } : {
      cursor: 'pointer',
      position: 'relative',
    }
  };
};