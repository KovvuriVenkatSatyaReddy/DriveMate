import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Copyright Info */}
        <p className="text-center px-4 md:text-left text-sm">
          &copy; {new Date().getFullYear()} DriveMate. All rights reserved.
        </p>

        {/* Footer Links */}
        <nav className="flex justify-between space-x-4 px-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-gray-400">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-gray-400">
            Terms of Service
          </a>
          <a href="#" className="hover:text-gray-400">
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
