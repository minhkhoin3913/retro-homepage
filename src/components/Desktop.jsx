
// src/components/Desktop.jsx
import React, { useState, useEffect } from 'react';
import Icon from './Icon';
import Window from './Window';
import '../css/Desktop.css';

const desktopIcons = [
  { 
    id: 'about', 
    label: 'About Me',
    iconSrc: 'src/assets/icons/PROGM009.png' // Custom icon path
  },
  { 
    id: 'projects', 
    label: 'Projects',
    iconSrc: 'src/assets/icons/WINFI001.png' // Custom icon path
  },
  { 
    id: 'contact', 
    label: 'Contact',
    iconSrc: 'src/assets/icons/PROGM026.png' // Custom icon path
  },
  { 
    id: 'welcome', 
    label: 'Welcome'
    // No iconSrc specified - will use default placeholder
  },
];

const Desktop = () => {
  const [openWindows, setOpenWindows] = useState([]);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [focusedWindow, setFocusedWindow] = useState(null);
  const [nextZIndex, setNextZIndex] = useState(1000);
  
  // Initialize icon positions
  const [iconPositions, setIconPositions] = useState(() => {
    const initialPositions = {};
    desktopIcons.forEach((icon, index) => {
      initialPositions[icon.id] = {
        x: 16, // Start from left edge with padding
        y: 16 + (index * 96) // Stack vertically with spacing
      };
    });
    return initialPositions;
  });

  // State to track if startup sound should be played
  const [shouldPlayStartup, setShouldPlayStartup] = useState(true);

  // Play startup sound after user interaction
  useEffect(() => {
    const playStartupSound = () => {
      // Try to play the startup sound
      const audio = new Audio('src/assets/sounds/startup.wav');
      audio.volume = 0.5;
      
      audio.play().then(() => {
        setShouldPlayStartup(false); // Sound played successfully
      }).catch(error => {
        console.log('Startup sound could not be played:', error);
      });
    };

    // Function to handle the first user interaction
    const handleFirstInteraction = () => {
      if (shouldPlayStartup) {
        playStartupSound();
      }
      // Remove the listeners after first interaction
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };

    // Add event listeners for user interaction
    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);

    // Cleanup function
    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [shouldPlayStartup]);

  // Function to render window content based on window ID
  const renderWindowContent = (windowId, windowTitle) => {
    switch (windowId) {
      case 'about':
        return (
          <div>
            <h3>About Me</h3>
            <p>Welcome to my retro desktop portfolio!</p>
            <p>I'm a developer who loves creating nostalgic interfaces that remind us of the classic computing era.</p>
            <p>This desktop interface mimics the look and feel of early graphical operating systems.</p>
          </div>
        );
      case 'projects':
        return (
          <div>
            <h3>My Projects</h3>
            <ul>
              <li><strong>Retro Desktop:</strong> This nostalgic desktop interface</li>
              <br></br>
              <li><strong>Classic Games:</strong> Recreation of vintage computer games</li>
              <br></br>
              <li><strong>Pixel Art Tool:</strong> Drawing application with retro aesthetics</li>
              <br></br>
              <li><strong>Terminal Emulator:</strong> Web-based command line interface</li>
            </ul>
          </div>
        );
      case 'contact':
        return (
          <div>
            <h3>Contact Information</h3>
            <p><strong>Email:</strong> nguyenminhkhoi3913@gmail.com</p>
            <p><strong>GitHub:</strong> github.com/minhkhoin3913</p>
            <p><strong>Portfolio:</strong> www.retrodesktop.com</p>
            <br />
            <p>Feel free to reach out if you'd like to collaborate on retro-style projects!</p>
          </div>
        );
      case 'welcome':
        return (
          <div>
            <h3>Welcome to Retro Desktop!</h3>
            <p>👋 Hello and welcome to my nostalgic desktop experience!</p>
            <p><strong>How to use:</strong></p>
            <ul>
              <li>Single-click icons to select them (they'll turn blue)</li>
              <li>Double-click icons to open windows</li>
              <li>Drag icons around to rearrange them</li>
              <li>Drag windows by their title bar to move them</li>
              <li>Click the × button to close windows</li>
            </ul>
            <p>Enjoy exploring this retro interface! 🖥️</p>
          </div>
        );
      default:
        return (
          <div>
            <h3>{windowTitle}</h3>
            <p>This is the content for {windowTitle}.</p>
            <p>You can customize this content by editing the renderWindowContent function in Desktop.jsx</p>
          </div>
        );
    }
  };

  const handleIconDoubleClick = (id, label) => {
    // Check if window is already open
    const existingWindow = openWindows.find(win => win.id === id);
    if (existingWindow) {
      // Focus existing window
      setFocusedWindow(id);
      return;
    }
    
    // Calculate initial position with offset for multiple windows
    const offset = openWindows.length * 30;
    const newWindow = { 
      id, 
      title: label,
      initialPosition: { x: 100 + offset, y: 100 + offset },
      zIndex: nextZIndex
    };
    
    setOpenWindows([...openWindows, newWindow]);
    setFocusedWindow(id);
    setNextZIndex(nextZIndex + 1);
  };

  const handleCloseWindow = (id) => {
    setOpenWindows(openWindows.filter(win => win.id !== id));
    if (focusedWindow === id) {
      // Focus the topmost remaining window
      const remainingWindows = openWindows.filter(win => win.id !== id);
      if (remainingWindows.length > 0) {
        const topWindow = remainingWindows.reduce((prev, current) => 
          (prev.zIndex > current.zIndex) ? prev : current
        );
        setFocusedWindow(topWindow.id);
      } else {
        setFocusedWindow(null);
      }
    }
  };

  const handleWindowFocus = (id) => {
    if (focusedWindow !== id) {
      setFocusedWindow(id);
      // Update z-index of the focused window
      setOpenWindows(windows => 
        windows.map(win => 
          win.id === id 
            ? { ...win, zIndex: nextZIndex }
            : win
        )
      );
      setNextZIndex(nextZIndex + 1);
    }
  };

  const handleIconPositionChange = (id, newPosition) => {
    setIconPositions(prev => ({
      ...prev,
      [id]: newPosition
    }));
  };

  const handleIconSelect = (id) => {
    setSelectedIcon(id);
  };

  const handleDesktopClick = (e) => {
    // Deselect icon if clicking on empty desktop area
    if (e.target === e.currentTarget) {
      setSelectedIcon(null);
      setFocusedWindow(null);
    }
  };

  return (
    <div className="desktop" onClick={handleDesktopClick}>
      {/* Render Icons */}
      {desktopIcons.map(icon => (
        <Icon
          key={icon.id}
          id={icon.id}
          label={icon.label}
          iconSrc={icon.iconSrc}
          position={iconPositions[icon.id]}
          onPositionChange={handleIconPositionChange}
          onDoubleClick={() => handleIconDoubleClick(icon.id, icon.label)}
          isSelected={selectedIcon === icon.id}
          onSelect={handleIconSelect}
        />
      ))}

      {/* Render Open Windows */}
      {openWindows.map(win => (
        <Window
          key={win.id}
          id={win.id}
          title={win.title}
          initialPosition={win.initialPosition}
          zIndex={win.zIndex}
          onClose={handleCloseWindow}
          onFocus={handleWindowFocus}
        >
          {renderWindowContent(win.id, win.title)}
        </Window>
      ))}
    </div>
  );
};

export default Desktop;