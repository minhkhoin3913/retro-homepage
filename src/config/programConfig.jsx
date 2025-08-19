import Clock from "../utilities/Clock/Clock";
import Camera from "../utilities/Camera/Camera";
import Internet from "../utilities/Internet/Internet";
import MediaPlayer from "../utilities/Media Player/MediaPlayer";
import Calendar from "../utilities/Calendar/Calendar";
import Notebook from "../utilities/Notebook/Notebook";
import Pikachu from "../utilities/Pikachu/Pikachu";
import About from "../utilities/About/About";
import Projects from "../utilities/Projects/Projects";
import Contact from "../utilities/Contact/Contact";
import Welcome from "../utilities/Welcome/Welcome";

// Import your icons
import logoIcon from "../assets/icons/Microsoft Windows 3 Logo.ico";
import phoneIcon from "../assets/icons/Microsoft Windows 3 Phone Dial.ico";
import readmeIcon from "../assets/icons/Microsoft Windows 3 Read Me.ico";
import folderIcon from "../assets/icons/Microsoft Windows 3 Applications.ico";
import solitaireIcon from "../assets/icons/Microsoft Windows 3 Solitaire.ico";
import minesweeperIcon from "../assets/icons/Microsoft Windows 3 Minesweeper.ico";
import notebookIcon from "../assets/icons/Microsoft Windows 3 Binder.ico";
import calculatorIcon from "../assets/icons/Microsoft Windows 3 Calculator.ico";
import calendarIcon from "../assets/icons/Microsoft Windows 3 Calendar.ico";
import clockIcon from "../assets/icons/Microsoft Windows 3 Clock.ico";
import monaLisaIcon from "../assets/icons/Microsoft Windows 3 Mona Lisa.ico";
import videoIcon from "../assets/icons/Microsoft Windows 3 Media Player.ico";
import newsIcon from "../assets/icons/Microsoft Windows 3 Newspaper.ico";
import internetIcon from "../assets/icons/Microsoft Windows 3 International.ico";
import cameraIcon from "../assets/icons/Microsoft Windows 3 Camera.ico";
import paintIcon from "../assets/icons/Microsoft Windows 3 Paint Tools.ico";
import pikachuIcon from "../assets/icons/Pikachu.ico";
import dllSetupIcon from "../assets/icons/Microsoft Windows 3 DLL Setup.ico";
import briefcaseIcon from "../assets/icons/Microsoft Windows 3 Briefcase.ico";
import computerIcon from "../assets/icons/Microsoft Windows 3 Computer.ico";

// Desktop icons configuration
export const desktopIcons = [
  {
    id: "about",
    label: "About Me",
    iconSrc: computerIcon,
    isMaximizable: false,
  },
    {
    id: "certificates",
    label: "My Certificates",
    iconSrc: dllSetupIcon,
    isMaximizable: false,
  },
  {
    id: "projects",
    label: "My Projects",
    iconSrc: briefcaseIcon,
    isMaximizable: false,
  },
  {
    id: "contact",
    label: "My Contact",
    iconSrc: phoneIcon,
    isMaximizable: false,
  },
  {
    id: "welcome",
    label: "Welcome",
    iconSrc: logoIcon,
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
        iconSrc: paintIcon,
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
        iconSrc: monaLisaIcon,
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
    case "video":
      return <MediaPlayer />;
    case "calendar":
      return <Calendar />;
    case "notebook":
      return <Notebook />;
    case "pikachu":
      return <Pikachu />;
    case "canvas":
      return (
        <div className="p-4">
          <h2 className="text-xl font-bold">🎨 Canvas</h2>
          <p>Welcome to Canvas - a drawing and painting application!</p>
          <p>This is a placeholder for the Canvas program.</p>
          <p>Features coming soon:</p>
          <ul className="list-disc pl-4">
            <li>Drawing tools</li>
            <li>Color palette</li>
            <li>Brush sizes</li>
            <li>Save and load functionality</li>
          </ul>
        </div>
      );
    case "about":
      return <About />;
    case "projects":
      return <Projects />;
    case "contact":
      return <Contact />;
    case "welcome":
      return <Welcome />;
    default:
      return (
        <div className="p-4">
          <h3 className="text-lg font-bold">{windowTitle}</h3>
          <p>{windowTitle} coming soon...</p>
          <p>This would be where the {windowTitle} interface would load.</p>
        </div>
      );
  }
};