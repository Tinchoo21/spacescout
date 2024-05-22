import React, { useState }  from "react";
import Navbar from "../../../components/User/Navbar/Navbar";
import "./Contact.css";
import Footer from "../../../components/User/Footer/Footer";
import axios from 'axios'; 
import { toast } from 'react-toastify';

const Contact = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const { name, email, message } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/contact/mail', formData); 
      if (response.status === 201) {
        toast.success("The email has been sent successfully");
        setFormData({
          name: '',
          email: '',
          message: ''
        })
    }
    } catch (error) {
      toast.error("An error occurred while attempting to send the email. Please try again", {
        toastId: 'error1',
        autoClose: 3000,
    })
    }
  };

  return (
    <>
      <Navbar />
      <div className="contact-container">
        <div className="contact-form-container">
          <h1>Contact Us</h1>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Your Name" name="name" value={name} onChange={handleChange} required />
            <input type="email" placeholder="Your Email" name="email" value={email} onChange={handleChange} required />
            <textarea placeholder="Your Message" name="message" value={message} onChange={handleChange} required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Contact;
