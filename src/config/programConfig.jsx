import Clock from "../utilities/Clock/Clock";
import Camera from "../utilities/Camera/Camera";
import Internet from "../utilities/Internet/Internet";
import MediaPlayer from "../utilities/Media Player/MediaPlayer";
import Calendar from "../utilities/Calendar/Calendar";
import Notebook from "../utilities/Notebook/Notebook";
import Pikachu from "../utilities/Pikachu/Pikachu";

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
import internetIcon from "../assets/icons/Microsoft Windows 3 International.ico";
import cameraIcon from "../assets/icons/Microsoft Windows 3 Camera.ico";
import canvasIcon from "../assets/icons/Microsoft Windows 3 Color.ico";
import pikachuIcon from "../assets/icons/Pikachu.ico";

// Desktop icons configuration
export const desktopIcons = [
  {
    id: "about",
    label: "About Me",
    iconSrc: aboutIcon,
    isMaximizable: false,
  },
  {
    id: "projects",
    label: "Projects",
    iconSrc: projectsIcon,
    isMaximizable: false,
  },
  {
    id: "contact",
    label: "Contact",
    iconSrc: contactIcon,
    isMaximizable: false,
  },
  {
    id: "welcome",
    label: "Welcome",
    iconSrc: welcomeIcon,
    isMaximizable: false,
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
        isMaximizable: false,
      },
      {
        id: "calendar",
        label: "Calendar",
        iconSrc: calendarIcon,
        type: "icon",
        isMaximizable: false,
      },
      {
        id: "camera",
        label: "Camera",
        iconSrc: cameraIcon,
        type: "icon",
        isMaximizable: false,
      },
      {
        id: "canvas",
        label: "Canvas",
        iconSrc: canvasIcon,
        type: "icon",
        isMaximizable: true,
      },
      {
        id: "clock",
        label: "Clock",
        iconSrc: clockIcon,
        type: "icon",
        isMaximizable: false,
      },
      {
        id: "internet",
        label: "Internet",
        iconSrc: internetIcon,
        type: "icon",
        isMaximizable: false,
      },
      {
        id: "news",
        label: "News",
        iconSrc: newsIcon,
        type: "icon",
        isMaximizable: true,
      },
      {
        id: "notebook",
        label: "Notebook",
        iconSrc: notebookIcon,
        type: "icon",
        isMaximizable: true,
      },
      {
        id: "photo",
        label: "Photo",
        iconSrc: photoIcon,
        type: "icon",
        isMaximizable: true,
      },
      {
        id: "video",
        label: "Media",
        iconSrc: videoIcon,
        type: "icon",
        isMaximizable: true,
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
        isMaximizable: true,
      },
      {
        id: "minesweeper",
        label: "Minesweeper",
        iconSrc: minesweeperIcon,
        type: "icon",
        isMaximizable: true,
      },
      {
        id: "pikachu",
        label: "Pikachu",
        iconSrc: pikachuIcon,
        type: "icon",
        isMaximizable: true,
      }
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
    case "internet":
      return <Internet />;
    case "video": // Updated to use MediaPlayer
      return <MediaPlayer />;
    case "calendar":
      return <Calendar />;
    case "notebook":
      return <Notebook />;
    case "pikachu":
      return <Pikachu />;
    case "canvas":
      return (
        <div style={{ paddingLeft: "16px", paddingRight: "16px" }}>
          <h2>🎨 Canvas</h2>
          <p>Welcome to Canvas - a drawing and painting application!</p>
          <p>This is a placeholder for the Canvas program.</p>
          <p>Features coming soon:</p>
          <ul style={{ paddingLeft: "16px" }}>
            <li>Drawing tools</li>
            <li>Color palette</li>
            <li>Brush sizes</li>
            <li>Save and load functionality</li>
          </ul>
        </div>
      );
    case "about":
      return (
        <div style={{ 
          display: "flex", 
          height: "100%", 
          fontFamily: "var(--main-font)",
          fontSize: "16px",
          maxWidth: "800px",
          margin: "0 auto"
        }}>
          {/* Left Pane - Skills Tree */}
          <div style={{
            width: "180px",
            backgroundColor: "#f0f0f0",
            borderRight: "2px solid var(--button-border-dark)",
            padding: "8px",
            overflowY: "auto"
          }}>
            <div style={{
              fontWeight: "bold",
              marginBottom: "8px",
              color: "var(--windows-black)",
              fontSize: "16px"
            }}>
              Skills & Expertise
            </div>
            
            {/* Frontend Development */}
            <div style={{ marginBottom: "6px" }}>
              <div style={{
                fontWeight: "bold",
                color: "var(--windows-blue)",
                cursor: "pointer",
                fontSize: "16px"
              }}>
                📱 Frontend Development
              </div>
              <div style={{ marginLeft: "16px", fontSize: "14px" }}>
                <div>• HTML5 / CSS3</div>
                <div>• JavaScript (ES6+)</div>
                <div>• React.js / Next.js</div>
                <div>• Responsive Design</div>
                <div>• UI/UX Principles</div>
              </div>
            </div>

            {/* Backend & APIs */}
            <div style={{ marginBottom: "6px" }}>
              <div style={{
                fontWeight: "bold",
                color: "var(--windows-blue)",
                cursor: "pointer",
                fontSize: "16px"
              }}>
                ⚙️ Backend & APIs
              </div>
              <div style={{ marginLeft: "16px", fontSize: "14px" }}>
                <div>• Node.js / Express</div>
                <div>• RESTful APIs</div>
                <div>• JSON / XML</div>
                <div>• Database Design</div>
              </div>
            </div>

            {/* Development Tools */}
            <div style={{ marginBottom: "6px" }}>
              <div style={{
                fontWeight: "bold",
                color: "var(--windows-blue)",
                cursor: "pointer",
                fontSize: "16px"
              }}>
                🛠️ Development Tools
              </div>
              <div style={{ marginLeft: "16px", fontSize: "14px" }}>
                <div>• Git / GitHub</div>
                <div>• Webpack / Vite</div>
                <div>• Testing (Jest)</div>
                <div>• VS Code / IDEs</div>
              </div>
            </div>

            {/* Design & Creative */}
            <div style={{ marginBottom: "6px" }}>
              <div style={{
                fontWeight: "bold",
                color: "var(--windows-blue)",
                cursor: "pointer",
                fontSize: "16px"
              }}>
                🎨 Design & Creative
              </div>
              <div style={{ marginLeft: "16px", fontSize: "14px" }}>
                <div>• UI/UX Design</div>
                <div>• Adobe Creative Suite</div>
                <div>• Figma / Sketch</div>
                <div>• Pixel Art & Graphics</div>
              </div>
            </div>
          </div>

          {/* Right Pane - Main Content */}
          <div style={{
            flex: 1,
            padding: "16px",
            overflowY: "auto",
            maxWidth: "500px"
          }}>
            <div style={{
              borderBottom: "2px solid var(--button-border-dark)",
              paddingBottom: "12px",
              marginBottom: "16px"
            }}>
              <h1 style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "var(--windows-black)",
                margin: "0 0 8px 0"
              }}>
                👨‍💻 Nguyen Minh Khoi
              </h1>
              <p style={{
                fontSize: "16px",
                color: "#666",
                margin: "0",
                fontStyle: "italic"
              }}>
                Frontend Developer & UI/UX Enthusiast
              </p>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <h2 style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "var(--windows-black)",
                margin: "0 0 8px 0"
              }}>
                🎯 Professional Summary
              </h2>
              <p style={{
                lineHeight: "1.5",
                margin: "0",
                fontSize: "16px"
              }}>
                Detail-oriented frontend developer with a passion for creating intuitive, 
                responsive web applications. Specialized in React.js ecosystem with strong 
                foundation in modern JavaScript, CSS, and HTML. Committed to writing clean, 
                maintainable code and staying current with industry best practices.
              </p>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <h2 style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "var(--windows-black)",
                margin: "0 0 8px 0"
              }}>
                🎓 Education
              </h2>
              <div style={{
                border: "1px solid var(--button-border-dark)",
                padding: "12px",
                backgroundColor: "#f9f9f9"
              }}>
                <div style={{ fontWeight: "bold", fontSize: "16px" }}>
                  Bachelor of Software Engineering
                </div>
                <div style={{ color: "#666", marginBottom: "6px", fontSize: "16px" }}>
                  FPT University • Expected 2025
                </div>
                <div style={{ fontSize: "16px" }}>
                  <strong>Concentration:</strong> React & NodeJS Development
                </div>
              </div>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <h2 style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "var(--windows-black)",
                margin: "0 0 8px 0"
              }}>
                💼 Professional Approach
              </h2>
              <ul style={{
                lineHeight: "1.5",
                margin: "0",
                paddingLeft: "20px",
                fontSize: "16px"
              }}>
                <li>Strong focus on user experience and accessibility</li>
                <li>Experience with agile development methodologies</li>
                <li>Proven ability to work in collaborative team environments</li>
                <li>Continuous learning mindset with latest web technologies</li>
                <li>Attention to performance optimization and code quality</li>
              </ul>
            </div>

            <div style={{
              borderTop: "2px solid var(--button-border-dark)",
              paddingTop: "12px",
              marginTop: "16px"
            }}>
              <p style={{
                fontSize: "14px",
                color: "#666",
                margin: "0",
                textAlign: "center"
              }}>
                Available for freelance projects and full-time opportunities
              </p>
            </div>
          </div>
        </div>
      );
    case "projects":
      return (
        <div style={{ paddingLeft: "16px", paddingRight: "16px" }}>
          <h2>My Projects</h2>
          <ul style={{ paddingLeft: "16px" }}>
            <li>
              <strong>Retro Desktop:</strong> This nostalgic desktop interface
            </li>
            <br />
            <li>
              <strong>Classic Games:</strong> Recreation of vintage computer
              programs
            </li>
            <br />
            <li>
              <strong>Pixel Art Tool:</strong> Drawing application with retro
              aesthetics
            </li>
            <br />
            <li>
              <strong>Terminal Emulator:</strong> Web-based command line
              interface
            </li>
          </ul>
        </div>
      );
    case "contact":
      return (
        <div style={{ paddingLeft: "16px", paddingRight: "16px" }}>
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
        <div style={{ paddingLeft: "16px", paddingRight: "16px" }}>
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
            <li>Click the • button to maximize windows</li>
            <li>Click the • button again to restore maximized windows</li>
          </ul>
          <p>Enjoy exploring this retro interface!</p>
        </div>
      );

    default:
      return (
        <div>
          <h3>{windowTitle}</h3>
          <p>{windowTitle} coming soon...</p>
          <p>This would be where the {windowTitle} interface would load.</p>
        </div>
      );
  }
};
