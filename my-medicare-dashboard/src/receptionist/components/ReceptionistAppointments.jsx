import React, { useState, useEffect } from "react";
import {
  appointmentAPI,
  patientAPI,
  doctorAPI,
} from "../../services/apiService.js";
import CreateAppointmentForm from "./CreateAppointmentForm.jsx";

const ReceptionistAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState({});
  const [doctors, setDoctors] = useState({});
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
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

  const handleAppointmentUpdated = () => {
    // Refresh appointments list after updating
    fetchAppointments();
    setShowEditForm(false);
    setEditingAppointment(null);
  };

  const handleEditAppointment = (appointment) => {
    setEditingAppointment(appointment);
    setShowEditForm(true);
  };

  const handleDeleteAppointment = async (appointmentId) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      try {
        await appointmentAPI.deleteAppointment(appointmentId);
        fetchAppointments(); // Refresh the appointment list
      } catch (err) {
        console.error("Error deleting appointment:", err);
        alert("Failed to delete appointment");
      }
    }
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

      {showCreateForm &&
        (Object.values(patients).length > 0 &&
        Object.values(doctors).length > 0 ? (
          <CreateAppointmentForm
            onAppointmentCreated={handleAppointmentCreated}
            patients={Object.values(patients)}
            doctors={Object.values(doctors)}
          />
        ) : (
          <div className="text-gray-500">Loading patients and doctors...</div>
        ))}

      {showEditForm && editingAppointment && (
        <EditAppointmentForm
          appointment={editingAppointment}
          patients={patients}
          doctors={doctors}
          onAppointmentUpdated={handleAppointmentUpdated}
          onCancel={() => {
            setShowEditForm(false);
            setEditingAppointment(null);
          }}
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
                            onClick={() => handleEditAppointment(appointment)}
                            className="text-green-600 hover:text-green-800 text-xs"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteAppointment(appointment.apptId)
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

// Edit form for appointments
const EditAppointmentForm = ({
  appointment,
  patients,
  doctors,
  onAppointmentUpdated,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    patientId: appointment.patientId,
    doctorId: appointment.doctorId,
    scheduledOn: appointment.scheduledOn
      ? new Date(appointment.scheduledOn).toISOString().slice(0, 16)
      : "",
    reason: appointment.reason || "",
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
      // Format the data the same way as in CreateAppointmentForm
      const scheduledDate = new Date(formData.scheduledOn);
      const formattedDateTime = scheduledDate.toISOString().slice(0, 19); // Remove milliseconds

      const appointmentData = {
        scheduledOn: formattedDateTime,
        doctorId: parseInt(formData.doctorId),
        patientId: parseInt(formData.patientId),
        reason: formData.reason,
      };

      console.log("Updating appointment with data:", appointmentData);

      await appointmentAPI.updateAppointment(
        appointment.apptId,
        appointmentData
      );
      onAppointmentUpdated();
    } catch (err) {
      console.error("Error updating appointment:", err);
      console.error("Error response:", err.response);
      alert(
        "Failed to update appointment: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Edit Appointment
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Patient
            </label>
            <select
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              required
            >
              <option value="">Select a patient</option>
              {Object.values(patients).map((patient) => (
                <option key={patient.patientId} value={patient.patientId}>
                  {patient.fullName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Doctor
            </label>
            <select
              name="doctorId"
              value={formData.doctorId}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              required
            >
              <option value="">Select a doctor</option>
              {Object.values(doctors).map((doctor) => (
                <option key={doctor.doctorId} value={doctor.doctorId}>
                  {doctor.user
                    ? `Dr. ${doctor.user.firstName} ${doctor.user.lastName}`
                    : `Dr. ${doctor.firstName} ${doctor.lastName}`}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date & Time
            </label>
            <input
              type="datetime-local"
              name="scheduledOn"
              value={formData.scheduledOn}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Reason
            </label>
            <input
              type="text"
              name="reason"
              value={formData.reason}
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
            Update Appointment
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReceptionistAppointments;
