import React from 'react';

// Dummy data for prescriptions to populate the UI
const dummyPrescriptions = [
  {
    id: 'rx001',
    medication: 'Amoxicillin 250mg',
    patient: 'Alice Smith',
    doctor: 'Dr. Emily White',
    dosage: '1 capsule, 3 times a day',
    refills: 2,
    nextRefillDate: '2025-07-10',
    status: 'Active',
  },
  {
    id: 'rx002',
    medication: 'Lisinopril 10mg',
    patient: 'Bob Johnson',
    doctor: 'Dr. Mark Davis',
    dosage: '1 tablet, once a day',
    refills: 0, // Refills due
    nextRefillDate: '2025-06-28',
    status: 'Refill Due',
  },
  {
    id: 'rx003',
    medication: 'Simvastatin 20mg',
    patient: 'Charlie Brown',
    doctor: 'Dr. Emily White',
    dosage: '1 tablet, at night',
    refills: 5,
    nextRefillDate: '2025-08-15',
    status: 'Active',
  },
  {
    id: 'rx004',
    medication: 'Metformin 500mg',
    patient: 'Diana Prince',
    doctor: 'Dr. Sarah Lee',
    dosage: '2 tablets, twice a day',
    refills: 0, // Refills due
    nextRefillDate: '2025-06-25',
    status: 'Refill Due',
  },
  {
    id: 'rx005',
    medication: 'Ventolin HFA',
    patient: 'Eve Adams',
    doctor: 'Dr. Mark Davis',
    dosage: '2 puffs as needed',
    refills: 1,
    nextRefillDate: '2025-07-05',
    status: 'Active',
  },
  {
    id: 'rx006',
    medication: 'Zoloft 50mg',
    patient: 'Frank Miller',
    doctor: 'Dr. Sarah Lee',
    dosage: '1 tablet, once a day',
    refills: 3,
    nextRefillDate: '2025-08-01',
    status: 'Active',
  },
  {
    id: 'rx007',
    medication: 'Ibuprofen 400mg',
    patient: 'Grace Taylor',
    doctor: 'Dr. Emily White',
    dosage: '1 tablet, every 4-6 hours',
    refills: 0,
    nextRefillDate: '2025-06-10', // Past due, marked as Completed for example
    status: 'Completed',
  },
];

const PrescriptionsPage = () => {
  // State for filtering (active filter)
  const [filter, setFilter] = React.useState('All');
  // State for search query
  const [searchQuery, setSearchQuery] = React.useState('');

  // Filter and search prescriptions
  const filteredPrescriptions = dummyPrescriptions.filter(rx => {
    const matchesFilter = filter === 'All' || rx.status === filter;
    const matchesSearch = rx.medication.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          rx.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          rx.doctor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Calculate summary stats
  const activePrescriptions = dummyPrescriptions.filter(rx => rx.status === 'Active').length;
  const refillsDue = dummyPrescriptions.filter(rx => rx.status === 'Refill Due' && new Date(rx.nextRefillDate) <= new Date()).length;
  const upcomingRefills = dummyPrescriptions.filter(rx => rx.status === 'Active' && new Date(rx.nextRefillDate) > new Date()).length;


  return (
    // Overall page background: changed from bg-gray-50 to bg-white
    <div className="p-4 sm:p-6 lg:p-8 w-full bg-white min-h-screen font-inter">
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg"> {/* Main content white card */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Prescriptions Overview</h2>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Active Prescriptions Card */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-md flex items-center space-x-4">
            <div className="flex-shrink-0 bg-blue-700 bg-opacity-30 rounded-full p-3">
              {/* Icon for Active Prescriptions (Pill) */}
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.01 12.01 0 002 12c0 2.927 1.288 5.546 3.36 7.332A13.003 13.003 0 0012 21c2.927 0 5.546-1.288 7.332-3.36C20.712 15.546 22 12.927 22 12c0-2.927-1.288-5.546-3.36-7.332z"></path>
              </svg>
            </div>
            <div>
              <p className="text-xl font-bold">{activePrescriptions}</p>
              <p className="text-sm">Active Prescriptions</p>
            </div>
          </div>

          {/* Refills Due Card */}
          <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 rounded-xl shadow-md flex items-center space-x-4">
            <div className="flex-shrink-0 bg-red-700 bg-opacity-30 rounded-full p-3">
              {/* Icon for Refills Due (Exclamation Mark) */}
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.36 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
            </div>
            <div>
              <p className="text-xl font-bold">{refillsDue}</p>
              <p className="text-sm">Refills Due</p>
            </div>
          </div>

          {/* Upcoming Refills Card */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-md flex items-center space-x-4">
            <div className="flex-shrink-0 bg-purple-700 bg-opacity-30 rounded-full p-3">
              {/* Icon for Upcoming (Calendar) */}
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h.01M16 11h.01M9 15h.01M15 15h.01M4 20h16a2 2 0 002-2V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div>
              <p className="text-xl font-bold">{upcomingRefills}</p>
              <p className="text-sm">Upcoming Refills</p>
            </div>
          </div>
        </div>

        {/* Action Bar: Search, Filters, Add Button */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Search Input */}
          <div className="relative flex-grow w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search prescriptions..."
              // Added bg-white to ensure a white background
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-white text-gray-900" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {/* Search Icon */}
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center sm:justify-end space-x-2">
            {['All', 'Active', 'Refill Due', 'Completed'].map((item) => (
              <button
                key={item}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition duration-200
                  ${filter === item ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Add New Prescription Button */}
          <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded-xl shadow-md hover:bg-green-600 transition duration-200 w-full sm:w-auto justify-center">
            {/* Plus Icon */}
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            Add New
          </button>
        </div>

        {/* Prescriptions List (Card Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrescriptions.length > 0 ? (
            filteredPrescriptions.map((rx) => (
              <div key={rx.id} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{rx.medication}</h3>
                  <p className="text-gray-600 text-sm mb-1"><span className="font-semibold">Patient:</span> {rx.patient}</p>
                  <p className="text-gray-600 text-sm mb-1"><span className="font-semibold">Doctor:</span> {rx.doctor}</p>
                  <p className="text-gray-600 text-sm mb-1"><span className="font-semibold">Dosage:</span> {rx.dosage}</p>
                  <p className="text-gray-600 text-sm mb-3">
                    <span className="font-semibold">Refills:</span> {rx.refills === 0 ? 'None Left' : rx.refills}
                  </p>
                </div>
                
                {/* Status and Action Buttons */}
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      rx.status === 'Active' ? 'bg-green-100 text-green-800' :
                      rx.status === 'Refill Due' ? 'bg-red-100 text-red-800' :
                      rx.status === 'Completed' ? 'bg-gray-200 text-gray-700' :
                      'bg-yellow-100 text-yellow-800' // Default/other status
                    }`}
                  >
                    {rx.status}
                  </span>
                  <div className="flex space-x-2">
                    <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition duration-200" title="View Details">
                      {/* Eye Icon */}
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                    </button>
                    {rx.status === 'Refill Due' && (
                      <button className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition duration-200" title="Request Refill">
                        {/* Refresh/Refill Icon */}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 0020 12c0-4.418-3.582-8-8-8V1m0 0L8 5m4-4L16 5m0 0v5h2.286M20 16a8.001 8.001 0 01-13.626 5.658L4 20l4-4m0 0h5m-5 0V9"></path></svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-500 text-lg">
              No prescriptions found for the selected filter or search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrescriptionsPage;
