import React, { useEffect, useRef, useState } from 'react';
import './Pikachu.css';
import theme1Audio from './theme1.mp3';
import theme2Audio from './theme2.mp3';

const Pikachu = () => {
  const audioRef = useRef(null);
  const [currentTheme, setCurrentTheme] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    
    if (!audio) return;

    const handleEnded = () => {
      // Switch to the next theme
      const nextTheme = currentTheme === 1 ? 2 : 1;
      setCurrentTheme(nextTheme);
      
      // Update the audio source
      audio.src = nextTheme === 1 ? theme1Audio : theme2Audio;
      
      // Play the next theme
      audio.play().catch(error => {
        console.log('Audio autoplay was prevented:', error);
      });
    };

    // Add event listener for when audio ends
    audio.addEventListener('ended', handleEnded);

    // Play the initial audio
    audio.play().catch(error => {
      console.log('Audio autoplay was prevented:', error);
    });

    // Cleanup function
    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, [currentTheme]);

  return (
    <div className="pikachu-container">
      <audio ref={audioRef}>
        <source src={theme1Audio} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <div className="pikachu-content">
        <h2>Pikachu</h2>
        <p className="menu-option">Start Game</p>
        <p className="menu-option">Quit</p>
      </div>
    </div>
  );
};

export default Pikachu; 