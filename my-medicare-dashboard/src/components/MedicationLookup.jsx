import React, { useState } from 'react';

const MedicationLookup = ({
  medicationName,
  setMedicationName,
  medicationInfo,
  setMedicationInfo,
  isLoadingMedInfo,
  setIsLoadingMedInfo,
  medInfoError,
  setMedInfoError,
  getMedicationInformation,
}) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Medication Information Lookup ✨</h3>
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Enter medication name (e.g., Ibuprofen)"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800" // Added bg-white and text-gray-800 for explicit light scheme
          value={medicationName}
          onChange={(e) => setMedicationName(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              getMedicationInformation();
            }
          }}
        />
        <button
          onClick={getMedicationInformation}
          disabled={isLoadingMedInfo}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoadingMedInfo ? 'Loading...' : 'Get Info ✨'}
        </button>
      </div>
      {medInfoError && <p className="text-red-600 text-sm mb-4">{medInfoError}</p>}
      {medicationInfo && (
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
          <p className="text-gray-800 whitespace-pre-wrap">{medicationInfo}</p>
        </div>
      )}
    </div>
  );
};

export default MedicationLookup;
