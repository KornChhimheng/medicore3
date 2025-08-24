import React from "react";

const AppointmentsPage = () => {
  // Dummy data to ensure the table is populated for visual confirmation
  // In a real application, you would typically use `propAppointments` passed from App.jsx
  const dummyAppointments = [
    {
      id: 1,
      name: "Abdullah Al Ahad Shovo",
      status: "Consultation",
      date: "03.01.2019",
      time: "10:00 AM",
      situation: "check", // Can be 'check', 'alert', or 'x'
      avatar: "https://placehold.co/40x40/ADD8E6/000000?text=AS", // Example placeholder URL
    },
    {
      id: 2,
      name: "Al Shahriar Shewron",
      status: "Consultation",
      date: "03.01.2019",
      time: "10:20 AM",
      situation: "alert",
      avatar: "https://placehold.co/40x40/FFDDC1/000000?text=AS",
    },
    {
      id: 3,
      name: "Lyn R. Lemus",
      status: "Consultation",
      date: "03.01.2019",
      time: "10:40 AM",
      situation: "x",
      avatar: null, // This will show initials 'LR'
    },
    {
      id: 4,
      name: "Katherine A. Stantill",
      status: "Consultation",
      date: "03.01.2019",
      time: "11:00 AM",
      situation: "check",
      avatar: "https://placehold.co/40x40/DDA0DD/000000?text=KS",
    },
    {
      id: 5,
      name: "Robert K. Perez",
      status: "Consultation",
      date: "03.01.2019",
      time: "11:20 AM",
      situation: "alert",
      avatar: "https://placehold.co/40x40/FFD700/000000?text=RP",
    },
    {
      id: 6,
      name: "Jason L. Bowling",
      status: "Consultation",
      date: "03.01.2019",
      time: "11:40 AM",
      situation: "check",
      avatar: "https://placehold.co/40x40/90EE90/000000?text=JB",
    },
    {
      id: 7,
      name: "Joseph A. Bove",
      status: "Consultation",
      date: "03.01.2019",
      time: "12:00 PM",
      situation: "x",
      avatar: "https://placehold.co/40x40/AFEEEE/000000?text=JB",
    },
  ];

  return (
    <div className="p-8 w-full">
      {/* This h2 for "All Appointments" is from your mockup image */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        All Appointments
      </h2>

      {/* Top Row: Summary Cards (Appointment Concept) */}
      {/* This section is moved here from PatientDashboard.jsx */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Card 1: Total Appointments */}
        <div className="bg-blue-600 p-6 rounded-xl shadow-md text-white flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Total Appointments</h3>
            {/* Placeholder SVG for the bars icon */}
            <svg
              className="w-8 h-8 opacity-75"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 000 2h14a1 1 0 100-2H3zm0 4a1 1 0 000 2h14a1 1 0 100-2H3zm0 4a1 1 0 000 2h14a1 1 0 100-2H3zm0 4a1 1 0 000 2h14a1 1 0 100-2H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-4xl font-bold">150</p>
              <p className="text-sm opacity-90">Today</p>
            </div>
            <span className="text-green-300 text-sm font-semibold">+11%</span>
          </div>
        </div>

        {/* Card 2: Confirmed Appointments */}
        <div className="bg-purple-600 p-6 rounded-xl shadow-md text-white flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Confirmed</h3>
            {/* Placeholder SVG for the pie chart icon */}
            <svg
              className="w-8 h-8 opacity-75"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H2z" />
              <path d="M12 10h8a8 8 0 00-8-8v8z" />
            </svg>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-4xl font-bold">22</p>
              <p className="text-sm opacity-90">Today</p>
            </div>
            <span className="text-red-300 text-sm font-semibold">-5%</span>
          </div>
        </div>

        {/* Card 3: Cancelled Appointments */}
        <div className="bg-red-600 p-6 rounded-xl shadow-md text-white flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Cancelled</h3>
            {/* Placeholder SVG for the bars icon (similar to Total Appointments) */}
            <svg
              className="w-8 h-8 opacity-75"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 000 2h14a1 1 0 100-2H3zm0 4a1 1 0 000 2h14a1 1 0 100-2H3zm0 4a1 1 0 000 2h14a1 1 0 100-2H3zm0 4a1 1 0 000 2h14a1 1 0 100-2H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-4xl font-bold">03</p>
              <p className="text-sm opacity-90">Today</p>
            </div>
            <span className="text-green-300 text-sm font-semibold">+09%</span>
          </div>
        </div>

        {/* Card 4: Upcoming Appointments */}
        <div className="bg-green-600 p-6 rounded-xl shadow-md text-white flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Upcoming</h3>
            {/* Placeholder SVG for a calendar/clock icon */}
            <svg
              className="w-8 h-8 opacity-75"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-4xl font-bold">05</p>
              <p className="text-sm opacity-90">Future</p>
            </div>
            <span className="text-green-300 text-sm font-semibold">+01%</span>
          </div>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        {/* Top section: "Todays", count, and view toggles */}
        <div className="flex justify-between items-center mb-4">
          {/* Left side: "Todays" and count */}
          <div className="flex items-center space-x-3">
            <h3 className="text-xl font-bold text-gray-800">Todays</h3>{" "}
            {/* Bold for "Todays" */}
            <span className="text-gray-500 text-sm font-medium">
              {dummyAppointments.length} Appointments{" "}
              {/* Dynamically display count */}
            </span>
          </div>
          {/* Right side: List/Grid icons */}
          <div className="flex space-x-2">
            {/* Blue grid icon (active state) */}
            <svg
              className="w-5 h-5 text-blue-600 cursor-pointer"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM13 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2h-2zM13 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2z" />
            </svg>
            {/* Gray list icon (inactive state) */}
            <svg
              className="w-5 h-5 text-gray-400 cursor-pointer"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 9a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 13a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Main Table */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-white">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                Time
              </th>
              <th
                scope="col"
                className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                Situation
              </th>
              <th
                scope="col"
                className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dummyAppointments.length > 0 ? (
              dummyAppointments.map((appointment) => (
                <tr key={appointment.id}>
                  {/* Name Column with Avatar/Initials */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {appointment.avatar ? (
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={appointment.avatar}
                            alt={appointment.name}
                          />
                        ) : (
                          <span className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-sm">
                            {/* Get initials for avatar placeholder */}
                            {(appointment.name || "")
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {appointment.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {appointment.status}
                  </td>
                  {/* Date */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {appointment.date}
                  </td>
                  {/* Time (bold as per mockup) */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                    {appointment.time}
                  </td>
                  {/* Situation Icons */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {/* Conditional rendering for situation icons */}
                    {appointment.situation === "check" && (
                      <svg
                        className="w-5 h-5 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    {appointment.situation === "alert" && (
                      <svg
                        className="w-5 h-5 text-orange-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.3 2.722-1.3 3.487 0l5.58 9.573c.828 1.403-.243 3.172-1.874 3.172H4.557c-1.63 0-2.703-1.769-1.874-3.172L8.257 3.099zM10 10a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1zm0-4a1 1 0 00-1 1v1a1 1 0 102 0V7a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    {appointment.situation === "x" && (
                      <svg
                        className="w-5 h-5 text-red-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </td>
                  {/* Actions Button */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      className="px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      onClick={() =>
                        console.log("View details for", appointment.name)
                      } // Example click handler
                    >
                      VIEW DETAILS
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No appointments found for today.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentsPage;
