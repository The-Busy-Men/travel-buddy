// Footer.js
import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3>About Us</h3>
          <p>
            We offer personalized travel experiences for every kind of traveler.
            Whether you're seeking adventure, relaxation, or discovery, we have
            the perfect destination for you.
          </p>
        </div>

        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#terms">Terms of Service</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#contact">Contact Us</a></li>
            <li><a href="#careers">Careers</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Contact Info</h3>
          <p>Email: info@travelsite.com</p>
          <p>Phone: +1 (800) 123-4567</p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">FB</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">IG</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">TW</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2024 TravelSite. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
