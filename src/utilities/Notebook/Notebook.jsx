import React, { useState } from 'react';
import './Notebook.css';

const Notebook = () => {
  const [text, setText] = useState('');

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSave = () => {
    if (!text.trim()) {
      alert('Please enter some text before saving.');
      return;
    }

    // Create a blob with the text content
    const blob = new Blob([text], { type: 'text/plain' });
    
    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `notebook-${new Date().toISOString().slice(0, 10)}.txt`;
    
    // Trigger the download
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="notebook-container">
      <div className="notebook-header">
        <h3>Notebook</h3>
        <button className="window-button program-button" onClick={handleSave}>
          Save
        </button>
      </div>
      <div className="notebook-content">
        <textarea
          className="notebook-textarea"
          value={text}
          onChange={handleTextChange}
          placeholder="Start typing your notes here..."
          autoFocus
        />
      </div>
    </div>
  );
};

export default Notebook; 