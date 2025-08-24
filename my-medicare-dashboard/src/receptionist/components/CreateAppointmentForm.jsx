import React, { useState } from "react";
import { appointmentAPI } from "../../services/apiService.js";

const CreateAppointmentForm = ({
  onAppointmentCreated,
  patients = [],
  doctors = [],
}) => {
  const [formData, setFormData] = useState({
    scheduledOn: "",
    doctorId: "",
    patientId: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    // Validate required fields
    if (!formData.scheduledOn || !formData.doctorId || !formData.patientId) {
      setMessage("Please fill in all required fields");
      setIsError(true);
      return;
    }

    // Validate that scheduled date is in the future
    const scheduledDate = new Date(formData.scheduledOn);
    const now = new Date();
    if (scheduledDate <= now) {
      setMessage("Appointment must be scheduled for a future date and time");
      setIsError(true);
      return;
    }

    // Debug: Log the data being sent
    console.log("Sending appointment data:", formData);
    console.log("Data types:", {
      scheduledOn: typeof formData.scheduledOn,
      doctorId: typeof formData.doctorId,
      patientId: typeof formData.patientId,
    });

    setIsSubmitting(true);

    try {
      // Convert string IDs to numbers if needed
      // Format datetime to match backend expectation (YYYY-MM-DDTHH:mm:ss)
      const scheduledDate = new Date(formData.scheduledOn);
      const formattedDateTime = scheduledDate.toISOString().slice(0, 19); // Remove milliseconds

      const appointmentData = {
        scheduledOn: formattedDateTime,
        doctorId: parseInt(formData.doctorId),
        patientId: parseInt(formData.patientId),
      };

      console.log("Formatted appointment data:", appointmentData);

      const response = await appointmentAPI.addAppointment(appointmentData);
      console.log("Appointment created successfully:", response);
      setMessage("Appointment created successfully!");
      setIsError(false);

      // Reset form
      setFormData({
        scheduledOn: "",
        doctorId: "",
        patientId: "",
      });

      // Notify parent component to refresh appointments
      if (onAppointmentCreated) {
        onAppointmentCreated();
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      console.error("Error response:", error.response);
      console.error("Error message:", error.message);
      setMessage(
        error.response?.data?.message ||
          "Failed to create appointment. Please try again."
      );
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Create New Appointment
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Date and Time */}
        <div>
          <label
            htmlFor="scheduledOn"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Date & Time <span className="text-red-500">*</span>
          </label>
          <input
            type="datetime-local"
            id="scheduledOn"
            name="scheduledOn"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
            value={formData.scheduledOn}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Doctor Selection */}
        <div>
          <label
            htmlFor="doctorId"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Doctor <span className="text-red-500">*</span>
          </label>
          <select
            id="doctorId"
            name="doctorId"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
            value={formData.doctorId}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.doctorId} value={doctor.doctorId}>
                Dr. {doctor.fullName} - {doctor.specialization}
              </option>
            ))}
          </select>
        </div>

        {/* Patient Selection */}
        <div>
          <label
            htmlFor="patientId"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Patient <span className="text-red-500">*</span>
          </label>
          <select
            id="patientId"
            name="patientId"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
            value={formData.patientId}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a patient</option>
            {patients.map((patient) => (
              <option key={patient.patientId} value={patient.patientId}>
                {patient.fullName} - {patient.contactNumber}
              </option>
            ))}
          </select>
        </div>

        {message && (
          <p
            className={`text-sm ${isError ? "text-red-600" : "text-green-600"}`}
          >
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Creating..." : "Create Appointment"}
        </button>
      </form>
    </div>
  );
};

export default CreateAppointmentForm;
