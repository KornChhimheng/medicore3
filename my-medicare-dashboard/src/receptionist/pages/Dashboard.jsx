import React, { useState, useEffect } from "react";
import { patientAPI } from "../../services/apiService";
import RegisterPatientForm from "../components/RegisterPatientForm.jsx";
import ReceptionistAppointments from "../components/ReceptionistAppointments.jsx";
import ReceptionistWelcomeCard from "../components/ReceptionistWelcomeCard.jsx";

const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [currentSection, setCurrentSection] = useState("patients"); // 'patients' or 'appointments'
  const [editingPatient, setEditingPatient] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  const refreshPatients = async () => {
    try {
      const response = await patientAPI.getPatients({ size: 500 });
      const normalized = response.data.map((p) => ({
        id: p.patientId,
        name: p.fullName,
        phone: p.contactNumber,
        bloodGroup: p.bloodGroup,
        allergies: p.allergies,
        email: p.email || "-",
        status: p.status,
      }));
      setPatients(normalized);
    } catch (err) {
      console.error("Error refreshing patients:", err);
    }
  };

  useEffect(() => {
    refreshPatients();
  }, []);

  const handleEditPatient = (patient) => {
    setEditingPatient(patient);
    setShowEditForm(true);
  };

  const handleDeletePatient = async (patientId) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      try {
        await patientAPI.deletePatient(patientId);
        refreshPatients(); // Refresh the patient list
      } catch (err) {
        console.error("Error deleting patient:", err);
        alert("Failed to delete patient");
      }
    }
  };

  const handlePatientUpdated = () => {
    setEditingPatient(null);
    setShowEditForm(false);
    refreshPatients(); // Refresh the patient list
  };

  return (
    <div className="p-8 w-full">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Receptionist Dashboard
      </h1>

      <ReceptionistWelcomeCard />

      {/* Navigation Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setCurrentSection("patients")}
          className={`px-4 py-2 rounded-lg font-medium ${
            currentSection === "patients"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Patients
        </button>
        <button
          onClick={() => setCurrentSection("appointments")}
          className={`px-4 py-2 rounded-lg font-medium ${
            currentSection === "appointments"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Appointments
        </button>
      </div>

      {/* Content based on selected section */}
      {currentSection === "patients" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Patient Management
            </h2>
            {showEditForm ? (
              <EditPatientForm
                patient={editingPatient}
                onPatientUpdated={handlePatientUpdated}
                onCancel={() => setShowEditForm(false)}
              />
            ) : (
              <RegisterPatientForm onPatientAdded={refreshPatients} />
            )}
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              All Patients
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Blood Group
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Allergies
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {patients.map((patient) => (
                    <tr key={patient.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {patient.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {patient.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {patient.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {patient.bloodGroup}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {patient.allergies}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleEditPatient(patient)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeletePatient(patient.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {currentSection === "appointments" && (
        <div className="space-y-6">
          <ReceptionistAppointments />
        </div>
      )}
    </div>
  );
};

// Simple edit form for patients
const EditPatientForm = ({ patient, onPatientUpdated, onCancel }) => {
  const [formData, setFormData] = useState({
    fullName: patient.name,
    email: patient.email,
    contactNumber: patient.phone,
    bloodGroup: patient.bloodGroup,
    allergies: patient.allergies,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await patientAPI.updatePatient(patient.id, {
        fullName: formData.fullName,
        email: formData.email,
        contactNumber: formData.contactNumber,
        bloodGroup: formData.bloodGroup,
        allergies: formData.allergies,
      });
      onPatientUpdated();
    } catch (err) {
      console.error("Error updating patient:", err);
      alert("Failed to update patient");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Blood Group
          </label>
          <input
            type="text"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Allergies
          </label>
          <input
            type="text"
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
          />
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Update Patient
        </button>
      </div>
    </form>
  );
};

export default Dashboard;
