// src/hooks/useDesktop.js
import { useState, useEffect, useMemo, useCallback } from 'react';
import { desktopIcons, desktopFolders } from "../config/programConfig";

export const useDesktop = () => {
  // Create memoized desktop items
  const allDesktopItems = useMemo(() => {
    return [...desktopIcons, ...Object.entries(desktopFolders).map(([folderId, folderData]) => ({
      id: folderId,
      label: folderData.label,
      iconSrc: folderData.iconSrc,
      type: "folder",
    }))];
  }, []);

  // Initialize positions
  const [itemPositions, setItemPositions] = useState(() => {
    const initialPositions = {};
    let leftIconIndex = 0;
    let rightIconIndex = 0;
    
    // Constants for positioning
    const EDGE_PADDING = 24; // Consistent padding from edges
    const ICON_SPACING = 98; // Vertical spacing between icons
    const ICON_WIDTH = 80; // Width of icon from CSS
    const TOP_PADDING = 20; // Exact padding from the top of the menu bar
    
    allDesktopItems.forEach((item) => {
      // Place folders on the right, others on the left
      if (item.type === "folder") {
        initialPositions[item.id] = {
          x: window.innerWidth - ICON_WIDTH - EDGE_PADDING, // Exact icon width + padding
          y: TOP_PADDING + rightIconIndex * ICON_SPACING, // Use rightIconIndex for vertical spacing
        };
        rightIconIndex++;
      } else {
        initialPositions[item.id] = {
          x: EDGE_PADDING,
          y: TOP_PADDING + leftIconIndex * ICON_SPACING,
        };
        leftIconIndex++;
      }
    });
    return initialPositions;
  });

  // Handle window resize to update icon positions
  useEffect(() => {
    const handleResize = () => {
      setItemPositions(prev => {
        const newPositions = { ...prev };
        const EDGE_PADDING = 24;
        const ICON_WIDTH = 80;
        
        // Only update the positions of folder icons on the right side
        allDesktopItems.forEach(item => {
          if (item.type === "folder") {
            newPositions[item.id] = {
              ...newPositions[item.id],
              x: window.innerWidth - ICON_WIDTH - EDGE_PADDING,
            };
          }
        });
        
        return newPositions;
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [allDesktopItems]);

  // Handle item position changes
  const handleItemPositionChange = useCallback((id, newPosition, contextFolderId = null) => {
    if (contextFolderId) {
      console.log(`Position change for item ${id} in folder ${contextFolderId} - handled by CSS Grid`);
    } else {
      setItemPositions(prev => ({
        ...prev,
        [id]: newPosition,
      }));
    }
  }, []);

  return {
    allDesktopItems,
    itemPositions,
    handleItemPositionChange
  };
}; 