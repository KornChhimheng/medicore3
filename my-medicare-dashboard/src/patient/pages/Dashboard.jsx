import React from "react";
import WelcomeCard from "../components/WelcomeCard.jsx";
import InfoCards from "../../common/InfoCards.jsx";
import MedicationLookup from "../../common/MedicationLookup.jsx";
import AppointmentsTable from "../components/AppointmentsTable.jsx";
import BillingHistoryTable from "../components/BillingHistoryTable.jsx";

// This component will represent the main dashboard view for patients.
const Dashboard = () => {
  // Mock data for now - will be replaced with API calls
  const mockAppointments = [
    {
      id: 1,
      name: "John Doe",
      date: "2024-01-15",
      time: "10:00 AM",
      status: "Scheduled",
      situation: "check",
    },
    {
      id: 2,
      name: "John Doe",
      date: "2024-01-16",
      time: "2:00 PM",
      status: "Completed",
      situation: "check",
    },
  ];

  const mockBillingHistory = [
    {
      id: 1,
      name: "John Doe",
      type: "General Consultation",
      amount: 150.0,
      sendDate: "2024-01-15",
      dueDate: "2024-01-22",
      recipient: "Dr. Smith",
      status: "Paid",
    },
    {
      id: 2,
      name: "John Doe",
      type: "Blood Test",
      amount: 75.5,
      sendDate: "2024-01-14",
      dueDate: "2024-01-21",
      recipient: "Lab Corp",
      status: "Pending",
    },
  ];
  return (
    // The p-8 and w-full classes ensure proper padding and width within the main content area
    <div className="p-8 w-full">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <WelcomeCard />
      <InfoCards />
      <MedicationLookup />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AppointmentsTable appointments={mockAppointments} />
        <BillingHistoryTable billingHistory={mockBillingHistory} />
      </div>
    </div>
  );
};

export default Dashboard;
