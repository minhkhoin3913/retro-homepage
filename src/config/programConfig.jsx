// src/config/programConfig.js

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
        position: { x: 16, y: 16 },
      },
      {
        id: "calendar",
        label: "Calendar",
        iconSrc: calendarIcon,
        type: "icon",
        position: { x: 114, y: 16 },
      },
      {
        id: "clock",
        label: "Clock",
        iconSrc: clockIcon,
        type: "icon",
        position: { x: 212, y: 16 },
      },
      {
        id: "news",
        label: "News",
        iconSrc: newsIcon,
        type: "icon",
        position: { x: 16, y: 114 },
      },
      {
        id: "notebook",
        label: "Notebook",
        iconSrc: notebookIcon,
        type: "icon",
        position: { x: 114, y: 114 },
      },
      {
        id: "internet",
        label: "Internet",
        iconSrc: globeIcon,
        type: "icon",
        position: { x: 212, y: 114 },
      },
      {
        id: "photo",
        label: "Photo",
        iconSrc: photoIcon,
        type: "icon",
        position: { x: 16, y: 212 },
      },
      {
        id: "video",
        label: "Media",
        iconSrc: videoIcon,
        type: "icon",
        position: { x: 114, y: 212 },
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
        position: { x: 16, y: 16 },
      },
      {
        id: "minesweeper",
        label: "Minesweeper",
        iconSrc: minesweeperIcon,
        type: "icon",
        position: { x: 114, y: 16 },
      },
    ],
  },
};

// Window content renderer function
export const renderWindowContent = (windowId, windowTitle) => {
  switch (windowId) {
    case "about":
      return (
        <div>
          <h3>
            SerenOS (TM) <br></br> Version 0.2.1
          </h3>
          <h3>Copyright © KhonLoi, 2025</h3>

          <p>Welcome to my retro desktop portfolio!</p>
          <p>
            I'm a developer who loves creating nostalgic interfaces that remind
            us of the classic computing era.
          </p>
          <p>
            This desktop interface mimics the look and feel of early graphical
            operating systems.
          </p>
        </div>
      );
    case "projects":
      return (
        <div>
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
        <div>
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
        <div>
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
    // Document content
    case "resume":
      return (
        <div>
          <h2>Resume.txt</h2>
          <pre style={{ fontFamily: "monospace", fontSize: "12px" }}>
            {`JOHN DOE
Software Developer
==================

EXPERIENCE:
-----------
• Senior Developer at Tech Corp (2020-Present)
• Junior Developer at StartUp Inc (2018-2020)
• Intern at Local Business (2017-2018)

SKILLS:
-------
• JavaScript, React, Node.js
• Python, Java, C++
• Database Design
• System Architecture

EDUCATION:
----------
• B.S. Computer Science, University (2017)
• Various online certifications`}
          </pre>
        </div>
      );
    case "notes":
      return (
        <div>
          <h2>Notes.txt</h2>
          <pre
            style={{
              fontFamily: "monospace",
              fontSize: "12px",
              whiteSpace: "pre-wrap",
            }}
          >
            {`Personal Notes
==============

TODO:
- Update portfolio website
- Learn new web framework
- Work on side projects
- Practice algorithms

Ideas:
- Retro game remakes
- Desktop environment simulation
- Virtual machine interface
- Classic computer emulator

Shopping List:
- Coffee
- Mechanical keyboard
- New monitor
- Programming books`}
          </pre>
        </div>
      );
    case "old_projects":
      return (
        <div>
          <h2>Old Projects.txt</h2>
          <pre style={{ fontFamily: "monospace", fontSize: "12px" }}>
            {`Archived Projects
=================

1. Calculator App (2019)
   - Basic arithmetic operations
   - Built with vanilla JavaScript
   - Source: /archive/calculator/

2. Todo List Manager (2020)
   - CRUD operations
   - Local storage persistence
   - Source: /archive/todo-app/

3. Weather Dashboard (2021)
   - API integration
   - Responsive design
   - Source: /archive/weather-app/`}
          </pre>
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
