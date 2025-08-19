import React, { useEffect } from 'react';
import './Welcome.css';
import welcomeAudio from './welcome.mp3';

const Welcome = () => {
  useEffect(() => {
    const audio = new Audio(welcomeAudio);
    audio.play().catch(error => {
      console.error('Error playing audio:', error);
    });

    // Cleanup function to stop audio when component unmounts
    return () => {
      audio.pause();
      audio.currentTime = 0; // Reset to start for next play
    };
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="welcome-container">
      <h2 className="welcome-title">Welcome to Retro Desktop!</h2>
      <p>Hello and welcome to my nostalgic desktop experience!</p>
      <h3 className="usage-title">How to use:</h3>
      <ul className="usage-list">
        <li>Single-click icons to select them (they'll turn blue)</li>
        <li>Double-click icons to open windows</li>
        <li>Double-click folders to browse their contents</li>
        <li>Drag icons around to rearrange them</li>
        <li>Drag icons onto folders to move them inside</li>
        <li>Drag windows by their title bar to move them</li>
        <li>Click the × button to close windows</li>
        <li>Click the • button to maximize windows</li>
        <li>Click the • button again to restore maximized windows</li>
      </ul>
      <p className="closing-text">Enjoy exploring this retro interface!</p>
    </div>
  );
};

export default Welcome;