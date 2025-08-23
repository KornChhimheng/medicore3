import React, { useState } from 'react';

const RegisterPatientForm = ({ db, userId }) => {
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);
    
    if (!fullName || !dob || !address) {
      setMessage('Please fill in all fields.');
      setIsError(true);
      return;
    }

    setIsSubmitting(true);
    // Simulate API call or Firestore interaction here
    setTimeout(() => {
      console.log('Registering patient:', { fullName, dob, address, userId }); // Log userId
      setMessage('Patient registered successfully!');
      setIsError(false);
      setFullName('');
      setDob('');
      setAddress('');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Register Patient</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            // Changed: Explicitly using text-black and placeholder-black
            className="w-full px-4 py-2 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black placeholder-black"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter full name"
          />
        </div>
        <div>
          <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            id="dob"
            // Changed: Explicitly using text-black
            className="w-full px-4 py-2 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <textarea
            id="address"
            rows="3"
            // Changed: Explicitly using text-black and placeholder-black
            className="w-full px-4 py-2 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-white text-black placeholder-black"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter patient's address"
          ></textarea>
        </div>
        {message && (
          <p className={`text-sm ${isError ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </p>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Registering...' : 'Register Patient'}
        </button>
      </form>
    </div>
  );
};

export default RegisterPatientForm;
