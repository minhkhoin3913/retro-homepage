import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import "./Message.css";
import dingSound from "./ding.mp3";
import chordSound from "./chord.mp3";

const Message = ({ onClose }) => {
  const form = useRef();
  const [status, setStatus] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [isSending, setIsSending] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    const name = form.current.user_name.value;
    const email = form.current.user_email.value;
    const message = form.current.message.value;

    // Reset error states
    setNameError("");
    setEmailError("");
    setMessageError("");

    // Validation
    let isValid = true;
    if (name.length < 2 || name.length > 50) {
      setNameError(
        name.length > 50
          ? "Name must not exceed 50 characters."
          : "Name must be at least 2 characters long."
      );
      isValid = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 100) {
      setEmailError(
        email.length > 100
          ? "Email must not exceed 100 characters."
          : "Please enter a valid email address."
      );
      isValid = false;
    }
    if (message.length < 10 || message.length > 500) {
      setMessageError(
        message.length > 500
          ? "Message must not exceed 500 characters."
          : "Message must be at least 10 characters long."
      );
      isValid = false;
    }

    if (!isValid) return;

    setIsSending(true);

    // Prepare the form data to match the EmailJS template
    const formData = {
      name,
      user_email: email,
      message,
      to_email: import.meta.env.VITE_EMAILJS_TO_EMAIL, // From .env
      time: new Date().toLocaleString("en-US", {
        timeZone: "Asia/Ho_Chi_Minh",
      }), // Matches {{time}}
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
          setStatus("Message sent successfully!");
          form.current.reset(); // Clear the form after successful submission
          setIsSending(false); // Enable button after success
        },
        (error) => {
          setStatus(`Failed to send message: ${error.text}`);
          setIsSending(false); // Enable button after failure
        }
      );
  };

  // Clear status and error messages after 5 seconds and play appropriate sound
  useEffect(() => {
    if (status || nameError || emailError || messageError) {
      // Play chord.mp3 for validation errors, ding.mp3 for status messages
      const sound =
        nameError || emailError || messageError
          ? new Audio(chordSound)
          : new Audio(dingSound);
      sound.play().catch((error) => {
        console.error("Error playing sound:", error);
      });

      // Clear all messages after 5 seconds
      const timer = setTimeout(() => {
        setStatus("");
        setNameError("");
        setEmailError("");
        setMessageError("");
      }, 5000);
      return () => clearTimeout(timer); // Cleanup on unmount or message change
    }
  }, [status, nameError, emailError, messageError]);

  return (
    <div className="message-me-window">
      <form ref={form} onSubmit={sendEmail} className="form">
        <div className="label-error-container">
          <label className="label">Name:</label>
          {nameError && <span className="error-message">{nameError}</span>}
        </div>
        <input type="text" name="user_name" className="input" required />
        <div className="label-error-container">
          <label className="label">Email:</label>
          {emailError && <span className="error-message">{emailError}</span>}
        </div>
        <input type="email" name="user_email" className="input" required />
        <div className="label-error-container">
          <label className="label">Message:</label>
          {messageError && (
            <span className="error-message">{messageError}</span>
          )}
        </div>
        <textarea
          name="message"
          className="input textarea retro-scrollbar"
          required
        />
        <div className="button-status-container">
          <button
            type="submit"
            className="window-button program-button"
            disabled={isSending}
          >
            Send
          </button>
          {status && <p className="status-message">{status}</p>}
        </div>
      </form>
    </div>
  );
};

export default Message;
