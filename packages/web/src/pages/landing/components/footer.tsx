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
            Ye
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
          <p>Email: email@email.com</p>
          <p>Phone: +0 (000) 000-000-00</p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">FB</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">IG</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">TW</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2024 Travel Buddy. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
