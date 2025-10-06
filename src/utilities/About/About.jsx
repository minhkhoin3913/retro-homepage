import React, { useState } from "react";
import "./About.css";
import folderIcon from "./Microsoft Windows 3 Folder.ico";
import folderOpenIcon from "./Microsoft Windows 3 Folder Open Document.ico";
import docIcon from "./Microsoft Windows 3 Documents.ico";
import portraitImage from "./portrait.jpg";

const About = () => {
  // State to manage open/closed folders
  const [openFolders, setOpenFolders] = useState({
    frontend: true,
    backend: true,
    tools: true,
    devops: true,
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
                  JavaScript (ES6) / TypeScript
                </li>
                <li>
                  <img src={docIcon} alt="Document" className="folder-icon" />{" "}
                  React.js
                </li>
                <li>
                  <img src={docIcon} alt="Document" className="folder-icon" />{" "}
                  Bootstrap / SCSS / Tailwind CSS
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

        {/* Backend Development Folder */}
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
            Backend Development
          </div>
          <div className="tree-connector">
            {openFolders.backend && (
              <ul className="skills-list">
                <li>
                  <img src={docIcon} alt="Document" className="folder-icon" />{" "}
                  Node.js / Express.js
                </li>
                <li>
                  <img src={docIcon} alt="Document" className="folder-icon" />{" "}
                  NestJS
                </li>
                <li>
                  <img src={docIcon} alt="Document" className="folder-icon" />{" "}
                  Socket.IO
                </li>
                <li>
                  <img src={docIcon} alt="Document" className="folder-icon" />{" "}
                  RESTful APIs / JWT
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
                  Vite / Webpack
                </li>
                <li>
                  <img src={docIcon} alt="Document" className="folder-icon" />{" "}
                  Swagger
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* DevOps & Deployment Folder */}
        <div className="skills-section">
          <div
            className="skills-section-title"
            onClick={() => toggleFolder("devops")}
          >
            <img
              src={openFolders.devops ? folderOpenIcon : folderIcon}
              alt="Folder"
              className="folder-icon"
            />{" "}
            DevOps & Deployment
          </div>
          <div className="tree-connector">
            {openFolders.devops && (
              <ul className="skills-list">
                <li>
                  <img src={docIcon} alt="Document" className="folder-icon" />{" "}
                  PostgreSQL
                </li>
                <li>
                  <img src={docIcon} alt="Document" className="folder-icon" />{" "}
                  Prisma
                </li>
                <li>
                  <img src={docIcon} alt="Document" className="folder-icon" />{" "}
                  Firebase
                </li>
                <li>
                  <img src={docIcon} alt="Document" className="folder-icon" />{" "}
                  Heroku
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
            src={portraitImage}
            alt="Portrait"
            className="portrait-image"
          />
          <div className="header-group">
            <h2 className="name">Nguyen Minh Khoi</h2>
            <p className="title">Full Stack Developer</p>
          </div>
        </div>

        <div className="section">
          <h3 className="section-title">🎯 Professional Summary</h3>
          <p className="section-text">
            Full Stack Developer with hands-on experience building scalable web
            applications using modern JavaScript frameworks. Proficient in
            front-end development with React.js and responsive UI design, and
            back-end development with Node.js and Express.js. Skilled in
            deploying applications on Heroku and Firebase, optimizing API
            performance, and implementing secure authentication with JWT. Strong
            foundation in agile workflows, code reviews, and performance
            optimization.
          </p>
        </div>

        <div className="section">
          <h3 className="section-title">🎓 Education</h3>
          <div className="education-box">
            <div className="education-degree">
              Bachelor of Software Engineer
            </div>
            <div className="education-details">
              FPT University • 2021 - 2025
            </div>
            <div className="education-concentration">
              <ul className="approach-list">
                <li>
                  <strong>Relevant Coursework:</strong> Web Development,
                  Database Systems, Software Architecture and Agile
                  Methodologies
                </li>
                <li>
                  <strong>Academic Projects: </strong> Built a full-stack
                  e-commerce app with React and Node.js, featuring authentication, product
                  management, and real-time order tracking via Firebase.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="section">
          <h3 className="section-title">💼 Experience</h3>
          <div className="education-box">
            <div className="education-degree">Full Stack Developer Intern</div>
            <div className="education-details">
              UTA Solutions • September 2024 - January 2025
            </div>
            <div className="education-concentration">
              <ul className="approach-list">
                <li>
                  Built and tested full-stack web applications using React.js
                  (front-end) and Node.js with Express.js (back-end).
                </li>
                <li>
                  Designed and deployed RESTful APIs with JWT authentication,
                  strengthening security protocols.
                </li>
                <li>
                  Assisted in deploying applications on Heroku, contributing to
                  a <strong>25%</strong> increase in uptime.
                </li>
                <li>
                  Engaged in agile workflows, including sprint planning,
                  retrospectives, and team collaboration.
                </li>
              </ul>
            </div>
          </div>
          <div className="education-box">
            <div className="education-degree">Front-End Developer Intern</div>
            <div className="education-details">
              FPT Software • January 2024 - April 2024
            </div>
            <div className="education-concentration">
              <ul className="approach-list">
                <li>
                  Collaborated with a team to design and implement responsive
                  web interfaces using HTML5, CSS3, and React.js.
                </li>
                <li>
                  Enhanced UI components with Bootstrap and Tailwind CSS,
                  reducing page load times by <strong>15%</strong>.
                </li>
                <li>
                  Participated in daily agile stand-ups, sprint planning, and
                  code reviews to ensure timely delivery and maintain coding
                  standards.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;