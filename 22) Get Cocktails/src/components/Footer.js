import React from 'react';
import { FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer>
      <h4>
        Made by
        <a href="http://yodkwtf.netlify.app" target="_blank">
          Deekayy
        </a>{' '}
        |
        <span className="icon" id="twitter">
          <a href="https://twitter.com/yodkwtf" target="_blank">
            <FaTwitter />
          </a>
        </span>
        <span className="icon" id="instagram">
          <a href="https://www.instagram.com/yodkwtf" target="_blank">
            <FaInstagram />
          </a>
        </span>
        <span className="icon" id="linkedin">
          <a
            href="https://www.linkedin.com/in/durgesh-chaudhary-4516491b0/"
            target="_blank"
          >
            <FaLinkedin />
          </a>
        </span>
      </h4>
    </footer>
  );
};

export default Footer;
