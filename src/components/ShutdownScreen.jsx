import { useState, useEffect } from "react";
import "../css/variables.css";
import "../css/base.css";
import "../css/components.css";
import "../css/LoadingScreen.css";
import startupCard from "../assets/images/startup-card.png";

const ShutdownScreen = () => {
  // Stage 0: Loading screen, Stage 1: Black screen transition, Stage 2: Shutdown sequence
  const [stage, setStage] = useState(0);
  const [displayedLines] = useState([
    "You can now close this browser tab ",
  ]);

  // Start with loading screen, then transition to black screen, then shutdown sequence
  useEffect(() => {
    // Start with loading screen (stage 0)
    setStage(0);
    
    // Wait 2 seconds on loading screen
    setTimeout(() => {
      // Transition to black screen (stage 1)
      setStage(1);
      
      // Wait 1.5 seconds on black screen
      setTimeout(() => {
        // Switch to shutdown sequence (stage 2)
        setStage(2);
      }, 1500);
    }, 10000);
  }, []);

  // Loading screen (stage 0)
  if (stage === 0) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="startup-card-container">
            <img src={startupCard} alt="Startup Card" className="startup-card" />
          </div>
          <div className="loading-status">
            <p className="loading-text">Shutting down...</p>
          </div>
        </div>
      </div>
    );
  }
  
  // Black screen transition (stage 1)
  if (stage === 1) {
    return (
      <div className="loading-screen boot-mode">
        <div className="boot-sequence">
        </div>
      </div>
    );
  }

  // Shutdown sequence screen (stage 2)
  return (
    <div className="loading-screen boot-mode">
      <div className="boot-sequence">
        {displayedLines.map((line, index) => (
          <div key={index} className="boot-line">
            {line}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShutdownScreen; 