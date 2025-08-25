import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import './Message.css';

const Message = ({ onClose }) => {
  const form = useRef();
  const [status, setStatus] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    // Prepare the form data to match the EmailJS template
    const formData = {
      user_name: form.current.user_name.value,
      user_email: form.current.user_email.value,
      message: form.current.message.value,
      to_email: 'YOUR_EMAIL_ADDRESS' // Replace with your actual email address
    };

    emailjs
      .send('service_2c1qc15', 'template_cl4syyp', formData, '9wlh_6KE03XCPE4jh')
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

  // Clear status message after 5 seconds
  useEffect(() => {
    if (status) {
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
          <button type="submit" className="windows-button program-button">
            Send
          </button>
          {status && <p className="status-message">{status}</p>}
        </div>
      </form>
    </div>
  );
};

export default Message;