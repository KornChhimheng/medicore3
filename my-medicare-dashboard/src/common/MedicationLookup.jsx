import React, { useState } from 'react';

const MedicationLookup = () => {
  const [medicationName, setMedicationName] = useState('');
  const [medicationInfo, setMedicationInfo] = useState('');
  const [isLoadingMedInfo, setIsLoadingMedInfo] = useState(false);
  const [medInfoError, setMedInfoError] = useState('');

  // Function to fetch medication information using Gemini API
  const getMedicationInformation = async () => {
    if (!medicationName.trim()) {
      setMedInfoError("Please enter a medication name.");
      setMedicationInfo(""); // Clear previous info if validation fails
      return;
    }

    setIsLoadingMedInfo(true);
    setMedInfoError(""); // Clear previous errors
    setMedicationInfo(""); // Clear previous info on new search

    try {
      const prompt = `Provide a concise summary about the medication "${medicationName}". Include its primary uses and common side effects.`;
      
      let chatHistory = [];
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });

      const payload = { contents: chatHistory };
      const apiKey = ""; // Canvas will automatically provide the API key
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const text = result.candidates[0].content.parts[0].text;
        setMedicationInfo(text);
      } else {
        setMedInfoError("Could not retrieve information. Please try again.");
        console.error("Gemini API response structure unexpected:", result);
      }
    } catch (error) {
      console.error("Error fetching medication info:", error);
      setMedInfoError("Failed to fetch information. Please check your network connection or try again later.");
    } finally {
      setIsLoadingMedInfo(false);
    }
  };
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
