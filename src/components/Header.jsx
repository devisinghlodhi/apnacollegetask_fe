import React from 'react';
import { FaUserAlt, FaBook, FaClipboardList, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // Add your logout logic here
    dispatch({type: 'logout'})
    // Redirect to login or home page
    navigate('/');
  };

  // Dynamically change the title based on pathname
  const getTitle = () => {
    switch (location.pathname) {
      case '/profile':
        return 'Profile';
      case '/topics':
        return 'Topics';
      case '/progress':
        return 'Progress';
      default:
        return 'Dashboard'; // Default title
    }
  };

  return (
    <header className="flex flex-col md:flex-row justify-between items-center p-5 bg-gray-800 text-gray-200 shadow-lg">
      {/* Left side: Dynamic Page Title */}
      <div className="text-2xl font-semibold mb-4 md:mb-0">
        <span className="text-white">{getTitle()}</span>
      </div>

      {/* Right side: Profile, Topics, Progress, Logout buttons */}
      <div className="flex flex-wrap justify-center md:justify-end items-center space-x-6 md:space-x-6 mt-4 md:mt-0">
        <button
          onClick={() => navigate('/profile')}
          className="flex items-center bg-gray-700 text-gray-200 hover:bg-gray-600 hover:text-white py-2 px-6 rounded-full shadow-md transition duration-200 ease-in-out transform hover:scale-105 mb-2 md:mb-0"
        >
          <FaUserAlt className="w-5 h-5 mr-2" />
          <span className="font-medium">Profile</span>
        </button>

        <button
          onClick={() => navigate('/topics')}
          className="flex items-center bg-gray-700 text-gray-200 hover:bg-gray-600 hover:text-white py-2 px-6 rounded-full shadow-md transition duration-200 ease-in-out transform hover:scale-105 mb-2 md:mb-0"
        >
          <FaBook className="w-5 h-5 mr-2" />
          <span className="font-medium">Topics</span>
        </button>

        <button
          onClick={() => navigate('/progress')}
          className="flex items-center bg-gray-700 text-gray-200 hover:bg-gray-600 hover:text-white py-2 px-6 rounded-full shadow-md transition duration-200 ease-in-out transform hover:scale-105 mb-2 md:mb-0"
        >
          <FaClipboardList className="w-5 h-5 mr-2" />
          <span className="font-medium">Progress</span>
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-full shadow-md transition duration-200 ease-in-out transform hover:scale-105"
        >
          <FaSignOutAlt className="w-5 h-5 mr-2" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
