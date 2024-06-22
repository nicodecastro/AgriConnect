import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <ul>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Terms & Conditions</li>
          <li>Privacy Policy</li>
        </ul>
      </div>
      <div id="icons">
        <FontAwesomeIcon icon={faFacebook} />
        <FontAwesomeIcon icon={faTwitter} />
        <FontAwesomeIcon icon={faInstagram} />
      </div>
    </footer>
  );
}

export default Footer;
