import React from "react";
import { Link, useLocation } from "react-router-dom";
// Import Lucide React icons for modern, attractive visuals
import {
  Home,
  CalendarCheck,
  Pill,
  Wallet,
  Users,
  UserRoundCog,
  LogOut,
} from "lucide-react";

// Sidebar component now uses React Router
const Sidebar = () => {
  const location = useLocation();

  const getNavLinkClass = (path) => {
    return `flex items-center p-3 font-semibold transition-colors duration-200 ${
      location.pathname === path
        ? "bg-blue-600 text-white rounded-xl" // Active link: darker blue background, white text, keep rounded for internal elements
        : "text-gray-200 hover:bg-white hover:text-blue-700 rounded-xl" // Default text color, and hover: white background, blue text, keep rounded for internal elements
    }`;
  };

  return (
    // Added 'fixed', 'h-screen', 'top-0', 'left-0', and 'overflow-y-auto'
    // 'z-50' ensures it stays on top of other content
    <aside className="w-64 bg-blue-800 shadow-md p-6 flex flex-col justify-start fixed h-screen top-0 left-0 overflow-y-auto z-50">
      <div>
        <div className="flex items-center mb-10">
          {/* MediCore Logo - CSS-generated SVG for modern look */}
          <svg
            className="w-10 h-10 mr-2" // Adjust size as needed
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* White outer square with rounded corners */}
            <rect
              x="0"
              y="0"
              width="100"
              height="100"
              fill="white"
              rx="15"
              ry="15"
            />
            {/* Blue cross */}
            <rect x="25" y="40" width="50" height="20" fill="#3B82F6" />{" "}
            {/* Horizontal bar, Tailwind blue-500 equivalent */}
            <rect x="40" y="25" width="20" height="50" fill="#3B82F6" />{" "}
            {/* Vertical bar, Tailwind blue-500 equivalent */}
          </svg>
          <span className="text-2xl font-bold text-white">MediCore</span>
        </div>
        {/* Navigation Items */}
        <nav className="flex-grow">
          {" "}
          {/* flex-grow to push logout to bottom */}
          <ul>
            <li className="mb-4">
              <Link
                to="/patient"
                className={getNavLinkClass("/patient")}
              >
                <Home size={24} className="mr-3" /> {/* Lucide Icon */}
                Patient Dashboard
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/receptionist"
                className={getNavLinkClass("/receptionist")}
              >
                <UserRoundCog size={24} className="mr-3" /> {/* Lucide Icon */}
                Receptionist Dashboard
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/billing"
                className={getNavLinkClass("/billing")}
              >
                <Wallet size={24} className="mr-3" /> {/* Lucide Icon */}
                Billing
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/prescriptions"
                className={getNavLinkClass("/prescriptions")}
              >
                <Pill size={24} className="mr-3" /> {/* Lucide Icon */}
                Prescriptions
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      {/* <div className="mt-auto pt-6">
        {" "}
        <a
          href="#"
          onClick={() => handleNavigationClick("logout")}
          className={getNavLinkClass("logout")}
        >
          <LogOut size={24} className="mr-3" />
          Logout
        </a>
      </div> */}
    </aside>
  );
};

export default Sidebar;
