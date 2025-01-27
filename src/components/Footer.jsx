import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container max-w-7xl mx-auto px-6">
        {/* Footer Logo and Name */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold">TechHaven</h2>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <p>Email: huntify@gmail.com</p>
            <p>Phone: 01703344405</p>
            <p>Address:Goshairhat, Shariatpur</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul>
              <li>
                <Link to="/about" className="hover:underline">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="hover:underline">Services</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline">Contact</Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="text-2xl hover:text-blue-600" />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-2xl hover:text-blue-400" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-2xl hover:text-pink-500" />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-2xl hover:text-blue-700" />
              </a>
            </div>
          </div>

          {/* Address */}
          <div>
            <h4 className="font-semibold mb-4">Our Office</h4>
            <p>123 Tech St, Silicon Valley, CA</p>
            <p>United States</p>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="text-center mt-8">
          <p>&copy; 2025 TechHaven. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
