import React from 'react';

const InfoCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg flex items-center">
        <svg
          className="w-10 h-10 mr-4"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h.01M10 16h.01" />
        </svg>
        <div>
          <p className="text-lg">Appointments</p>
          <p className="text-4xl font-bold">2</p>
        </div>
      </div>

      <div className="bg-blue-400 text-white p-6 rounded-2xl shadow-lg flex items-center">
        <svg
          className="w-10 h-10 mr-4"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2L6 8v14h12V8L12 2zm0 2.828L15.172 8H8.828L12 4.828zM10 12h4v2h-4v-2z" />
        </svg>
        <div>
          <p className="text-lg">Prescriptions</p>
          <p className="text-4xl font-bold">4</p>
        </div>
      </div>

      <div className="bg-orange-400 text-white p-6 rounded-2xl shadow-lg flex items-center justify-between">
        <div>
          <p className="text-lg">Billing</p>
          <p className="text-2xl font-semibold">$150</p>
        </div>
        <p className="text-5xl font-extrabold">$150</p>
      </div>
    </div>
  );
};

export default InfoCards;
