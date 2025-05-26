// src/config/programConfig.js

import Clock from "../utilities/Clock/Clock";
import Camera from "../utilities/Camera/Camera";
import Internet from "../utilities/Internet/Internet"; // Add Internet import

// Import your icons
import aboutIcon from "../assets/icons/Microsoft Windows 3 Logo.ico";
import projectsIcon from "../assets/icons/Microsoft Windows 3 File Manager.ico";
import contactIcon from "../assets/icons/Microsoft Windows 3 Phone Dial.ico";
import welcomeIcon from "../assets/icons/Microsoft Windows 3 Read Me.ico";
import folderIcon from "../assets/icons/Microsoft Windows 3 Applications.ico";
import solitaireIcon from "../assets/icons/Microsoft Windows 3 Solitaire.ico";
import minesweeperIcon from "../assets/icons/Microsoft Windows 3 Minesweeper.ico";
import notebookIcon from "../assets/icons/Microsoft Windows 3 Binder.ico";
import calculatorIcon from "../assets/icons/Microsoft Windows 3 Calculator.ico";
import calendarIcon from "../assets/icons/Microsoft Windows 3 Calendar.ico";
import clockIcon from "../assets/icons/Microsoft Windows 3 Clock.ico";
import photoIcon from "../assets/icons/Microsoft Windows 3 Mona Lisa.ico";
import videoIcon from "../assets/icons/Microsoft Windows 3 Media Player.ico";
import newsIcon from "../assets/icons/Microsoft Windows 3 Newspaper.ico";
import globeIcon from "../assets/icons/Microsoft Windows 3 International.ico";
import cameraIcon from "../assets/icons/Microsoft Windows 3 Camera.ico";


// Desktop icons configuration
export const desktopIcons = [
  {
    id: "about",
    label: "About Me",
    iconSrc: aboutIcon,
  },
  {
    id: "projects",
    label: "Projects",
    iconSrc: projectsIcon,
  },
  {
    id: "contact",
    label: "Contact",
    iconSrc: contactIcon,
  },
  {
    id: "welcome",
    label: "Welcome",
    iconSrc: welcomeIcon,
  },
];

// Desktop folders configuration
export const desktopFolders = {
  programs: {
    id: "programs",
    label: "Programs",
    iconSrc: folderIcon,
    contents: [
      {
        id: "calculator",
        label: "Calculator",
        iconSrc: calculatorIcon,
        type: "icon",
      },
      {
        id: "calendar",
        label: "Calendar",
        iconSrc: calendarIcon,
        type: "icon",
      },
      {
        id: "clock",
        label: "Clock",
        iconSrc: clockIcon,
        type: "icon",
      },
      {
        id: "news",
        label: "News",
        iconSrc: newsIcon,
        type: "icon",
      },
      {
        id: "notebook",
        label: "Notebook",
        iconSrc: notebookIcon,
        type: "icon",
      },
      {
        id: "internet",
        label: "Internet",
        iconSrc: globeIcon,
        type: "icon",
      },
      {
        id: "photo",
        label: "Photo",
        iconSrc: photoIcon,
        type: "icon",
      },
      {
        id: "video",
        label: "Media",
        iconSrc: videoIcon,
        type: "icon",
      },
      {
        id: "camera",
        label: "Camera",
        iconSrc: cameraIcon,
        type: "icon",
      },
    ],
  },
  games: {
    id: "games",
    label: "Games",
    iconSrc: folderIcon,
    contents: [
      {
        id: "solitaire",
        label: "Solitaire",
        iconSrc: solitaireIcon,
        type: "icon",
      },
      {
        id: "minesweeper",
        label: "Minesweeper",
        iconSrc: minesweeperIcon,
        type: "icon",
      },
    ],
  },
};


