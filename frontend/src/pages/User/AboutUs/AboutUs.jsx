import React from "react";
import Navbar from "../../../components/User/Navbar/Navbar";
import "./AboutUs.css";
import slide1 from "../../../images/slide1.jpg";
import slide2 from "../../../images/slide2.jpg";

const AboutUs = () => {
  return (
    <div className="about-us-page">
      <Navbar />

          <div class="we-are-block">
            <div id="about-us-section">
              <div class="about-us-image">
                <img src={slide1} width="808" height="458" alt="Property" />
              </div>

              <div class="about-us-info">
                <h2>Welcome to Space Scout</h2>

                <p>
                  Space Scout, is your
                  trusted partner in navigating the vast expanse of the real
                  estate market. Our mission is to simplify the process of
                  buying, selling, and managing properties, making it more
                  efficient and profitable for you. We are deeply committed to
                  the growth and vitality of our local community and are
                  dedicated to supporting the expansion of our local real estate
                  economy.
                </p>

                <a href="contact" title="About Us Button">
                  CONTACT
                </a>
              </div>
            </div>

            <div id="history-section">
              <div class="history-image">
                <img
                  src={slide2}
                  width="951"
                  height="471"
                  alt="Building Pic"
                />
              </div>

              <div class="history-info">
                <h2>About Us</h2>

                <p>
                Our team measures success by the
                  tangible results we deliver, not by the transactions we make.
                  Join us at Space Scout, where your real estate journey is our
                  top priority, and discover how we can transform your property
                  dreams into reality.
                </p>
              </div>
            </div>
          </div>
    </div>
  );
};

export default AboutUs;
