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

  // Hour markers (larger squares at 12, 3, 6, 9)
  const hourMarkers = [0, 3, 6, 9].map((i) => {
    const angle = (i * 30) - 90;
    const size = 10;
    const radius = 90;
    const center = 110;
    const x = center + radius * Math.cos(angle * Math.PI / 180) - size / 2;
    const y = center + radius * Math.sin(angle * Math.PI / 180) - size / 2;

    return (
      <rect
        key={i}
        x={x}
        y={y}
        width={size}
        height={size}
        className="hour-marker main"
      />
    );
  });

  // Minute markers (squares every 5 minutes, same size as hour markers)
  const minuteMarkers = Array.from({ length: 60 }, (_, i) => {
    if (i % 5 !== 0) return null; // Only show 5-minute marks
    const angle = (i * 6) - 90;
    const size = 10;
    const radius = 90;
    const center = 110;
    const x = center + radius * Math.cos(angle * Math.PI / 180) - size / 2;
    const y = center + radius * Math.sin(angle * Math.PI / 180) - size / 2;

    return (
      <rect
        key={i}
        x={x}
        y={y}
        width={size}
        height={size}
        className="minute-marker"
      />
    );
  }).filter(Boolean);

  // Pixelated clock hands (using a series of squares)
  const createPixelatedHand = (angle, length, className, pixelSize) => {
    const segments = Math.floor(length / pixelSize);
    const hand = [];
    const center = 110;
    for (let i = 0; i < segments; i++) {
      const dist = (i + 1) * pixelSize;
      const x = center + dist * Math.cos((angle - 90) * Math.PI / 180) - pixelSize / 2;
      const y = center + dist * Math.sin((angle - 90) * Math.PI / 180) - pixelSize / 2;
      hand.push(
        <rect
          key={`${className}-${i}`}
          x={x}
          y={y}
          width={pixelSize}
          height={pixelSize}
          className={`clock-hand ${className}`}
        />
      );
    }
    return hand;
  };

  return (
    <div className="clock-container">
      <div className="clock-button-group">
        <button 
          className={`window-button program-button ${!showAnalog ? 'active' : ''}`}
          onClick={() => setShowAnalog(false)}
        >
          Digital
        </button>
        <button 
          className={`window-button program-button ${showAnalog ? 'active' : ''}`}
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
            {/* Hour markers */}
            {hourMarkers}
            
            {/* Minute markers (same size as hour markers) */}
            {minuteMarkers}
            
            {/* Pixelated clock hands */}
            {createPixelatedHand(angles.hour, 50, "hour", 6)}
            {createPixelatedHand(angles.minute, 75, "minute", 4)}
            {createPixelatedHand(angles.second, 85, "second", 2)}
            
            {/* Pixelated center square */}
            <rect
              x={110 - 4}
              y={110 - 4}
              width={8}
              height={8}
              className="clock-center"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default Clock;