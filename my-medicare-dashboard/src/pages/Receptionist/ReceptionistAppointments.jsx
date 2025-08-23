import React from 'react';

// This component will display appointments from a receptionist's perspective.
// It receives all appointments data as a prop.
const ReceptionistAppointments = ({ appointments }) => { // Accepts appointments prop
  // Note: The dummy data here is for illustration.
  // In a real application, this component would display 'appointments' passed via props.
  const dummyAppointments = [
    { id: 'app001', patientName: 'Lisa Carter', date: '04/25/2024', time: '10:00 AM', doctor: 'Dr. Smith', status: 'Confirmed' },
    { id: 'app002', patientName: 'John Doe', date: '04/25/2024', time: '10:30 AM', doctor: 'Dr. Johnson', status: 'Confirmed' },
    { id: 'app003', patientName: 'Emily Davis', date: '04/26/2024', time: '09:00 AM', doctor: 'Dr. Williams', status: 'Pending' },
    { id: 'app004', patientName: 'Michael Brown', date: '04/26/2024', time: '11:00 AM', doctor: 'Dr. Smith', status: 'Confirmed' },
    { id: 'app005', patientName: 'Jessica Alba', date: '04/27/2024', time: '01:00 PM', doctor: 'Dr. Emily', status: 'Pending' },
    { id: 'app006', patientName: 'Robert Downy', date: '04/27/2024', time: '02:00 PM', doctor: 'Dr. Strange', status: 'Confirmed' },
  ];

  // Use the 'appointments' prop if available, otherwise fallback to dummy data for display
  const displayAppointments = appointments && appointments.length > 0 ? appointments : dummyAppointments;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Appointments</h3>
      {/* Removed overflow-x-auto from here. The table will now control its layout. */}
      <div> 
        <table className="min-w-full divide-y divide-gray-200 table-fixed"> {/* Changed to table-fixed */}
          <thead className="bg-gray-50">
            <tr>
              {/* Adjusted column widths to fit within 100% */}
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4 rounded-tl-xl">
                Patient
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                Time
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                Doctor
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-auto rounded-tr-xl"> {/* w-auto for remaining space */}
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayAppointments.map((appointment) => (
              <tr key={appointment.id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 overflow-hidden text-ellipsis"> {/* Added overflow-hidden text-ellipsis */}
                  {appointment.patientName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 overflow-hidden text-ellipsis"> {/* Added overflow-hidden text-ellipsis */}
                  {appointment.date}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 overflow-hidden text-ellipsis"> {/* Added overflow-hidden text-ellipsis */}
                  {appointment.time}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 overflow-hidden text-ellipsis"> {/* Added overflow-hidden text-ellipsis */}
                  {appointment.doctor}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 overflow-hidden text-ellipsis"> {/* Added overflow-hidden text-ellipsis */}
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {appointment.status}
                  </span>
                </td>
              </tr>
            ))}
            {displayAppointments.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                  No upcoming appointments.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div> {/* End of wrapper div */}
    </div>
  );
};

export default ReceptionistAppointments;
