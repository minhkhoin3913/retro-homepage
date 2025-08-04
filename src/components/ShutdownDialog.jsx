import React from 'react';
import DialogWindow from './DialogWindow';
import '../css/ShutdownDialog.css';

const ShutdownDialog = ({ isVisible, onClose, onShutdown }) => {
  if (!isVisible) return null;

  const handleOK = () => {
    onClose();
    onShutdown?.();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="shutdown-overlay">
      <DialogWindow
        id="shutdown-dialog"
        title="Exit Session"
        onClose={onClose}
        onFocus={() => {}}
        zIndex={20000}
        centered={true}
      >
        <div className="shutdown-dialog-content">
          <p>Do you want to end your Pane session?</p>
          <div className="shutdown-dialog-buttons">
            <button className="window-button program-button" onClick={handleOK}>
              Yes
            </button>
            <button className="window-button program-button" onClick={handleCancel}>
              No
            </button>
          </div>
        </div>
      </DialogWindow>
    </div>
  );
};

export default ShutdownDialog; 