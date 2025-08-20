import React, { useState, useEffect } from 'react';
import './welcome.css';
import welcomeAudio from './welcome.mp3';

const Welcome = () => {
  const [activeSection, setActiveSection] = useState('welcome');
  const [content, setContent] = useState('');

  useEffect(() => {
    const audio = new Audio(welcomeAudio);
    audio.play().catch(error => {
      console.error('Error playing audio:', error);
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    switch (activeSection) {
      case 'welcome':
        setContent(
          <>
            <h2 className="welcome-title">Welcome to My Personal Website</h2>
            <p>Hello! I’m thrilled to have you here on my personal corner of the internet. This website is a reflection of my journey, passions, and the things I love to share with the world. Whether you're a friend, colleague, or just a curious visitor, I hope you find something inspiring or useful during your stay. I’ve poured my heart into creating this space, blending my interests in technology, creativity, and personal growth into a digital home.</p>
            <p>Feel free to explore at your own pace. This site is designed to be a living portfolio, showcasing my projects, thoughts, and experiences. You’ll find sections dedicated to my work, a blog with my latest musings, and even a gallery of my favorite moments. If you’re new here, I recommend starting with the "Discover" section to get a feel for what I offer. Take your time, click around, and let me know what you think—I’d love to hear your feedback!</p>
            <p>As you navigate, you’ll notice a retro aesthetic inspired by the early days of computing. It’s a nod to my love for nostalgia and the evolution of technology. So, grab a coffee, get comfortable, and enjoy your visit to my digital abode!</p>
          </>
        );
        break;
      case 'discover':
        setContent(
          <>
            <h2 className="welcome-title">Discover</h2>
            <p>Discover the features of my personal website with this interactive tour. Here’s how you can make the most of your visit:</p>
            <ul className="welcome-usage-list">
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
            <p>This interface is designed to feel like a desktop experience from the past, blended with modern functionality. Explore my projects, read my blog posts, or check out my photo gallery to learn more about who I am and what I do.</p>
          </>
        );
        break;
      case 'contact-now':
        setContent(
          <>
            <h2 className="welcome-title">Contact Now</h2>
            <p>I’d love to connect with you! This section is your gateway to reaching out, whether you want to collaborate, ask a question, or just say hello. You can find my contact details below, and I encourage you to get in touch. I’m always open to new opportunities, feedback, or a friendly chat.</p>
            <ul className="welcome-usage-list">
              <li>Email me at: [your-email@example.com] to start a conversation</li>
              <li>Connect with me on social media via the links in the footer</li>
              <li>Fill out the contact form on the "Contact" page for a detailed message</li>
            </ul>
            <p className="welcome-closing-text">Feel free to explore more, and don’t hesitate to reach out. I look forward to hearing from you!</p>
          </>
        );
        break;
      default:
        setContent(<></>);
    }
  }, [activeSection]);

  return (
    <div className="welcome-container">
      <div className="welcome-menu-section">
        <div
          className="welcome-menu-item"
          onClick={() => setActiveSection('welcome')}
        >
          Welcome
        </div>
        <div
          className="welcome-menu-item"
          onClick={() => setActiveSection('discover')}
        >
          Discover
        </div>
        <div
          className="welcome-menu-item"
          onClick={() => setActiveSection('contact-now')}
        >
          Contact Now
        </div>
      </div>
      <div className="welcome-content-section">
        {content}
      </div>
    </div>
  );
};

export default Welcome;