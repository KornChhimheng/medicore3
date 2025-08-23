import React from 'react';
import AppointmentsTable from './AppointmentsTable'; // Adjust path if AppointmentsTable.jsx is in a different directory

const AppointmentsPage = ({ appointments: propAppointments }) => {
  // Dummy data to ensure the table is populated for visual confirmation
  // In a real application, you would typically use `propAppointments` passed from App.jsx
  const dummyAppointments = [
    {
      id: 1,
      name: 'Abdullah Al Ahad Shovo',
      status: 'Consultation',
      date: '03.01.2019',
      time: '10:00 AM',
      situation: 'check', // Can be 'check', 'alert', or 'x'
      avatar: 'https://placehold.co/40x40/ADD8E6/000000?text=AS', // Example placeholder URL
    },
    {
      id: 2,
      name: 'Al Shahriar Shewron',
      status: 'Consultation',
      date: '03.01.2019',
      time: '10:20 AM',
      situation: 'alert',
      avatar: 'https://placehold.co/40x40/FFDDC1/000000?text=AS',
    },
    {
      id: 3,
      name: 'Lyn R. Lemus',
      status: 'Consultation',
      date: '03.01.2019',
      time: '10:40 AM',
      situation: 'x',
      avatar: null, // This will show initials 'LR'
    },
    {
      id: 4,
      name: 'Katherine A. Stantill',
      status: 'Consultation',
      date: '03.01.2019',
      time: '11:00 AM',
      situation: 'check',
      avatar: 'https://placehold.co/40x40/DDA0DD/000000?text=KS',
    },
    {
      id: 5,
      name: 'Robert K. Perez',
      status: 'Consultation',
      date: '03.01.2019',
      time: '11:20 AM',
      situation: 'alert',
      avatar: 'https://placehold.co/40x40/FFD700/000000?text=RP',
    },
    {
      id: 6,
      name: 'Jason L. Bowling',
      status: 'Consultation',
      date: '03.01.2019',
      time: '11:40 AM',
      situation: 'check',
      avatar: 'https://placehold.co/40x40/90EE90/000000?text=JB',
    },
    {
      id: 7,
      name: 'Joseph A. Bove',
      status: 'Consultation',
      date: '03.01.2019',
      time: '12:00 PM',
      situation: 'x',
      avatar: 'https://placehold.co/40x40/AFEEEE/000000?text=JB',
    },
  ];

  // Choose to display dummy data for guaranteed visual, or real data if available
  const appointmentsToDisplay = dummyAppointments; // Force dummy data for visual confirmation

  return (
    <div className="p-8 w-full">
      {/* This h2 for "All Appointments" is from your mockup image */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">All Appointments</h2>

      {/* Top Row: Summary Cards (Appointment Concept) */}
      {/* This section is moved here from PatientDashboard.jsx */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Card 1: Total Appointments */}
        <div className="bg-blue-600 p-6 rounded-xl shadow-md text-white flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Total Appointments</h3>
            {/* Placeholder SVG for the bars icon */}
            <svg className="w-8 h-8 opacity-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M3 3a1 1 0 000 2h14a1 1 0 100-2H3zm0 4a1 1 0 000 2h14a1 1 0 100-2H3zm0 4a1 1 0 000 2h14a1 1 0 100-2H3zm0 4a1 1 0 000 2h14a1 1 0 100-2H3z" clipRule="evenodd" />
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
            <svg className="w-8 h-8 opacity-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
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
            <svg className="w-8 h-8 opacity-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M3 3a1 1 0 000 2h14a1 1 0 100-2H3zm0 4a1 1 0 000 2h14a1 1 0 100-2H3zm0 4a1 1 0 000 2h14a1 1 0 100-2H3zm0 4a1 1 0 000 2h14a1 1 0 100-2H3z" clipRule="evenodd" />
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
            <svg className="w-8 h-8 opacity-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
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

      {/* Render the AppointmentsTable component here, passing the appointments data */}
      <AppointmentsTable appointments={appointmentsToDisplay} />
    </div>
  );
};

export default AppointmentsPage;
