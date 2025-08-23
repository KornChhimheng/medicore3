import React, { useState, useEffect } from 'react';
import RegisterPatientForm from '../components/RegisterPatientForm.jsx';
import ReceptionistAppointments from '../components/ReceptionistAppointments.jsx';
import ReceptionistWelcomeCard from '../components/ReceptionistWelcomeCard.jsx';

const ReceptionistDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [currentSection, setCurrentSection] = useState('patients'); // 'patients' or 'appointments'

  // Mock data for now - will be replaced with API calls
  useEffect(() => {
    // TODO: Replace with actual API calls
    setPatients([
      { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', bloodGroup: 'A+', allergies: 'None' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321', bloodGroup: 'O-', allergies: 'Penicillin' },
    ]);
  }, []);

  return (
    <div className="p-8 w-full">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Receptionist Dashboard</h1>
      
      <ReceptionistWelcomeCard />

      {/* Navigation Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setCurrentSection('patients')}
          className={`px-4 py-2 rounded-lg font-medium ${
            currentSection === 'patients'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Patients
        </button>
        <button
          onClick={() => setCurrentSection('appointments')}
          className={`px-4 py-2 rounded-lg font-medium ${
            currentSection === 'appointments'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Appointments
        </button>
      </div>

      {/* Content based on selected section */}
      {currentSection === 'patients' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Patient Management</h2>
            <RegisterPatientForm />
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">All Patients</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Group</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Allergies</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {patients.map((patient) => (
                    <tr key={patient.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{patient.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.bloodGroup}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{patient.allergies}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {currentSection === 'appointments' && (
        <div className="space-y-6">
          <ReceptionistAppointments />
        </div>
      )}
    </div>
  );
};

export default ReceptionistDashboard;
