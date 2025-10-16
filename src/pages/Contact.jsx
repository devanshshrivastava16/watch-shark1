import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [result, setResult] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult("Sending....");

    const formPayload = new FormData();
    // --- UPDATED LINE: Use the environment variable ---
    formPayload.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);
    formPayload.append("name", formData.name);
    formPayload.append("email", formData.email);
    formPayload.append("message", formData.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formPayload,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    } catch (error) {
      console.log("Submission Error", error);
      setResult("An error occurred. Please try again.");
    }

    setTimeout(() => {
      setResult("");
    }, 5000);
  };

  return (
    <div className="static-page-container container">
      <div className="static-page-header">
        <h1>Contact Us</h1>
        <p className="subtitle">
          We'd love to hear from you! Please share your feedback or questions.
        </p>
      </div>

      <div className="static-page-content">
        <div className="contact-form-container">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Feedback or Message</label>
              <textarea
                id="message"
                name="message"
                className="form-textarea"
                rows="6"
                placeholder="Tell us what you think..."
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">
              <FaPaperPlane /> Send Message
            </button>
          </form>
          {result && <span className="form-status">{result}</span>}
        </div>
      </div>
    </div>
  );
}
