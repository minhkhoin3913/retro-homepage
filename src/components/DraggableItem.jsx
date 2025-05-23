// src/components/DraggableItem.jsx
import React from 'react';
import { useDragDrop } from '../hooks/useDragDrop';

const DraggableItem = ({ 
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
  const { elementRef, handleMouseDown, elementStyle } = useDragDrop(
    id, position, onPositionChange, onSelect
  );

  const [isDropTarget, setIsDropTarget] = React.useState(false);

  const handleDragOver = (e) => {
    if (!onDrop) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDropTarget(true);
    onDragOver?.(e, id);
  };

  const handleDragLeave = (e) => {
    if (!elementRef.current?.contains(e.relatedTarget)) {
      setIsDropTarget(false);
    }
    onDragLeave?.(e);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDropTarget(false);
    
    const draggedIconId = e.dataTransfer.getData('text/plain');
    if (draggedIconId && draggedIconId !== id && onDrop) {
      onDrop(draggedIconId, id);
    }
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', id);
    onDragStart?.(e, id);
  };

  const itemProps = {
    ref: elementRef,
    className: `${className} ${isSelected ? 'selected' : ''} ${isDropTarget ? 'drop-target' : ''}`,
    style: elementStyle,
    onMouseDown: handleMouseDown,
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
          onError={(e) => {
            if (e.target.src !== defaultIcon) {
              e.target.src = defaultIcon;
            }
          }}
        />
      </div>
      <div className="item-label">{label}</div>
      {children}
    </div>
  );
};

export default DraggableItem;