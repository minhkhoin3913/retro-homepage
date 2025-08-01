import React, { useState, useEffect, useMemo, useCallback } from 'react';
import "../../css/variables.css";
import "../../css/base.css";
import "../../css/components.css";
import "./Clock.css";

// Clock configuration
const CLOCK_CONFIG = {
  UPDATE_INTERVAL: 1000,
  SVG_SIZE: 220,
  CENTER: 110,
  RADIUS: 90,
  MARKER_SIZE: 10,
  HOUR_POSITIONS: [0, 3, 6, 9],
  HANDS: {
    HOUR: { length: 50, pixelSize: 6 },
    MINUTE: { length: 75, pixelSize: 4 },
    SECOND: { length: 85, pixelSize: 2 }
  },
  CENTER_SIZE: 8
};

// Utility functions
const getPosition = (angle, radius, center) => ({
  x: center + radius * Math.cos(angle * Math.PI / 180),
  y: center + radius * Math.sin(angle * Math.PI / 180)
});

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [showAnalog, setShowAnalog] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), CLOCK_CONFIG.UPDATE_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const handleDoubleClick = useCallback(() => setShowAnalog(prev => !prev), []);

  const formatTime = useCallback((date) => 
    date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }), []);

  const angles = useMemo(() => {
    const hours = time.getHours() % 12;
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    
    return {
      hour: (hours * 30) + (minutes * 0.5),
      minute: minutes * 6,
      second: seconds * 6
    };
  }, [time]);

  const markers = useMemo(() => {
    const { CENTER, RADIUS, MARKER_SIZE, HOUR_POSITIONS } = CLOCK_CONFIG;
    const offset = MARKER_SIZE / 2;

    // Hour markers
    const hourMarkers = HOUR_POSITIONS.map(position => {
      const angle = (position * 30) - 90;
      const { x, y } = getPosition(angle, RADIUS, CENTER);
      return (
        <rect
          key={`hour-${position}`}
          x={x - offset}
          y={y - offset}
          width={MARKER_SIZE}
          height={MARKER_SIZE}
          className="hour-marker"
        />
      );
    });

    // Minute markers
    const minuteMarkers = Array.from({ length: 60 }, (_, i) => {
      if (i % 5 !== 0) return null;
      const angle = (i * 6) - 90;
      const { x, y } = getPosition(angle, RADIUS, CENTER);
      return (
        <rect
          key={`minute-${i}`}
          x={x - offset}
          y={y - offset}
          width={MARKER_SIZE}
          height={MARKER_SIZE}
          className="minute-marker"
        />
      );
    }).filter(Boolean);

    return { hourMarkers, minuteMarkers };
  }, []);

  const clockHands = useMemo(() => {
    const { CENTER, HANDS } = CLOCK_CONFIG;
    
    const createHand = (angle, length, className, pixelSize) => {
      const segments = Math.floor(length / pixelSize);
      return Array.from({ length: segments }, (_, i) => {
        const dist = (i + 1) * pixelSize;
        const { x, y } = getPosition(angle - 90, dist, CENTER);
        const offset = pixelSize / 2;
        return (
          <rect
            key={`${className}-${i}`}
            x={x - offset}
            y={y - offset}
            width={pixelSize}
            height={pixelSize}
            className={`clock-hand ${className}`}
          />
        );
      });
    };

    return {
      hour: createHand(angles.hour, HANDS.HOUR.length, "hour", HANDS.HOUR.pixelSize),
      minute: createHand(angles.minute, HANDS.MINUTE.length, "minute", HANDS.MINUTE.pixelSize),
      second: createHand(angles.second, HANDS.SECOND.length, "second", HANDS.SECOND.pixelSize)
    };
  }, [angles]);

  return (
    <div className="clock-container" onDoubleClick={handleDoubleClick}>
      {showAnalog ? (
        <div className="analog-clock">
          <svg width={CLOCK_CONFIG.SVG_SIZE} height={CLOCK_CONFIG.SVG_SIZE} viewBox={`0 0 ${CLOCK_CONFIG.SVG_SIZE} ${CLOCK_CONFIG.SVG_SIZE}`}>
            {markers.hourMarkers}
            {markers.minuteMarkers}
            {clockHands.hour}
            {clockHands.minute}
            {clockHands.second}
            <rect
              x={CLOCK_CONFIG.CENTER - CLOCK_CONFIG.CENTER_SIZE / 2}
              y={CLOCK_CONFIG.CENTER - CLOCK_CONFIG.CENTER_SIZE / 2}
              width={CLOCK_CONFIG.CENTER_SIZE}
              height={CLOCK_CONFIG.CENTER_SIZE}
              className="clock-center"
            />
          </svg>
        </div>
      ) : (
        <div className="digital-display">
          {formatTime(time)}
        </div>
      )}
    </div>
  );
};

export default Clock;