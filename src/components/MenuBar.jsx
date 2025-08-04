import React, { useState, useEffect } from "react";
import "../css/MenuBar.css";
import ShutdownDialog from "./ShutdownDialog";

const MenuBar = ({ visible = true, onShutdown }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showShutdownDialog, setShowShutdownDialog] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    // Use system's locale time format without seconds
    return date.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "numeric",
    });
  };

  const formatDate = (date) => {
    // Format as "Day Month" (e.g., "15 Dec")
    return date.toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
    });
  };

  const handleShutdownClick = () => {
    setShowShutdownDialog(true);
  };

  const handleCloseShutdownDialog = () => {
    setShowShutdownDialog(false);
  };

  return (
    <>
      <div className={`menu-bar ${!visible ? "hidden" : ""}`}>
        <div className="menu-bar-left">
          {/* Left side menu items could go here */}
        </div>
        <div className="menu-bar-center">
          <div className="menu-bar-date" title="Current date">
            {formatDate(currentTime)}
          </div>
          <div className="menu-bar-clock" title="Current time">
            {formatTime(currentTime)}
          </div>
        </div>
        <div className="menu-bar-right">
          <button
            className="menu-bar-s-button"
            title="About Panels"
            onClick={handleShutdownClick}
          >
            i
          </button>
          <button
            className="menu-bar-s-button"
            title="Power"
            onClick={handleShutdownClick}
          >
            (|)
          </button>
        </div>
      </div>
      <ShutdownDialog
        isVisible={showShutdownDialog}
        onClose={handleCloseShutdownDialog}
        onShutdown={onShutdown}
      />
    </>
  );
};

export default MenuBar;
