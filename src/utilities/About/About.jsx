import React, { useState } from "react";
import "./About.css";
import folderIcon from "./Microsoft Windows 3 Folder.ico";
import folderOpenIcon from "./Microsoft Windows 3 Folder Open Document.ico";
import docIcon from "./Microsoft Windows 3 Documents.ico";

const About = () => {
  // State to manage open/closed folders
  const [openFolders, setOpenFolders] = useState({
    frontend: true,
    backend: true,
    tools: true,
    design: true,
  });

  // Toggle folder open/closed state
  const toggleFolder = (folder) => {
    setOpenFolders((prev) => ({
      ...prev,
      [folder]: !prev[folder],
    }));
  };

  return (
    <div className="about-container">
      {/* Left Pane - Skills Tree */}
      <div className="skills-pane">
        {/* <div className="skills-title">Skills & Expertise</div> */}

        {/* Frontend Development Folder */}
        <div className="skills-section">
          <div
            className="skills-section-title"
            onClick={() => toggleFolder("frontend")}
          >
            <img
              src={openFolders.frontend ? folderOpenIcon : folderIcon}
              alt="Folder"
              className="folder-icon"
            />{" "}
            Frontend Development
          </div>
          <div className="tree-connector">
            {openFolders.frontend && (
              <ul className="skills-list">
                <li>
                  <img src={docIcon} alt="Document" className="folder-icon" />{" "}
                  HTML5 / CSS3
                </li>
                <li>
                  <img src={docIcon} alt="Document" className="folder-icon" />{" "}
                  JavaScript (ES6+)
                </li>
                <li>
                  <img src={docIcon} alt="Document" className="folder-icon" />{" "}
                  React.js
                </li>
                <li>
                  <img src={docIcon} alt="Document" className="folder-icon" />{" "}
                  SCSS
                </li>
                <li>
                  <img src={docIcon} alt="Document" className="folder-icon" />{" "}
                  Responsive Design
                </li>
                <li>
                  <img src={docIcon} alt="Document" className="folder-icon" />{" "}
                  Animation
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* Backend & APIs Folder */}
        <div className="skills-section">
          <div
            className="skills-section-title"
            onClick={() => toggleFolder("backend")}
          >
            <img
              src={openFolders.backend ? folderOpenIcon : folderIcon}
              alt="Folder"
              className="folder-icon"
            />{" "}
            Backend & APIs
          </div>
          <div className="tree-connector">
            {openFolders.backend && (
              <ul className="skills-list">
                <li>
                  <img src={docIcon} alt="Document" className="folder-icon" />{" "}
                  Node.js / Express
                </li>
                <li>
                  <img src={docIcon} alt="Document" className="folder-icon" />{" "}
                  RESTful APIs
                </li>
                <li>
                  <img src={docIcon} alt="Document" className="folder-icon" />{" "}
                  Socket.IO
                </li>
                <li>
                  <img src={docIcon} alt="Document" className="folder-icon" />{" "}
                  Database Design
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* Development Tools Folder */}
        <div className="skills-section">
          <div
            className="skills-section-title"
            onClick={() => toggleFolder("tools")}
          >
            <img
              src={openFolders.tools ? folderOpenIcon : folderIcon}
              alt="Folder"
              className="folder-icon"
            />{" "}
            Development Tools
          </div>
          <div className="tree-connector">
            {openFolders.tools && (
              <ul className="skills-list">
                <li>
                  <img src={docIcon} alt="Document" className="folder-icon" />{" "}
                  Git / GitHub
                </li>
                <li>
                  <img src={docIcon} alt="Document" className="folder-icon" />{" "}
                  Webpack / Vite
                </li>
                <li>
                  <img src={docIcon} alt="Document" className="folder-icon" />{" "}
                  VS Code
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* Design & Creative Folder */}
        <div className="skills-section">
          <div
            className="skills-section-title"
            onClick={() => toggleFolder("design")}
          >
            <img
              src={openFolders.design ? folderOpenIcon : folderIcon}
              alt="Folder"
              className="folder-icon"
            />{" "}
            Design & Creative
          </div>
          <div className="tree-connector">
            {openFolders.design && (
              <ul className="skills-list">
                <li>
                  <img src={docIcon} alt="Document" className="folder-icon" />{" "}
                  UI/UX Design
                </li>
                <li>
                  <img src={docIcon} alt="Document" className="folder-icon" />{" "}
                  Adobe Creative Suite
                </li>
                <li>
                  <img src={docIcon} alt="Document" className="folder-icon" />{" "}
                  Figma / Sketch
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Right Pane - Main Content */}
      <div className="main-content">
        <div className="header">
          <img
            src={folderOpenIcon}
            alt="Placeholder"
            className="folder-icon placeholder"
          />
          <div className="header-group">
            <h1 className="name">Nguyen Minh Khoi</h1>
            <p className="title">Full Stack Developer</p>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">🎯 Professional Summary</h2>
          <p className="section-text">
            Detail-oriented Full Stack Developer with expertise in building
            intuitive, responsive web applications using React.js and Node.js.
            Proficient in modern JavaScript (ES6+), HTML5, CSS3, and RESTful API
            development. Adept at delivering clean, maintainable code and
            optimizing application performance while adhering to industry best
            practices.
          </p>
        </div>

        <div className="section">
          <h2 className="section-title">🎓 Education</h2>
          <div className="education-box">
            <div className="education-degree">
              Bachelor of Software Engineering
            </div>
            <div className="education-details">
              FPT University • 2021 - 2025
            </div>
            <div className="education-concentration">
              <strong>Concentration:</strong> React & Node.js Development
            </div>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">💼 Experience</h2>
          <div className="education-box">
            <div className="education-degree">Full Stack Developer</div>
            <div className="education-details">
              UTA Solutions • September 2024 - February 2025
            </div>
            <div className="education-concentration">
              Developed and maintained web applications using React and Node.js.
              Designed and implemented RESTful APIs, enhancing application
              scalability and performance. Collaborated with cross-functional
              teams to deliver user-focused solutions, improving user engagement
              by 20%.
            </div>
          </div>
          <div className="education-box">
            <div className="education-degree">Front-End Developer</div>
            <div className="education-details">
              FPT Software • January 2024 - April 2024
            </div>
            <div className="education-concentration">
              Assisted in building responsive front-end interfaces using
              React.js and SCSS. Contributed to the development of internal
              tools, reducing manual processes by 15%. Participated in code
              reviews and agile development processes.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
