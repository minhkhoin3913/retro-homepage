import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import './Message.css';
import dingSound from './ding.mp3';

const Message = ({ onClose }) => {
  const form = useRef();
  const [status, setStatus] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    // Prepare the form data to match the EmailJS template
    const formData = {
      name: form.current.user_name.value, // Matches {{name}}
      user_email: form.current.user_email.value, // Matches {{user_email}}
      message: form.current.message.value, // Matches {{message}}
      to_email: import.meta.env.VITE_EMAILJS_TO_EMAIL, // From .env
      time: new Date().toLocaleString() // Matches {{time}}
    };

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID, // From .env
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID, // From .env
        formData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY // From .env
      )
      .then(
        () => {
          setStatus('Message sent successfully!');
          form.current.reset(); // Clear the form after successful submission
        },
        (error) => {
          setStatus(`Failed to send message: ${error.text}`);
        }
      );
  };

  // Clear status message after 5 seconds and play sound when status appears
  useEffect(() => {
    if (status) {
      // Play sound when status message appears
      const audio = new Audio(dingSound);
      audio.play().catch((error) => {
        console.error('Error playing sound:', error);
      });

      // Clear status message after 5 seconds
      const timer = setTimeout(() => {
        setStatus('');
      }, 5000);
      return () => clearTimeout(timer); // Cleanup on unmount or status change
    }
  }, [status]);

  return (
    <div className="message-me-window">
      <form ref={form} onSubmit={sendEmail} className="form">
        <label className="label">Name:</label>
        <input type="text" name="user_name" className="input" required />
        <label className="label">Email:</label>
        <input type="email" name="user_email" className="input" required />
        <label className="label">Message:</label>
        <textarea name="message" className="input textarea retro-scrollbar" required />
        <div className="button-status-container">
          <button type="submit" className="window-button program-button">
            Send
          </button>
          {status && <p className="status-message">{status}</p>}
        </div>
      </form>
    </div>
  );
};

export default Message;