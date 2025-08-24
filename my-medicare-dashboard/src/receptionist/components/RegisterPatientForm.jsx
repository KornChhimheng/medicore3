import React, { useState } from "react";
import { patientAPI } from "../../services/apiService.js";

const RegisterPatientForm = ({ onPatientAdded }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    contactNumber: "",
    city: "",
    country: "",
    bloodGroup: "",
    allergies: "",
    status: "NEW",
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
    const requiredFields = [
      "email",
      "password",
      "firstName",
      "lastName",
      "contactNumber",
    ];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      setMessage(
        `Please fill in all required fields: ${missingFields.join(", ")}`
      );
      setIsError(true);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage("Please enter a valid email address");
      setIsError(true);
      return;
    }

    // Validate contact number (9-15 digits)
    const contactRegex = /^\d{9,15}$/;
    if (!contactRegex.test(formData.contactNumber)) {
      setMessage("Contact number must contain 9-15 digits only");
      setIsError(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await patientAPI.addPatient(formData);
      console.log("Patient registered successfully:", response);

      if (onPatientAdded) {
        onPatientAdded();
      }

      setMessage("Patient registered successfully!");
      setIsError(false);

      // Reset form
      setFormData({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        contactNumber: "",
        city: "",
        country: "",
        bloodGroup: "",
        allergies: "",
        status: "NEW",
      });
    } catch (error) {
      console.error("Error registering patient:", error);
      setMessage(
        error.response?.data?.message ||
          "Failed to register patient. Please try again."
      );
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Register Patient
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black placeholder-gray-500"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter email address"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black placeholder-gray-500"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter password"
            required
          />
        </div>

        {/* First Name */}
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black placeholder-gray-500"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="Enter first name"
            required
          />
        </div>

        {/* Last Name */}
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black placeholder-gray-500"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Enter last name"
            required
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label
            htmlFor="dateOfBirth"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Date of Birth
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
          />
        </div>

        {/* Gender */}
        <div>
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
            value={formData.gender}
            onChange={handleInputChange}
          >
            <option value="">Select gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        {/* Contact Number */}
        <div>
          <label
            htmlFor="contactNumber"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Contact Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black placeholder-gray-500"
            value={formData.contactNumber}
            onChange={handleInputChange}
            placeholder="Enter contact number (9-15 digits)"
            required
          />
        </div>

        {/* City */}
        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black placeholder-gray-500"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="Enter city"
          />
        </div>

        {/* Country */}
        <div>
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black placeholder-gray-500"
            value={formData.country}
            onChange={handleInputChange}
            placeholder="Enter country"
          />
        </div>

        {/* Blood Group */}
        <div>
          <label
            htmlFor="bloodGroup"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Blood Group
          </label>
          <select
            id="bloodGroup"
            name="bloodGroup"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
            value={formData.bloodGroup}
            onChange={handleInputChange}
          >
            <option value="">Select blood group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        {/* Allergies */}
        <div>
          <label
            htmlFor="allergies"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Allergies
          </label>
          <textarea
            id="allergies"
            name="allergies"
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-white text-black placeholder-gray-500"
            value={formData.allergies}
            onChange={handleInputChange}
            placeholder="Enter allergies (if any)"
          ></textarea>
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
          {isSubmitting ? "Registering..." : "Register Patient"}
        </button>
      </form>
    </div>
  );
};

export default RegisterPatientForm;
