import React from 'react';
// This is the ONLY import for BillingHistoryTable.
import BillingHistoryTable from './BillingHistoryTable'; 

// Dummy data to populate the dashboard sections for visual
const dummyBillingHistory = [
  {
    id: 'inv001',
    type: 'Telemedicine',
    sendDate: '12/12/04',
    name: 'Rachel Mayers',
    recipient: 'American Family Insurance',
    amount: '$345.68',
    dueDate: '12/12/04',
    status: 'Requested',
    actions: ['view', 'send'], // Representing icons
  },
  {
    id: 'inv002',
    type: 'In clinic',
    sendDate: '12/12/04',
    name: 'Samantha Williams',
    recipient: 'Samantha Williams', // Self-pay example
    amount: '$345.68',
    dueDate: '-',
    status: 'Paid',
    actions: ['view', 'send'],
  },
  {
    id: 'inv003',
    type: 'Insurance',
    sendDate: '12/12/04',
    name: 'Amy White',
    recipient: '123234 GEICO',
    amount: '$345.68',
    dueDate: '12/12/04',
    status: 'Sent',
    actions: ['view', 'send'],
  },
  {
    id: 'inv004',
    type: 'In clinic',
    sendDate: '12/12/04',
    name: 'Tyler Young',
    recipient: 'Tyler Young',
    amount: '$345.68',
    dueDate: '-',
    status: 'Paid',
    actions: ['view', 'send'],
  },
  {
    id: 'inv005',
    type: 'Telemedicine',
    sendDate: '12/12/04',
    name: 'Rachel Mayers',
    recipient: 'American Family Insurance',
    amount: '$345.68',
    dueDate: '12/12/04',
    status: 'Requested',
    actions: ['view', 'send'],
  },
  {
    id: 'inv006',
    type: 'Insurance',
    sendDate: '12/12/04',
    name: 'Samantha Williams',
    recipient: '123234 GEICO',
    amount: '$345.68',
    dueDate: '12/12/04',
    status: 'Paid',
    actions: ['view', 'send'],
  },
];

