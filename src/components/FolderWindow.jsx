// src/components/FolderWindow.jsx
import Icon from './Icon';
import Folder from './Folder';
import "../css/variables.css"
import "../css/base.css"
import "../css/components.css"
import '../css/FolderWindow.css';

const FolderWindow = ({ 
  folderId, 
  folderData, 
  onIconDoubleClick, 
  onFolderDoubleClick,
  onIconSelect, 
  onFolderSelect,
  selectedItem,
  onMoveIcon,
}) => {
  const handleItemDoubleClick = (item) => {
    if (item.type === 'folder') {
      onFolderDoubleClick(item.id, item.label);
    } else {
      onIconDoubleClick(item.id, item.label);
    }
  };

  const handleDrop = (draggedIconId, targetFolderId) => {
    if (onMoveIcon) {
      onMoveIcon(draggedIconId, folderId, targetFolderId);
    }
  };

  const handleDragStart = (e, itemId) => {
    e.dataTransfer.setData('text/plain', itemId);
  };

  return (
    <div className="folder-window">
      <div className="folder-content-grid">
        {folderData.contents.map(item => {
          if (item.type === 'folder') {
            return (
              <div key={item.id} className="grid-item">
                <Folder
                  id={item.id}
                  label={item.label}
                  iconSrc={item.iconSrc}
                  onDoubleClick={() => handleItemDoubleClick(item)}
                  isSelected={selectedItem === item.id}
                  onSelect={onFolderSelect}
                  onDrop={handleDrop}
                />
              </div>
            );
          } else {
            return (
              <div
                key={item.id}
                className="grid-item"
                draggable
                onDragStart={(e) => handleDragStart(e, item.id)}
              >
                <Icon
                  id={item.id}
                  label={item.label}
                  iconSrc={item.iconSrc}
                  onDoubleClick={() => handleItemDoubleClick(item)}
                  isSelected={selectedItem === item.id}
                  onSelect={onIconSelect}
                />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default FolderWindow;