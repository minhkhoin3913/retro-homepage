// src/components/Taskbar.jsx
import '../css/Taskbar.css';

const Taskbar = ({ minimizedWindows, onRestore }) => {
  if (!minimizedWindows || minimizedWindows.length === 0) {
    return null;
  }

  return (
    <div className="taskbar">
      <div className="taskbar-items">
        {minimizedWindows.map((window) => (
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
    </div>
  );
};

export default Taskbar;