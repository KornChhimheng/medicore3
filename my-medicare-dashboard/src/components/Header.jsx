import React, { useState } from "react";
import AuthModal from "./AuthModal";

const Header = () => {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  const handleSignIn = () => {
    // Your sign-in logic here
    console.log("User clicked Sign In");
    setAuthModalOpen(false);
  };

  const handleSignOut = () => {
    // Your sign-out logic here
    console.log("User clicked Sign Out");
    setAuthModalOpen(false);
  };

  return (
    // Keep the header background dark blue
    <header className="flex justify-between items-center mb-8 bg-blue-800 p-4">
      {/* Search Bar Section - Remains as is */}
      <div className="relative w-1/3">
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 pr-4 py-2 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white text-gray-800"
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {/* Simplified Icons on Top Right */}
      <div className="flex items-center space-x-6">
        {" "}
        {/* Maintained space-x-6 for good separation */}
        {/* Mail Icon */}
        {/* <svg
          className="w-6 h-6 text-white cursor-pointer hover:text-blue-200"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg> */}
        {/* Notification Bell Icon with Notification Dot */}
        <div className="relative">
          {" "}
          {/* Keep relative for the notification dot */}
          <svg
            className="w-6 h-6 text-white cursor-pointer hover:text-blue-200"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
          {/* Notification Dot */}
          <span className="absolute -top-0.5 -right-0.5 block h-2.5 w-2.5 rounded-full ring-2 ring-blue-800 bg-orange-400"></span>
        </div>
        {/* User Login/Logout Icon */}
        <svg
          className="w-6 h-6 text-white cursor-pointer hover:text-blue-200"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="header-right">
        <FaUserCircle
          size={24}
          style={{ cursor: "pointer" }}
          onClick={() => setAuthModalOpen(true)}
        />
      </div>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSignIn={handleSignIn}
        onSignOut={handleSignOut}
      />
      \
    </header>
  );
};

export default Header;
