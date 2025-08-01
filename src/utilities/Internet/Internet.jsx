// src/utilities/Internet/Internet.jsx
import React, { useState, useRef, useEffect, useCallback } from "react";
import "../../css/variables.css";
import "../../css/base.css";
import "../../css/components.css";
import "./Internet.css";

const Internet = () => {
  const [currentUrl, setCurrentUrl] = useState("about:blank");
  const [addressInput, setAddressInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState(["about:blank"]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [, setError] = useState(null);
  const iframeRef = useRef(null);

  // Default home pages for retro feel
  const defaultPages = {
    "about:blank": `
      <html>
        <head><title>Internet Navigator</title></head>
        <body style="margin: 20px;">
          <h2>Welcome to Internet Navigator</h2>
          <p>Enter a web address in the address bar above to browse the World Wide Web.</p>
          <hr>
          <h3>Getting Started:</h3>
          <ul>
            <li>Type a web address (URL) in the address bar</li>
            <li>Use the Back and Forward buttons to navigate</li>
            <li>Click the Home button to return to this page</li>
          </ul>
          <hr>
          <p><small>Internet Explorer for Windows 3.1 - Version 1.0</small></p>
        </body>
      </html>
    `,
    "about:error": `
      <html>
        <head><title>Page Cannot Be Displayed</title></head>
        <body style="background: #c0c0c0; font-family: 'MS Sans Serif', sans-serif; margin: 20px;">
          <h2>Internet Explorer cannot display the webpage</h2>
          <p>The page you are looking for cannot be displayed because:</p>
          <ul>
            <li>The website may be temporarily unavailable</li>
            <li>The web address may be incorrect</li>
            <li>Your internet connection may be interrupted</li>
          </ul>
          <hr>
          <h3>What you can try:</h3>
          <ul>
            <li>Check the web address for typing errors</li>
            <li>Click the Refresh button</li>
            <li>Try again later</li>
          </ul>
        </body>
      </html>
    `,
  };

  // Navigate to URL
  const navigateToUrl = useCallback(
    (url) => {
      setIsLoading(true);
      setError(null);

      // Handle special URLs
      if (url.startsWith("about:")) {
        const content = defaultPages[url] || defaultPages["about:error"];
        if (iframeRef.current) {
          const doc = iframeRef.current.contentDocument;
          doc.open();
          doc.write(content);
          doc.close();
        }
        setCurrentUrl(url);
        setAddressInput(url);
        setIsLoading(false);
        return;
      }

      // Add protocol if missing
      let fullUrl = url;
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        fullUrl = "https://" + url;
      }

      try {
        // Note: Due to CORS and iframe restrictions, many modern sites won't load
        // This simulates the early web browsing experience
        if (iframeRef.current) {
          iframeRef.current.src = fullUrl;
        }
        setCurrentUrl(fullUrl);
        setAddressInput(fullUrl);

        // Add to history
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(fullUrl);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
      } catch (err) {
        setError("Failed to load page");
        navigateToUrl("about:error");
      }

      setTimeout(() => setIsLoading(false), 1000);
    },
    [history, historyIndex, defaultPages]
  );

  // Handle address bar submission
  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (addressInput.trim()) {
      navigateToUrl(addressInput.trim());
    }
  };

  // Navigation functions
  const goBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      navigateToUrl(history[newIndex]);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      navigateToUrl(history[newIndex]);
    }
  };

  const goHome = () => {
    navigateToUrl("about:blank");
  };

  const refresh = () => {
    navigateToUrl(currentUrl);
  };

  const stop = () => {
    setIsLoading(false);
    if (iframeRef.current) {
      iframeRef.current.src = "about:blank";
    }
  };

  // Handle iframe load events
  const handleIframeLoad = () => {
    setIsLoading(false);
    try {
      if (iframeRef.current && iframeRef.current.contentDocument) {
        const title = iframeRef.current.contentDocument.title;
        if (title && !currentUrl.startsWith("about:")) {
          // Could update window title here if needed
        }
      }
    } catch (err) {
      // Cross-origin restrictions prevent access to iframe content
    }
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setError("Page failed to load");
    navigateToUrl("about:error");
  };

  // Initialize with home page
  useEffect(() => {
    navigateToUrl("about:blank");
  }, []);

  return (
    <div className="internet-container">
      {/* Toolbar */}
      <div className="internet-toolbar">
        <div className="toolbar-buttons">
          <button
            className="window-button control-button"
            onClick={goBack}
            disabled={historyIndex <= 0}
            title="Back"
          >
            &#60;
          </button>
          <button
            className="window-button control-button"
            onClick={goForward}
            disabled={historyIndex >= history.length - 1}
            title="Forward"
          >
            &#62;
          </button>
          <button
            className="window-button control-button"
            onClick={refresh}
            title="Refresh"
          >
            R
          </button>
          <button
            className="window-button control-button"
            onClick={goHome}
            title="Home"
          >
            H
          </button>
          <button
            className="window-button control-button"
            onClick={stop}
            title="Stop"
          >
           ×
          </button>
        </div>

        {/* Address Bar */}
        <form onSubmit={handleAddressSubmit} className="address-form">
          <input
            type="text"
            value={addressInput}
            onChange={(e) => setAddressInput(e.target.value)}
            className="address-input"
            placeholder="Enter web address"
          />
        </form>
      </div>

      {/* Browser Content */}
      <div className="browser-content">
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-internet-text">Loading page...</div>
            <div className="loading-bar">
              <div className="loading-progress"></div>
            </div>
          </div>
        )}

        <iframe
          ref={iframeRef}
          className="browser-iframe"
          title="Internet Explorer"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
        />
      </div>
    </div>
  );
};

export default Internet;
