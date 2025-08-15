import React, { useState } from 'react';
import './About.css';
import folderIcon from './Microsoft Windows 3 Folder.ico';
import folderOpenIcon from './Microsoft Windows 3 Folder Open Document.ico';
import docIcon from './Microsoft Windows 3 Documents.ico';

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
            onClick={() => toggleFolder('frontend')}
          >
            <img src={openFolders.frontend ? folderOpenIcon : folderIcon} alt="Folder" className="folder-icon" /> Frontend Development
          </div>
          <div className="tree-connector">
            {openFolders.frontend && (
              <ul className="skills-list">
                <li><img src={docIcon} alt="Document" className="folder-icon" /> HTML5 / CSS3</li>
                <li><img src={docIcon} alt="Document" className="folder-icon" /> JavaScript (ES6+)</li>
                <li><img src={docIcon} alt="Document" className="folder-icon" /> React.js / Next.js</li>
                <li><img src={docIcon} alt="Document" className="folder-icon" /> Responsive Design</li>
                <li><img src={docIcon} alt="Document" className="folder-icon" /> UI/UX Principles</li>
              </ul>
            )}
          </div>
        </div>

        {/* Backend & APIs Folder */}
        <div className="skills-section">
          <div
            className="skills-section-title"
            onClick={() => toggleFolder('backend')}
          >
            <img src={openFolders.backend ? folderOpenIcon : folderIcon} alt="Folder" className="folder-icon" /> Backend & APIs
          </div>
          <div className="tree-connector">
            {openFolders.backend && (
              <ul className="skills-list">
                <li><img src={docIcon} alt="Document" className="folder-icon" /> Node.js / Express</li>
                <li><img src={docIcon} alt="Document" className="folder-icon" /> RESTful APIs</li>
                <li><img src={docIcon} alt="Document" className="folder-icon" /> JSON / XML</li>
                <li><img src={docIcon} alt="Document" className="folder-icon" /> Database Design</li>
              </ul>
            )}
          </div>
        </div>

        {/* Development Tools Folder */}
        <div className="skills-section">
          <div
            className="skills-section-title"
            onClick={() => toggleFolder('tools')}
          >
            <img src={openFolders.tools ? folderOpenIcon : folderIcon} alt="Folder" className="folder-icon" /> Development Tools
          </div>
          <div className="tree-connector">
            {openFolders.tools && (
              <ul className="skills-list">
                <li><img src={docIcon} alt="Document" className="folder-icon" /> Git / GitHub</li>
                <li><img src={docIcon} alt="Document" className="folder-icon" /> Webpack / Vite</li>
                <li><img src={docIcon} alt="Document" className="folder-icon" /> Testing (Jest)</li>
                <li><img src={docIcon} alt="Document" className="folder-icon" /> VS Code / IDEs</li>
              </ul>
            )}
          </div>
        </div>

        {/* Design & Creative Folder */}
        <div className="skills-section">
          <div
            className="skills-section-title"
            onClick={() => toggleFolder('design')}
          >
            <img src={openFolders.design ? folderOpenIcon : folderIcon} alt="Folder" className="folder-icon" /> Design & Creative
          </div>
          <div className="tree-connector">
            {openFolders.design && (
              <ul className="skills-list">
                <li><img src={docIcon} alt="Document" className="folder-icon" /> UI/UX Design</li>
                <li><img src={docIcon} alt="Document" className="folder-icon" /> Adobe Creative Suite</li>
                <li><img src={docIcon} alt="Document" className="folder-icon" /> Figma / Sketch</li>
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Right Pane - Main Content */}
      <div className="main-content">
        <div className="header">
          <img src={folderOpenIcon} alt="Placeholder" className="folder-icon placeholder" />
          <div className="header-group">
            <h1 className="name">Nguyen Minh Khoi</h1>
            <p className="title">Frontend Developer</p>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">🎯 Professional Summary</h2>
          <p className="section-text">
            Detail-oriented frontend developer with a passion for creating intuitive, 
            responsive web applications. Specialized in React.js ecosystem with strong 
            foundation in modern JavaScript, CSS, and HTML. Committed to writing clean, 
            maintainable code and staying current with industry best practices.
          </p>
        </div>

        <div className="section">
          <h2 className="section-title">💼 Professional Approach</h2>
          <ul className="approach-list">
            <li>Strong focus on user experience and accessibility</li>
            <li>Experience with agile development methodologies</li>
            <li>Proven ability to work in collaborative team environments</li>
            <li>Continuous learning mindset with latest web technologies</li>
            <li>Attention to performance optimization and code quality</li>
          </ul>
        </div>
        
        <div className="section">
          <h2 className="section-title">🎓 Education</h2>
          <div className="education-box">
            <div className="education-degree">Bachelor of Software Engineering</div>
            <div className="education-details">FPT University • 2021 - 2025</div>
            <div className="education-concentration">
              <strong>Concentration:</strong> React & NodeJS Development
            </div>
          </div>
        </div>

        {/* <div className="footer">
          <p className="footer-text">
            Available for freelance projects and full-time opportunities
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default About;