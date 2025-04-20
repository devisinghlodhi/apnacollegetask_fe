import React from 'react';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();

  // Dynamically change footer text based on pathname
  const getFooterText = () => {
    switch (location.pathname) {
      case '/profile':
        return 'Profile';
      case '/topics':
        return 'Topics';
      case '/progress':
        return 'Progress';
      default:
        return 'Dashboard'; // Default footer text for other routes
    }
  };

  return (
    <footer className="bg-gray-800 text-center text-gray-200 py-4 mt-10">
      <p>&#169; {getFooterText()}. All rights reserved. &#169; 2025</p>
    </footer>
  );
};

export default Footer;
