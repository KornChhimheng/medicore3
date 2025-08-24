import React, { useState, useEffect } from "react";
import {
  appointmentAPI,
  patientAPI,
  doctorAPI,
} from "../services/apiService.js";
import CreateAppointmentForm from "./CreateAppointmentForm.jsx";

const ReceptionistAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState({});
  const [doctors, setDoctors] = useState({});
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [error, setError] = useState("");

  // Fetch appointments on component mount
  useEffect(() => {
    fetchAppointments();
    fetchPatientsAndDoctors();
  }, []);

  const fetchPatientsAndDoctors = async () => {
    try {
      // Fetch all patients and doctors to populate the lookup objects
      const patientsResponse = await patientAPI.getPatients();
      const doctorsResponse = await doctorAPI.getDoctors();

      console.log("Patients response:", patientsResponse);
      console.log("Doctors response:", doctorsResponse);

      const patientsMap = {};
      const doctorsMap = {};

      // Handle both direct response and nested data property
      const patientsData = patientsResponse.data || patientsResponse;
      const doctorsData = doctorsResponse.data || doctorsResponse;

      if (patientsData && Array.isArray(patientsData)) {
        patientsData.forEach((patient) => {
          patientsMap[patient.patientId] = patient;
        });
      }

      if (doctorsData && Array.isArray(doctorsData)) {
        doctorsData.forEach((doctor) => {
          if (doctor.user) {
            doctor.firstName = doctor.user.firstName;
            doctor.lastName = doctor.user.lastName;
          }
          doctorsMap[doctor.doctorId] = doctor;
        });
      }

      console.log("Patients map:", patientsMap);
      console.log("Doctors map:", doctorsMap);

      setPatients(patientsMap);
      setDoctors(doctorsMap);
    } catch (error) {
      console.error("Error fetching patients and doctors:", error);
    }
  };

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await appointmentAPI.getAppointments();
      console.log("Appointments response:", response);
      console.log("Appointments data:", response.data);

      // Handle both direct response and nested data property
      const appointmentsData = response.data || response;
      setAppointments(Array.isArray(appointmentsData) ? appointmentsData : []);
      setError("");
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setError("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  const handleAppointmentCreated = () => {
    // Refresh appointments list after creating a new one
    fetchAppointments();
    setShowCreateForm(false);
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "";
    const date = new Date(dateTimeString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading appointments...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-800">
          Appointments Management
        </h3>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition duration-300"
        >
          {showCreateForm ? "Cancel" : "Create Appointment"}
        </button>
      </div>

      {/* Create Appointment Form */}
      {showCreateForm && (
        <CreateAppointmentForm
          onAppointmentCreated={handleAppointmentCreated}
        />
      )}

      {/* Appointments Table */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Upcoming Appointments
        </h3>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div>
          <table className="min-w-full divide-y divide-gray-200 table-fixed">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4 rounded-tl-xl"
                >
                  Patient
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6"
                >
                  Time
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4"
                >
                  Doctor
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-auto rounded-tr-xl"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointments.length > 0 ? (
                appointments.map((appointment) => {
                  const { date, time } = formatDateTime(
                    appointment.scheduledOn
                  );
                  const patient = patients[appointment.patientId];
                  const doctor = doctors[appointment.doctorId];

                  console.log("Appointment:", appointment);
                  console.log(
                    "Patient ID:",
                    appointment.patientId,
                    "Patient:",
                    patient
                  );
                  console.log(
                    "Doctor ID:",
                    appointment.doctorId,
                    "Doctor:",
                    doctor
                  );

                  return (
                    <tr key={appointment.apptId}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 overflow-hidden text-ellipsis">
                        {patient
                          ? patient.fullName
                          : `Patient ID: ${appointment.patientId}`}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 overflow-hidden text-ellipsis">
                        {date}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 overflow-hidden text-ellipsis">
                        {time}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 overflow-hidden text-ellipsis">
                        {doctor
                          ? `Dr. ${doctor.fullName}`
                          : `Doctor ID: ${appointment.doctorId}`}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 overflow-hidden text-ellipsis">
                        <div className="flex space-x-2">
                          <button
                            onClick={() =>
                              console.log(
                                "View appointment:",
                                appointment.apptId
                              )
                            }
                            className="text-blue-600 hover:text-blue-800 text-xs"
                          >
                            View
                          </button>
                          <button
                            onClick={() =>
                              console.log(
                                "Edit appointment:",
                                appointment.apptId
                              )
                            }
                            className="text-green-600 hover:text-green-800 text-xs"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() =>
                              console.log(
                                "Delete appointment:",
                                appointment.apptId
                              )
                            }
                            className="text-red-600 hover:text-red-800 text-xs"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No appointments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReceptionistAppointments;
