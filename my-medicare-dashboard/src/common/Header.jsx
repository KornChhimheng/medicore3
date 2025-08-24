import React from "react";
import { Menu, X } from "lucide-react";
import AuthModal from "./AuthModal";

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    // Keep the header background dark blue
    <header className="flex justify-between items-center mb-8 bg-blue-800 p-4">
      {/* Hamburger Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

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
    </header>
  );
};

export default Header;
