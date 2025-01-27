import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container max-w-7xl mx-auto px-6">
      
        <div className="mb-8">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold text-yellow-500">Huntify</h2>
          </div>
        </div>

   
        <div className="md:flex md:justify-between gap-10 mb-8">
  
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <p>Email: huntify@gmail.com</p>
            <p>Phone: 01703344405</p>
            <p>Address:Goshairhat, Shariatpur</p>
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
            <p>Goshairhat</p>
            <p>Shariatpur</p>
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