// Window content renderer function
export const renderWindowContent = (windowId, windowTitle) => {
  switch (windowId) {
    case "clock":
      return <Clock />;
    case "camera":
      return <Camera />;
    case "internet": // Add Internet case
      return <Internet />;
    case "about":
      return (
        <div style={{ paddingLeft: '16px', paddingRight: '16px' }}>
          <h2>🌐 About Me</h2>
          <p>
            I'm a detail-oriented front-end developer with a passion for
            <br></br>
            creative problem-solving and continuous learning. <br></br> 
            I stay up to date with the latest trends and technologies in <br></br>
            web design and development.<br></br>
            Outside of coding, I enjoy sketching and diving into <br></br> 
            design literature to further refine my aesthetic and technical skills.
          </p>

          <h2>🔧 Skills</h2>
          <ul>
            <li>
              <strong>HTML5 / CSS3 / JavaScript (ES6+)</strong>
            </li>
            <li>
              <strong>React.js / Next.js</strong>
            </li>
            <li>
              <strong>Version Control (Git / GitHub)</strong>
            </li>
            <li>
              <strong>Responsive Design</strong>
            </li>
            <li>
              <strong>RESTful APIs / JSON</strong>
            </li>
            <li>
              <strong>Webpack / Babel / Vite</strong>
            </li>
            <li>
              <strong>Testing (Jest / React Testing Library)</strong>
            </li>
          </ul>

          <h2>🎓 Education</h2>
          <h3>Bachelor of Software Engineering</h3>
          <p>
            <strong>FPT University</strong> – 2025
          </p>
          <p>
            <strong>Concentration:</strong> Topic on React & NodeJS
          </p>
        </div>
      );
    case "projects":
      return (
        <div style={{ paddingLeft: '16px', paddingRight: '16px' }}>
          <h2>My Projects</h2>
          <ul>
            <li>
              <strong>Retro Desktop:</strong> This nostalgic desktop interface
            </li>
            <br></br>
            <li>
              <strong>Classic Games:</strong> Recreation of vintage computer
              programs
            </li>
            <br></br>
            <li>
              <strong>Pixel Art Tool:</strong> Drawing application with retro
              aesthetics
            </li>
            <br></br>
            <li>
              <strong>Terminal Emulator:</strong> Web-based command line
              interface
            </li>
          </ul>
        </div>
      );
    case "contact":
      return (
        <div style={{ paddingLeft: '16px', paddingRight: '16px' }}>
          <h2>Contact Information</h2>
          <p>
            <strong>Phone:</strong> (+84) 35710 6894
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:your.email@example.com">
              nguyenminhkhoi3913@gmail.com
            </a>
          </p>
          <p>
            <strong>Facebook:</strong>{" "}
            <a href="https://facebook.com/khonloi13" target="_blank">
              facebook.com/khonloi13
            </a>
          </p>
          <p>
            <strong>GitHub:</strong>{" "}
            <a href="https://github.com/minhkhoin3913" target="_blank">
              github.com/minhkhoin3913
            </a>
          </p>
        </div>
      );
    case "welcome":
      return (
        <div style={{ paddingLeft: '16px', paddingRight: '16px' }}>
          <h2>Welcome to Retro Desktop!</h2>
          <p>Hello and welcome to my nostalgic desktop experience!</p>
          <h3>How to use:</h3>
          <ul>
            <li>Single-click icons to select them (they'll turn blue)</li>
            <li>Double-click icons to open windows</li>
            <li>Double-click folders to browse their contents</li>
            <li>Drag icons around to rearrange them</li>
            <li>Drag icons onto folders to move them inside</li>
            <li>Drag windows by their title bar to move them</li>
            <li>Click the × button to close windows</li>
          </ul>
          <p>Enjoy exploring this retro interface!</p>
        </div>
      );
    // Game content
    case "solitaire":
      return (
        <div>
          <h2>Solitaire</h2>
          <p>Classic card game coming soon...</p>
          <p>This would be where the Solitaire game interface would load.</p>
        </div>
      );
    case "minesweeper":
      return (
        <div>
          <h2>Minesweeper</h2>
          <p>Classic mine-finding game coming soon...</p>
          <p>This would be where the Minesweeper game interface would load.</p>
        </div>
      );
    case "tetris":
      return (
        <div>
          <h2>Tetris</h2>
          <p>Classic block-stacking game coming soon...</p>
          <p>This would be where the Tetris game interface would load.</p>
        </div>
      );
    // Media content
    case "music_player":
      return (
        <div>
          <h2>Music Player</h2>
          <p>🎵 Classic Music Player Interface</p>
          <div
            style={{
              border: "2px inset #c0c0c0",
              padding: "10px",
              margin: "10px 0",
            }}
          >
            <p>
              <strong>Now Playing:</strong> Retro Synthwave Mix
            </p>
            <div style={{ display: "flex", gap: "10px", margin: "10px 0" }}>
              <button>⏮️</button>
              <button>⏯️</button>
              <button>⏭️</button>
              <button>🔊</button>
            </div>
            <div
              style={{
                background: "#000",
                color: "#0f0",
                padding: "5px",
                fontFamily: "monospace",
              }}
            >
              ♪♫♪ VISUALIZER WOULD GO HERE ♪♫♪
            </div>
          </div>
        </div>
      );
    default:
      return (
        <div>
          <h3>{windowTitle}</h3>
          <p>This is the content for {windowTitle}.</p>
          <p>
            You can customize this content by editing the renderWindowContent
            function in desktopConfig.js
          </p>
        </div>
      );
  }
};