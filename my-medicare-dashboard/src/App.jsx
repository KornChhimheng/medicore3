import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';

// Import page components
import PatientDashboard from './pages/PatientDashboard.jsx';
import ReceptionistDashboard from './pages/ReceptionistDashboard.jsx';
import BillingPage from './pages/BillingPage.jsx';
import PrescriptionsPage from './pages/PrescriptionsPage.jsx';

// Main App component
const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 font-sans antialiased flex w-full">
        {/* Sidebar - fixed and full height */}
        <Sidebar />

        {/* Main Content Wrapper - takes up remaining space and is offset by sidebar width */}
        <div className="flex flex-col flex-1 ml-64">
          <Header />

          {/* Main content area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <Routes>
              {/* Default route redirects to patient dashboard */}
              <Route path="/" element={<Navigate to="/patient" replace />} />
              
              {/* Patient Dashboard */}
              <Route path="/patient" element={<PatientDashboard />} />
              
              {/* Receptionist Dashboard */}
              <Route path="/receptionist" element={<ReceptionistDashboard />} />
              
              {/* Billing Page */}
              <Route path="/billing" element={<BillingPage />} />
              
              {/* Prescriptions Page */}
              <Route path="/prescriptions" element={<PrescriptionsPage />} />
              
              {/* Catch all route - redirect to patient dashboard */}
              <Route path="*" element={<Navigate to="/patient" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
