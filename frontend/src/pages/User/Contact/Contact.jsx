import React from "react";
import Navbar from "../../../components/User/Navbar/Navbar";
import "./Contact.css";
import Footer from "../../../components/User/Footer/Footer";

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="contact-container">
        <div className="contact-form-container">
          <h1>Contact Us</h1>
          <form className="contact-form">
            <input type="text" placeholder="Your Name" name="name" required />
            <input
              type="email"
              placeholder="Your Email"
              name="email"
              required
            />
            <textarea
              placeholder="Your Message"
              name="message"
              required
            ></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Contact;
