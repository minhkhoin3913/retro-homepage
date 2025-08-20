import { useState, useEffect } from "react";
import "../css/variables.css";
import "../css/base.css";
import "../css/components.css";
import "../css/LoadingScreen.css";
import startupCard from "../assets/images/startup-card.png";

const LoadingScreen = ({ progress: initialProgress, onSkip }) => {
  // Stage 0: Boot sequence, Stage 1: Black screen transition, Stage 2: Loading screen
  const [stage, setStage] = useState(0);
  const [displayedLines, setDisplayedLines] = useState([
    "V8 JavaScript Engine v12.1, An Energy Star Ally",
    "Copyright (C) 1984-2025, NMK Technologies, Inc. ",
    "",
    "⠀",
    "",
    "",
    "Dependencies Check: ",
  ]);
  const [showCursor, setShowCursor] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showSkipMessage, setShowSkipMessage] = useState(false);
  const [lastTap, setLastTap] = useState(0);

  // Function to hide cursor
  const hideCursor = () => {
    document.body.style.cursor = 'none';
  };

  // Function to restore cursor
  const restoreCursor = () => {
    document.body.style.cursor = 'auto';
  };

  // Handle ESC key press, double-tap to skip loading, and cursor hiding
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        onSkip?.();
      }
    };

    const handleTouchStart = () => {
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTap;
      
      if (tapLength < 500 && tapLength > 0) {
        // Double tap detected
        onSkip?.();
      }
      setLastTap(currentTime);
    };

    // Hide cursor when component mounts
    hideCursor();

    // Add event listeners after a short delay to allow the component to mount
    const timer = setTimeout(() => {
      setShowSkipMessage(true);
      document.addEventListener("keydown", handleKeyPress);
      document.addEventListener("touchstart", handleTouchStart);
    }, 1000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("touchstart", handleTouchStart);
      // Restore cursor when component unmounts
      restoreCursor();
    };
  }, [onSkip, lastTap]);

  // Get device hardware information
  useEffect(() => {
    try {
      const platform = navigator.platform || "Unknown Platform";
      const userAgent = navigator.userAgent;
      const cpuCores = navigator.hardwareConcurrency || "Unknown";
      
      // Try to detect CPU information from user agent
      let cpuInfo = "Unknown CPU";
      
      if (userAgent.includes("Win")) {
        // For Windows, try to extract CPU info
        const cpuMatch = userAgent.match(/(?:Intel|AMD).+?(?=;|\))/i);
        cpuInfo = cpuMatch ? cpuMatch[0] : "x86 Compatible CPU";
      } else if (userAgent.includes("Mac")) {
        // For Mac
        if (userAgent.includes("Intel")) {
          cpuInfo = "Intel CPU";
        } else if (userAgent.includes("Apple")) {
          cpuInfo = "Apple Silicon";
        }
      } else if (userAgent.includes("Linux")) {
        cpuInfo = "Linux CPU";
      } else if (userAgent.includes("Android")) {
        cpuInfo = "ARM CPU";
      } else if (userAgent.includes("iPhone") || userAgent.includes("iPad")) {
        cpuInfo = "Apple CPU";
      }

      // Format as two lines
      const platformLine = `${platform}(TM) Platform`;
      const cpuLine = `${cpuInfo} with ${cpuCores} Cores`;
      
      // Update displayedLines with the hardware information replacing the empty lines
      setDisplayedLines((prev) => {
        const newLines = [...prev];
        newLines[3] = platformLine;
        newLines[4] = cpuLine;
        return newLines;
      });
    } catch {
      // If there's an error, use a fallback message
      setDisplayedLines((prev) => {
        const newLines = [...prev];
        newLines[4] = "FPT Platform (TM)";
        newLines[5] = "570GX CPU @ 1 Core";
        return newLines;
      });
    }
  }, []);

  useEffect(() => {
    // Define all boot sequence lines that will be displayed sequentially
    const bootLines = [
      "  Detecting react ... @19.1.0 ",
      "  Detecting react-dom ... @19.1.0 ",
      "  Detecting vite ... @6.3.5 ",
      "  Detecting vitejs/plugin-react ... @4.4.1 ",
      "  Detecting eslint ... @9.25.0 ",
      "  Detecting gh-pages ... @6.3.0 ",
      "",
      "Starting PANE 97 ... ",
    ];

    // Define delays for each line to mimic 90s PC boot sequence
    const delays = [850, 650, 1200, 750, 900, 550, 1000, 800, 2000];

    // Set up blinking cursor
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    // Display each line with delay
    let timeoutId;
    const displayLines = async () => {
      for (let i = 0; i < bootLines.length; i++) {
        await new Promise((resolve) => {
          timeoutId = setTimeout(resolve, delays[i]);
        });
        
        setDisplayedLines((prev) => [...prev, bootLines[i]]);
      }
      
      await new Promise((resolve) => {
        timeoutId = setTimeout(resolve, 2500);
      });
      
      setStage(1);
      
      await new Promise((resolve) => {
        timeoutId = setTimeout(resolve, 1500);
      });
      
      setProgress(0);
      setStage(2);
    };

    displayLines();

    return () => {
      clearInterval(cursorInterval);
      clearTimeout(timeoutId);
    };
  }, []);

  // Update progress from props when in loading screen stage
  useEffect(() => {
    if (stage === 2) {
      setProgress(initialProgress);
    }
  }, [initialProgress, stage]);

  // Boot sequence screen
  if (stage === 0) {
    return (
      <div className="loading-screen boot-mode">
        <div className="boot-sequence">
          {displayedLines.map((line, index) => (
            <div key={index} className="boot-line">
              {line}
              {index === displayedLines.length - 1 && (
                <span className={`cursor ${showCursor ? "visible" : "hidden"}`}>
                  _
                </span>
              )}
            </div>
          ))}
          {showSkipMessage && (
            <div className="boot-line skip-line">
              Press ESC or double-tap to skip starting sequence
            </div>
          )}
        </div>
      </div>
    );
  }
  
  // Black screen transition
  if (stage === 1) {
    return (
      <div className="loading-screen boot-mode">
        <div className="boot-sequence">
          {showSkipMessage && (
            <div className="boot-line skip-line">
              Press ESC or double-tap to skip starting sequence
            </div>
          )}
        </div>
      </div>
    );
  }

  // Normal loading screen
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="startup-card-container">
          <img src={startupCard} alt="Startup Card" className="startup-card" />
        </div>
        <div className="loading-status">
          <p className="loading-text">Starting up</p>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;