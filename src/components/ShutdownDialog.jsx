import React from 'react';
import DialogWindow from './DialogWindow';
import '../css/ShutdownDialog.css';

const ShutdownDialog = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  const handleOK = () => {
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="shutdown-overlay">
      <DialogWindow
        id="shutdown-dialog"
        title="Shutdown Session"
        onClose={onClose}
        onFocus={() => {}}
        initialPosition={{ x: window.innerWidth / 2 - 200, y: window.innerHeight / 2 - 100 }}
        zIndex={20000}
      >
        <div className="shutdown-dialog-content">
          <p>Do you want to end your session?</p>
          <div className="shutdown-dialog-buttons">
            <button className="window-button program-button" onClick={handleOK}>
              OK
            </button>
            <button className="window-button program-button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </DialogWindow>
    </div>
  );
};

export default ShutdownDialog; 