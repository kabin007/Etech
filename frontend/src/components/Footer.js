import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-4">
      <div className="container">
        <p>&copy; 2023 Ecommerce Store. All rights reserved.</p>
        <div className="social-icons">
          <a href="https://facebook.com" className="text-white me-3"><FaFacebook /></a>
          <a href="https://twitter.com" className="text-white me-3"><FaTwitter /></a>
          <a href="https://instagram.com" className="text-white"><FaInstagram /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;