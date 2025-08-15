import React from 'react';
import './Projects.css';

const Projects = () => {
  return (
    <div className="projects-container">
      <h2 className="projects-title">My Projects</h2>
      <ul className="projects-list">
        <li>
          <strong>Retro Desktop:</strong> This nostalgic desktop interface
        </li>
        <li>
          <strong>Classic Games:</strong> Recreation of vintage computer programs
        </li>
        <li>
          <strong>Pixel Art Tool:</strong> Drawing application with retro aesthetics
        </li>
        <li>
          <strong>Terminal Emulator:</strong> Web-based command line interface
        </li>
      </ul>
    </div>
  );
};

export default Projects;