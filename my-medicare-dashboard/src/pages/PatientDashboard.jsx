import React from 'react';
import WelcomeCard from '../components/WelcomeCard.jsx';         // Path: src/pages/ -> src/components/
import InfoCards from '../components/InfoCards.jsx';             // Path: src/pages/ -> src/components/
import MedicationLookup from '../components/MedicationLookup.jsx'; // Path: src/pages/ -> src/components/
import AppointmentsTable from '../components/AppointmentsTable.jsx'; // Path: src/pages/ -> src/components/
import BillingHistoryTable from '../components/BillingHistoryTable.jsx'; // Path: src/pages/ -> src/components/

// This component will represent the main dashboard view for patients.
// It receives props that contain data and functions managed by the parent App component.
const PatientDashboard = ({
  medicationName,
  setMedicationName,
  medicationInfo,
  setMedicationInfo,
  isLoadingMedInfo,
  setIsLoadingMedInfo,
  medInfoError,
  setMedInfoError,
  getMedicationInformation,
  appointments,
  billingHistory,
}) => {
  return (
    // The p-8 and w-full classes ensure proper padding and width within the main content area
    <div className="p-8 w-full">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <WelcomeCard />
      <InfoCards />
      <MedicationLookup
        medicationName={medicationName}
        setMedicationName={setMedicationName}
        medicationInfo={medicationInfo}
        setMedicationInfo={setMedicationInfo}
        isLoadingMedInfo={isLoadingMedInfo}
        setIsLoadingMedInfo={setIsLoadingMedInfo}
        medInfoError={medInfoError}
        setMedInfoError={setMedInfoError}
        getMedicationInformation={getMedicationInformation}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AppointmentsTable appointments={appointments} />
        <BillingHistoryTable billingHistory={billingHistory} />
      </div>
    </div>
  );
};

export default PatientDashboard;