const BillingPage = () => {
  const billingDataToDisplay = dummyBillingHistory; // Use local dummy data for visual

  return (
    // OUTermost container: Ensures the entire page content area has a white background and responsive padding
    <div className="p-4 sm:p-6 lg:p-8 w-full bg-white min-h-screen">
      {/* Main content block with shadow and rounded corners - this is the white card itself */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg"> {/* Adjusted padding here too */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Billing History</h2>

        {/* Top Section: Chart and Waiting for Bills cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column: Large Circular Chart */}
          {/* Ensure this card itself has the desired background color */}
          <div className="lg:col-span-1 bg-gray-50 p-6 rounded-xl flex flex-col items-center justify-center relative overflow-hidden">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 z-10">Waiting for bills</h3>
            {/* Visual approximation of the circular chart */}
            <div className="relative w-48 h-48 rounded-full flex items-center justify-center">
              {/* Outer circle background */}
              <div className="absolute inset-0 rounded-full border-8 border-gray-100"></div> 

              {/* Colored arcs - simplified with overlays and transform for positioning */}
              {/* Purple Arc (Largest) */}
              <div className="absolute inset-0 rounded-full border-8 border-purple-500" style={{
                clipPath: 'polygon(50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%, 50% 50%)', // Simulates a large segment
                transform: 'rotate(-45deg)', // Adjust rotation to align
                transformOrigin: '50% 50%',
                borderColor: '#8A2BE2' // Deep purple color
              }}></div>

              {/* Green Arc */}
              <div className="absolute inset-0 rounded-full border-8 border-green-500" style={{
                clipPath: 'polygon(0% 0%, 50% 0%, 50% 50%, 0% 50%)', // Simulates a quadrant
                transform: 'rotate(135deg)', // Position to green segment
                transformOrigin: '50% 50%',
                borderColor: '#3CB371' // Medium green color
              }}></div>

              {/* Yellow Arc */}
              <div className="absolute inset-0 rounded-full border-8 border-yellow-500" style={{
                clipPath: 'polygon(0% 0%, 50% 0%, 50% 50%, 0% 50%)', // Simulates a quadrant
                transform: 'rotate(270deg)', // Position to yellow segment
                transformOrigin: '50% 50%',
                borderColor: '#FFD700' // Gold color
              }}></div>

              {/* Inner circle with text */}
              <div className="absolute w-32 h-32 rounded-full bg-white flex flex-col items-center justify-center z-10 p-2">
                <span className="text-gray-600 text-sm font-semibold mb-1">Total income</span>
                <span className="text-2xl font-bold text-gray-800">$5,200.00</span>
              </div>

              {/* Tooltip-like element for the top-right segment */}
              <div className="absolute px-3 py-1 bg-purple-100 rounded-full text-xs font-semibold shadow-md text-purple-800"
                   style={{ top: '10%', right: '10%', transform: 'translate(50%, -50%)' }}>
                50% <br/> $2600
              </div>
            </div>
          </div>

          {/* Right Column: "Waiting for bills" cards */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title for this section moved here for proper placement */}
            <h3 className="text-xl font-semibold text-gray-800 mb-2 col-span-full">Waiting for bills</h3> 
            {/* Waiting for bills - Card 1 - NEW COLOR: bg-indigo-50 */}
            <div className="bg-indigo-50 p-4 rounded-lg shadow flex items-start space-x-4 border border-indigo-200">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-800">
                {/* Stethoscope icon */}
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M9.5 2A1.5 1.5 0 008 3.5v.75a.75.75 0 001.5 0v-.75c0-.414.336-.75.75-.75h.5a.75.75 0 00.75.75v.75a.75.75 0 001.5 0v-.75A1.5 1.5 0 0012.5 2h-3zM8 6a1 1 0 011-1h2a1 1 0 011 1v1a1 1 0 01-1 1h-2a1 1 0 01-1-1V6zm0 4a1 1 0 011-1h2a1 1 0 011 1v1a1 1 0 01-1 1h-2a1 1 0 01-1-1v-1zm-3-1a.75.75 0 01-.75-.75V8.5a.75.75 0 011.5 0V8.25A.75.75 0 015 7.5h.5a.75.75 0 00.75-.75v-.5a.75.75 0 00-1.5 0v.5a.75.75 0 01-.75.75H5zM15 7.5a.75.75 0 01-.75-.75v-.5a.75.75 0 00-1.5 0v.5a.75.75 0 01-.75.75h.5a.75.75 0 01.75.75v.5a.75.75 0 01-1.5 0V8.5a.75.75 0 01.75-.75H15zM4.75 14a.75.75 0 000 1.5h10.5a.75.75 0 000-1.5H4.75zM4 11a1 1 0 011-1h10a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4z" clipRule="evenodd"></path>
                </svg>
              </div>
              <div>
                <p className="text-gray-900 font-semibold">Samantha Williams</p>
                <p className="text-gray-600 text-sm">12NL - Routine Check-Up</p>
              </div>
              <div className="ml-auto flex flex-col items-end"> {/* Use flex-col to stack time and button */}
                {/* Time pill: Blue background, white text */}
                <span className="bg-blue-200 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full mb-1">09:35 AM</span>
                {/* Button: Changed to blue background, white text */}
                <button className="bg-blue-600 text-white text-xs px-3 py-1 rounded-md mt-1 hover:bg-blue-700">Request payment</button>
              </div>
            </div>
            {/* Waiting for bills - Card 2 - NEW COLOR: bg-teal-50 */}
            <div className="bg-teal-50 p-4 rounded-lg shadow flex items-start space-x-4 border border-teal-200">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-800">
                 {/* Video icon */}
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                   <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm6.5 2.5a.5.5 0 00-1 0v3.5a.5.5 0 00.8.4L11 11.2V9.8a.5.5 0 00-.5-.5H8.5z"/>
                 </svg>
              </div>
              <div>
                <p className="text-gray-900 font-semibold">Amy White</p>
                <p className="text-gray-600 text-sm">GECO - Video Consultation</p>
              </div>
              <div className="ml-auto flex flex-col items-end"> {/* Use flex-col to stack time and button */}
                {/* Time pill: Pink background, white text */}
                <span className="bg-pink-200 text-pink-800 text-xs font-semibold px-2 py-1 rounded-full mb-1">09:45 AM</span>
                {/* Button: Changed to blue background, white text */}
                <button className="bg-blue-600 text-white text-xs px-3 py-1 rounded-md mt-1 hover:bg-blue-700">Request payment</button>
              </div>
            </div>
          </div>
        </div>

        {/* Latest Transaction Section (Horizontal Scroll for cards) */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Latest transaction</h3>
          <div className="flex overflow-x-auto pb-4 custom-scrollbar">
            {/* Example Transaction Card 1 - NEW COLOR: bg-orange-50 */}
            <div className="flex-shrink-0 w-60 bg-orange-50 p-4 rounded-xl shadow mx-2 flex flex-col justify-between border border-orange-200">
              <p className="text-sm text-gray-700">1237T GEICO <span className="font-semibold text-green-700">+$568.56</span></p>
              <p className="text-xs text-gray-500">204565 InteleMed</p>
              <p className="text-xs text-gray-500 font-semibold">#3586895</p>
              <span className="text-xs text-gray-400 mt-2">15 min ago</span>
            </div>
            {/* Example Transaction Card 2 - NEW COLOR: bg-lime-50 */}
            <div className="flex-shrink-0 w-60 bg-lime-50 p-4 rounded-xl shadow mx-2 flex flex-col justify-between border border-lime-200">
              <p className="text-sm text-gray-700">2424N OnDrive <span className="font-semibold text-green-700">+$465.4</span></p>
              <p className="text-xs text-gray-500">304343 InteleMed</p>
              <p className="text-xs text-gray-500 font-semibold">#1244657</p>
              <span className="text-xs text-gray-400 mt-2">2 min ago</span>
            </div>
             {/* Example Transaction Card 3 - NEW COLOR: bg-fuchsia-50 */}
            <div className="flex-shrink-0 w-60 bg-fuchsia-50 p-4 rounded-xl shadow mx-2 flex flex-col justify-between border border-fuchsia-200">
              <p className="text-sm text-gray-700">1213T GEICO <span className="font-semibold text-green-700">+$547.4</span></p>
              <p className="text-xs text-gray-500">204343 InteleMed</p>
              <p className="text-xs text-gray-500 font-semibold">#5476856</p>
              <span className="text-xs text-gray-400 mt-2">10 min ago</span>
            </div>
            {/* Add more cards as needed */}
          </div>
        </div>

        {/* Main Content Area: Left Summary Cards and Right Transaction Table */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column: Summary Cards */}
          <div className="lg:col-span-1 flex flex-col space-y-6">
            {/* Payments Received Card */}
            <div className="bg-pink-100 p-6 rounded-xl shadow flex flex-col justify-between border border-pink-200">
              <div className="flex items-center space-x-2 mb-2">
                <svg className="w-6 h-6 text-pink-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v2h2a1 1 0 110 2H4v2h2a1 1 0 110 2H4v2h2a1 1 0 010 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path></svg>
                <h4 className="text-lg font-semibold text-gray-700">Payments received</h4>
              </div>
              <div className="flex justify-between items-end">
                <p className="text-3xl font-bold text-gray-900">$14,568</p>
                <span className="text-green-600 text-sm font-semibold">+13%</span>
              </div>
              <p className="text-xs text-gray-500">Total receipts value</p>
            </div>

            {/* Payments Requested Card */}
            <div className="bg-blue-100 p-6 rounded-xl shadow flex flex-col justify-between border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-7-4a7 7 0 008.232 4.673l-.401-1.423a1 1 0 01.378-1.127l1.304-.752c-.645-.663-1.396-1.196-2.203-1.56L10 11.414l-.604-.325A6.974 6.974 0 004 10a1 1 0 01-1-1v-.086a1 1 0 011-1h.086a.5.5 0 00.354-.146l2.35-2.35a1 1 0 011.414 0l1.414 1.414a1 1 0 010 1.414L10 9.414l-1.707 1.707a1 1 0 01-1.414 0L4.586 8.707a1 1 0 010-1.414l1.414-1.414A1 1 0 017 6h3a1 1 0 011 1v3a1 1 0 01-1 1z" clipRule="evenodd"></path></svg>
                <h4 className="text-lg font-semibold text-gray-700">Payments requested</h4>
              </div>
              <div className="flex justify-between items-end">
                <p className="text-3xl font-bold text-gray-900">$6,234</p>
                <span className="text-red-600 text-sm font-semibold">-6%</span>
              </div>
              <p className="text-xs text-gray-500">Total waiting payments value</p>
            </div>

            {/* Non Insurance Payments Card */}
            <div className="bg-yellow-100 p-6 rounded-xl shadow flex flex-col justify-between border border-yellow-200">
              <div className="flex items-center space-x-2 mb-2">
                <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2.293 2.293a1 1 0 00-1.414 1.414L7.586 10l-2.707 2.707a1 1 0 001.414 1.414L9 11.414l2.707 2.707a1 1 0 001.414-1.414L10.414 10l2.707-2.707a1 1 0 00-1.414-1.414L9 8.586 6.293 5.879z" clipRule="evenodd"></path></svg>
                <h4 className="text-lg font-semibold text-gray-700">Non insurance payments</h4>
              </div>
              <div className="flex justify-between items-end">
                <p className="text-3xl font-bold text-gray-900">$3,786</p>
                <span className="text-red-600 text-sm font-semibold">-17%</span>
              </div>
              <p className="text-xs text-gray-500">Total value of non covered by insurance payments</p>
            </div>
          </div>

          {/* Right Column: Transaction Table */}
          <div className="lg:col-span-3">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">All Transactions</h3>
            {/* Pass the dummy data to the BillingHistoryTable */}
            <BillingHistoryTable billingHistory={billingDataToDisplay} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
