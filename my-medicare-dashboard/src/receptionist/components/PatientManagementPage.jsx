import React, { useState } from "react";
// Import specific Lucide React icons
import {
  BriefcaseMedical,
  CheckCircle,
  UserPlus,
  UserMinus,
  Search,
  Plus,
  Eye,
  CalendarPlus,
} from "lucide-react";

// Dummy data for patients to populate the UI
const dummyPatients = [
  {
    id: "pat001",
    name: "Sarah Connor",
    email: "sarah.c@example.com",
    phone: "555-123-4567",
    lastVisit: "2025-06-20",
    status: "Active",
    avatar: "https://placehold.co/40x40/add8e6/000000?text=SC", // Placeholder for avatar
  },
  {
    id: "pat002",
    name: "John Doe",
    email: "john.d@example.com",
    phone: "555-987-6543",
    lastVisit: "2025-06-15",
    status: "Inactive",
    avatar: "https://placehold.co/40x40/ffc0cb/000000?text=JD",
  },
  {
    id: "pat003",
    name: "Jane Smith",
    email: "jane.s@example.com",
    phone: "555-111-2222",
    lastVisit: "2025-06-24",
    status: "Active",
    avatar: "https://placehold.co/40x40/90ee90/000000?text=JS",
  },
  {
    id: "pat004",
    name: "Michael Brown",
    email: "mike.b@example.com",
    phone: "555-333-4444",
    lastVisit: "2025-06-25",
    status: "New", // Example for new patient today
    avatar: "https://placehold.co/40x40/f0e68c/000000?text=MB",
  },
  {
    id: "pat005",
    name: "Emily White",
    email: "emily.w@example.com",
    phone: "555-555-1212",
    lastVisit: "2025-06-18",
    status: "Active",
    avatar: "https://placehold.co/40x40/dda0dd/000000?text=EW",
  },
  {
    id: "pat006",
    name: "David Green",
    email: "david.g@example.com",
    phone: "555-777-8888",
    lastVisit: "2025-06-01",
    status: "Inactive",
    avatar: "https://placehold.co/40x40/b0e0e6/000000?text=DG",
  },
];

const PatientManagementPage = () => {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Calculate summary stats
  const totalPatients = dummyPatients.length;
  const activePatients = dummyPatients.filter(
    (p) => p.status === "Active"
  ).length;
  const newPatientsToday = dummyPatients.filter(
    (p) =>
      p.status === "New" &&
      p.lastVisit === new Date().toISOString().slice(0, 10)
  ).length; // Assuming 'lastVisit' can indicate new registration if today's date
  const inactivePatients = dummyPatients.filter(
    (p) => p.status === "Inactive"
  ).length;

  // Filter and search patients
  const filteredPatients = dummyPatients.filter((patient) => {
    const matchesFilter = filter === "All" || patient.status === filter;
    const matchesSearch =
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    // Overall page background: light gray for the whole page content area
    <div className="p-4 sm:p-6 lg:p-8 w-full bg-gray-50 min-h-screen font-inter">
      {/* Main content white card with shadow and rounded corners */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Patient Management Dashboard
        </h2>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Patients Card */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-md flex items-center space-x-4">
            {/* Icon for Total Patients (Medical Briefcase) - Redesigned */}
            <div className="flex-shrink-0 bg-blue-700 bg-opacity-30 rounded-full p-3 flex items-center justify-center">
              <BriefcaseMedical
                size={32}
                className="text-white"
                strokeWidth={1.8}
              />{" "}
              {/* Lucide icon */}
            </div>
            <div>
              <p className="text-xl font-bold">{totalPatients}</p>
              <p className="text-sm">Total Patients</p>
            </div>
          </div>

          {/* Active Patients Card */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-md flex items-center space-x-4">
            {/* Icon for Active Patients (Checkmark Circle) - Redesigned */}
            <div className="flex-shrink-0 bg-green-700 bg-opacity-30 rounded-full p-3 flex items-center justify-center">
              <CheckCircle size={32} className="text-white" strokeWidth={1.8} />{" "}
              {/* Lucide icon */}
            </div>
            <div>
              <p className="text-xl font-bold">{activePatients}</p>
              <p className="text-sm">Active Patients</p>
            </div>
          </div>

          {/* New Patients Today Card */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-md flex items-center space-x-4">
            {/* Icon for New Patients (User Plus) - Redesigned */}
            <div className="flex-shrink-0 bg-purple-700 bg-opacity-30 rounded-full p-3 flex items-center justify-center">
              <UserPlus size={32} className="text-white" strokeWidth={1.8} />{" "}
              {/* Lucide icon */}
            </div>
            <div>
              <p className="text-xl font-bold">{newPatientsToday}</p>
              <p className="text-sm">New Today</p>
            </div>
          </div>

          {/* Inactive Patients Card */}
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-6 rounded-xl shadow-md flex items-center space-x-4">
            {/* Icon for Inactive Patients (User Minus) - Redesigned */}
            <div className="flex-shrink-0 bg-yellow-700 bg-opacity-30 rounded-full p-3 flex items-center justify-center">
              <UserMinus size={32} className="text-white" strokeWidth={1.8} />{" "}
              {/* Lucide icon */}
            </div>
            <div>
              <p className="text-xl font-bold">{inactivePatients}</p>
              <p className="text-sm">Inactive Patients</p>
            </div>
          </div>
        </div>

        {/* Action Bar: Search, Filters, Add Button */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Search Input */}
          <div className="relative flex-grow w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search patients..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-white text-gray-900"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {/* Search Icon */}
              <Search
                size={20}
                className="text-gray-400"
                strokeWidth={1.8}
              />{" "}
              {/* Lucide icon */}
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center sm:justify-end space-x-2">
            {["All", "Active", "Inactive", "New"].map((item) => (
              <button
                key={item}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition duration-200
                  ${
                    filter === item
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Add New Patient Button */}
          <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded-xl shadow-md hover:bg-green-600 transition duration-200 w-full sm:w-auto justify-center">
            {/* Plus Icon */}
            <Plus size={20} className="mr-2" strokeWidth={2.5} />{" "}
            {/* Lucide icon */}
            Add New Patient
          </button>
        </div>

        {/* Patient List (Card Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col justify-between"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={patient.avatar}
                    alt={patient.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {patient.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{patient.email}</p>
                  </div>
                </div>

                <div className="text-sm text-gray-700 mb-4">
                  <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    {patient.phone}
                  </p>
                  <p>
                    <span className="font-semibold">Last Visit:</span>{" "}
                    {patient.lastVisit}
                  </p>
                </div>

                {/* Status and Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 pt-4 border-t border-gray-100 space-y-2 sm:space-y-0 sm:space-x-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      patient.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : patient.status === "New"
                        ? "bg-purple-100 text-purple-800"
                        : patient.status === "Inactive"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {patient.status}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition duration-200"
                      title="View Profile"
                    >
                      {/* View Profile Icon (Eye) */}
                      <Eye size={20} /> {/* Lucide icon */}
                    </button>
                    <button
                      className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition duration-200"
                      title="Schedule Appointment"
                    >
                      {/* Schedule Icon (Calendar with Plus) */}
                      <CalendarPlus size={20} /> {/* Lucide icon */}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-500 text-lg">
              No patients found for the selected filter or search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientManagementPage;
