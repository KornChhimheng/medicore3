import React from 'react';
import RegisterPatientForm from './RegisterPatientForm.jsx';
import ReceptionistAppointments from './ReceptionistAppointments.jsx';
import ReceptionistWelcomeCard from './ReceptionistWelcomeCard.jsx'; // Import the ReceptionistWelcomeCard

// Removed: import InfoCards from '../../components/InfoCards.jsx'; // This is no longer needed

const ReceptionistDashboard = ({ db, userId, appointments }) => { // Added props for potential future use, matches App.jsx passing
  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased flex w-full"> {/* Ensure this has layout classes */}
      {/* Since App.jsx is no longer controlling the sidebar/header layout globally,
          ReceptionistDashboard needs to manage its own sidebar and header. */}
      {/* Assuming Sidebar and Header are already imported and managed by this component for its layout */}
      {/* If your layout still shows duplicates, ensure this component properly wraps Header and main content */}

      {/* Re-adding Header and Sidebar here as per the common pattern for dashboard components */}
      {/* You would pass relevant props if Header/Sidebar need data from this component */}
      {/* For now, assuming they are simple components without props, adjust as needed */}
      {/* <Sidebar />  If your Sidebar is a separate component, it should be here too. */}
      {/* <Header />   If your Header is a separate component, it should be here too. */}
      {/* Note: The current structure in the provided context for ReceptionistDashboard implies it's just the *content*.
               If it's meant to be the full page, the flex container, sidebar, and header need to be here.
               Assuming the structure from the most recent "receptionist-dashboard-component-v3" where it was self-contained with its own sidebar/header.*/}

      {/* Main Content Area starts here for this page */}
      <div className="flex-1 p-8"> {/* This div was originally named `main` */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Receptionist Dashboard</h1>
        
        {/* Replaced InfoCards with ReceptionistWelcomeCard */}
        <ReceptionistWelcomeCard /> {/* This is the key change */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Register Patient Form */}
          <RegisterPatientForm db={db} userId={userId} /> {/* Pass db and userId if needed */}

          {/* Receptionist Appointments List */}
          <ReceptionistAppointments appointments={appointments} /> {/* Pass appointments if needed */}
        </div>
      </div>
    </div>
  );
};

export default ReceptionistDashboard;
