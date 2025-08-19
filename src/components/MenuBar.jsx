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
    // Use 24-hour time format
    return date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatDate = (date) => {
    // Format as "Day Month" with ordinal suffix (e.g., "6th August")
    const day = date.getDate();
    const month = date.toLocaleDateString(undefined, { month: "long" });
    
    return `${day} ${month}`;
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
          <div className="menu-bar-datetime" title="Current date and time">
            {formatDate(currentTime)} &nbsp; {formatTime(currentTime)}
          </div>
        </div>
        <div className="menu-bar-right">
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
