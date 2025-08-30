// src/hooks/useDragDrop.js
import { useState, useRef, useEffect, useCallback } from "react";
// Import the cursor file from assets
import defaultCursor from "../assets/cursors/default_link.cur";

export const useDragDrop = (id, position, onPositionChange, onSelect) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const elementRef = useRef(null);
  const lastPositionRef = useRef(null);
  const requestRef = useRef(null);

  const safePosition = position || { x: 0, y: 0 };
  const isAbsolutePositioned = position !== null && position !== undefined;

  const handleMouseDown = useCallback(
    (e) => {
      onSelect?.(id);
      if (e.detail === 2 || !isAbsolutePositioned) return;

      setIsDragging(true);
      const rect = elementRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      e.preventDefault();
    },
    [id, isAbsolutePositioned, onSelect]
  );

  const handleTouchStart = useCallback(
    (e) => {
      onSelect?.(id);
      if (!isAbsolutePositioned) return;

      const target = e.target;
      const isTitleBar = target.closest(".window-title-bar");

      if (
        elementRef.current.classList.contains("windows-window") &&
        !isTitleBar
      ) {
        return;
      }

      setIsDragging(true);
      const rect = elementRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      setDragOffset({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      });
      e.preventDefault();
    },
    [id, isAbsolutePositioned, onSelect]
  );

  const updatePosition = useCallback(
    (clientX, clientY) => {
      if (!isDragging || !isAbsolutePositioned || !elementRef.current) return;

      const container =
        elementRef.current.closest(".desktop") ||
        elementRef.current.closest(".folder-content");
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const newX = clientX - containerRect.left - dragOffset.x;
      const newY = clientY - containerRect.top - dragOffset.y;

      const isWindow = elementRef.current.classList.contains("windows-window");
      const elementWidth = isWindow ? elementRef.current.offsetWidth : 64;
      const elementHeight = isWindow ? elementRef.current.offsetHeight : 64;

      const EDGE_PADDING = 5;
      const maxX = containerRect.width - elementWidth + EDGE_PADDING;
      const maxY = containerRect.height - elementHeight + EDGE_PADDING;

      const clampedX = Math.max(-EDGE_PADDING, Math.min(newX, maxX));
      const clampedY = Math.max(-EDGE_PADDING, Math.min(newY, maxY));

      const newPosition = { x: clampedX, y: clampedY };
      if (
        !lastPositionRef.current ||
        Math.abs(lastPositionRef.current.x - newPosition.x) > 1 ||
        Math.abs(lastPositionRef.current.y - newPosition.y) > 1
      ) {
        lastPositionRef.current = newPosition;
        onPositionChange(id, newPosition);
      }
    },
    [id, isDragging, isAbsolutePositioned, dragOffset, onPositionChange]
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging) return;
      if (requestRef.current) cancelAnimationFrame(requestRef.current);

      requestRef.current = requestAnimationFrame(() => {
        updatePosition(e.clientX, e.clientY);
      });
    },
    [isDragging, updatePosition]
  );

  const handleTouchMove = useCallback(
    (e) => {
      if (!isDragging) return;
      if (requestRef.current) cancelAnimationFrame(requestRef.current);

      const touch = e.touches[0];
      requestRef.current = requestAnimationFrame(() => {
        updatePosition(touch.clientX, touch.clientY);
      });

      e.preventDefault();
    },
    [isDragging, updatePosition]
  );

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleDragEnd);
      document.addEventListener("touchmove", handleTouchMove, { passive: false });
      document.addEventListener("touchend", handleDragEnd);
      document.addEventListener("touchcancel", handleDragEnd);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleDragEnd);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleDragEnd);
        document.removeEventListener("touchcancel", handleDragEnd);

        if (requestRef.current) {
          cancelAnimationFrame(requestRef.current);
          requestRef.current = null;
        }
      };
    }
  }, [isDragging, handleMouseMove, handleTouchMove, handleDragEnd]);

  useEffect(() => {
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return {
    elementRef,
    isDragging,
    handleMouseDown,
    handleTouchStart,
    elementStyle: isAbsolutePositioned
      ? {
          position: "absolute",
          left: `${safePosition.x}px`,
          top: `${safePosition.y}px`,
          cursor: `url(${defaultCursor}), pointer`,
          zIndex: isDragging ? 1000 : 1,
        }
      : {
          cursor: "pointer",
          position: "relative",
        },
  };
};
