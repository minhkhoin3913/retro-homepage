// src/utilities/clock/Clock.jsx
import React, { useState, useEffect } from 'react';
import "../../css/variables.css";
import "../../css/base.css";
import "../../css/components.css";
import "./Clock.css";

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [showAnalog, setShowAnalog] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // Calculate angles for analog clock hands
  const getHandAngles = (date) => {
    const hours = date.getHours() % 12;
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return {
      hour: (hours * 30) + (minutes * 0.5), // 30 degrees per hour + minute adjustment
      minute: minutes * 6, // 6 degrees per minute
      second: seconds * 6  // 6 degrees per second
    };
  };

  const angles = getHandAngles(time);

  // Generate hour markers (12, 3, 6, 9)
  const hourMarkers = [0, 3, 6, 9].map((i) => {
    const angle = (i * 30) - 90; // Start from 12 o'clock
    const size = 10; // Square size
    const radius = 90;
    const x = 110 + radius * Math.cos(angle * Math.PI / 180) - size/2;
    const y = 110 + radius * Math.sin(angle * Math.PI / 180) - size/2;

    return (
      <rect
        key={i}
        x={x}
        y={y}
        width={size}
        height={size}
        className="hour-marker"
        fill="#000"
      />
    );
  });

  // Generate minute markers (small dots)
  const minuteMarkers = Array.from({ length: 60 }, (_, i) => {
    if (i % 15 === 0) return null; // Skip hour positions (0, 15, 30, 45)
    if (i % 5 !== 0) return null; // Only show 5-minute marks
    const angle = (i * 6) - 90;
    const radius = 90;
    const dotSize = 4;
    const x = 110 + radius * Math.cos(angle * Math.PI / 180);
    const y = 110 + radius * Math.sin(angle * Math.PI / 180);

    return (
      <circle
        key={i}
        cx={x}
        cy={y}
        r={dotSize}
        className="minute-marker"
        fill="#000"
      />
    );
  }).filter(Boolean);

  return (
    <div className="clock-container">
      <div className="clock-button-group">
        <button 
          className={`window-button ${!showAnalog ? 'active' : ''}`}
          onClick={() => setShowAnalog(false)}
        >
          Digital
        </button>
        <button 
          className={`window-button ${showAnalog ? 'active' : ''}`}
          onClick={() => setShowAnalog(true)}
        >
          Analog
        </button>
      </div>

      {!showAnalog ? (
        <div className="digital-display">
          {formatTime(time)}
        </div>
      ) : (
        <div className="analog-clock">
          <svg width="220" height="220" viewBox="0 0 220 220">
            {/* Clock face */}
            
            {/* Hour markers (squares) */}
            {hourMarkers}
            
            {/* Minute markers (dots) */}
            {minuteMarkers}
            
            {/* Hour hand */}
            <line
              x1="110"
              y1="110"
              x2={110 + 50 * Math.cos((angles.hour - 90) * Math.PI / 180)}
              y2={110 + 50 * Math.sin((angles.hour - 90) * Math.PI / 180)}
              className="clock-hand hour"
            />
            
            {/* Minute hand */}
            <line
              x1="110"
              y1="110"
              x2={110 + 75 * Math.cos((angles.minute - 90) * Math.PI / 180)}
              y2={110 + 75 * Math.sin((angles.minute - 90) * Math.PI / 180)}
              className="clock-hand minute"
            />
            
            {/* Second hand */}
            <line
              x1="110"
              y1="110"
              x2={110 + 85 * Math.cos((angles.second - 90) * Math.PI / 180)}
              y2={110 + 85 * Math.sin((angles.second - 90) * Math.PI / 180)}
              className="clock-hand second"
            />
            
            {/* Center dot */}
            <circle
              cx="110"
              cy="110"
              r="4"
              className="clock-center"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default Clock;