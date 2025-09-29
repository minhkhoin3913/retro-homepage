import React, { useState, useEffect } from "react";
import "./welcome.css";
import welcomeAudio from "./welcome.mp3";

const Welcome = () => {
  const [activeSection, setActiveSection] = useState("welcome");
  const [content, setContent] = useState("");

  useEffect(() => {
    const audio = new Audio(welcomeAudio);
    audio.play().catch((error) => {
      console.error("Error playing audio:", error);
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    switch (activeSection) {
      case "welcome":
        setContent(
          <>
            <h2 className="welcome-title">Welcome to My Personal Website</h2>
            <p>
              Hello! I’m thrilled to have you here. This site is a reflection of
              my journey, passions, and creative work. A place where I share
              projects, thoughts, and experiences. Whether you’re a friend,
              colleague, or just curious, I hope you find something inspiring or
              useful along the way.
            </p>
            <p>
              Feel free to explore at your own pace. You’ll find a portfolio of
              my work, a blog with my latest musings, and even a gallery of
              favorite moments. To get started, I recommend checking out the
              "Discover" section for a quick overview. I’d love to hear your
              feedback as you click around!
            </p>
            <p>
              The site carries a retro aesthetic inspired by the early days of
              computing, a nod to nostalgia and my love for technology’s
              evolution. So grab a coffee, get comfortable, and enjoy your visit
              to my digital home.
            </p>
          </>
        );
        break;
      case "discover":
        setContent(
          <>
            <h2 className="welcome-title">Discover</h2>
            <p>
              Take a quick tour and see how to navigate my site. The interface
              is designed to feel like a retro desktop, reimagined with modern
              functionality. Here’s how you can interact with it:
            </p>
            <ul className="welcome-usage-list">
              <li>
                Click an icon to select it (it will highlight in blue)
              </li>
              <li>Double-click icons to open windows</li>
              <li>Drag icons to rearrange them on the desktop</li>
              <li>Drag windows by their title bar to reposition them</li>
              <li>Click the × button to close a window</li>
              <li>Click the • button to maximize a window</li>
              <li>Click the • button again to restore it</li>
              <li>Click the - button to minimize it</li>
            </ul>
            <p>
              Explore at your own pace—open projects, read blog posts, or browse
              the photo gallery. Every section is here to give you a glimpse
              into my work, my interests, and the things I enjoy sharing.
            </p>
          </>
        );
        break;
      case "contact-now":
        setContent(
          <>
            <h2 className="welcome-title">Contact Now</h2>
            <p>
              I’d love to connect with you! This section is your gateway to
              reaching out, whether you want to collaborate, ask a question, or
              just say hello. You can find my contact details below, and I
              encourage you to get in touch. I’m always open to new
              opportunities, feedback, or a friendly chat.
            </p>
            <ul className="welcome-usage-list">
              <li>
                Email me at: nguyenminhkhoi3913@gmail.com to start a
                conversation
              </li>
              <li>
                Connect with me using the built-in "Message Me" program on this retro
                desktop
              </li>
            </ul>
            <p className="welcome-closing-text">
              Feel free to explore more, and don’t hesitate to reach out. I look
              forward to hearing from you!
            </p>
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
          onClick={() => setActiveSection("welcome")}
        >
          Welcome
        </div>
        <div
          className="welcome-menu-item"
          onClick={() => setActiveSection("discover")}
        >
          Discover
        </div>
        <div
          className="welcome-menu-item"
          onClick={() => setActiveSection("contact-now")}
        >
          Contact Now
        </div>
      </div>
      <div className="welcome-content-section">{content}</div>
    </div>
  );
};

export default Welcome;
