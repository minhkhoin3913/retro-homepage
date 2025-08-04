// src/components/Taskbar.jsx
import '../css/Taskbar.css';

const Taskbar = ({ minimizedWindows, onRestore, isCollapsed, onToggleCollapse }) => {
  // Don't render taskbar if there are no minimized windows
  if (!minimizedWindows || minimizedWindows.length === 0) {
    return null;
  }

  return (
    <div className={`taskbar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="taskbar-items">
        {!isCollapsed && minimizedWindows.map((window) => (
          <button
            key={window.id}
            className="taskbar-item"
            onClick={() => onRestore(window.id)}
            title={`Restore ${window.title}`}
          >
            {window.icon && (
              <img 
                src={window.icon} 
                alt="" 
                className="taskbar-icon"
              />
            )}
          </button>
        ))}
      </div>
      <button
        className="taskbar-collapse-btn"
        onClick={onToggleCollapse}
        title={isCollapsed ? "Expand taskbar" : "Collapse taskbar"}
      >
        {isCollapsed ? ">" : "<"}
      </button>
    </div>
  );
};

export default Taskbar;