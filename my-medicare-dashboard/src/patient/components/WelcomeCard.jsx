import React from "react";
import doctorImage from "../../assets/doctor.png"; // Path is correct if doctor.png is in src/assets/

const WelcomeCard = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-2xl shadow-lg mb-8 flex items-center justify-between">
      <div>
        <p className="text-lg mb-1">Good Morning,</p>
        <h2 className="text-4xl font-extrabold mb-2">Miss. Vicheka</h2>
        <p className="text-xl">Welcome to your dashboard.</p>
      </div>
      {/* Using the imported image variable */}
      <img
        src={doctorImage}
        alt="Doctor Illustration"
        className="w-32 h-32 object-contain rounded-full"
      />
    </div>
  );
};

export default WelcomeCard;
