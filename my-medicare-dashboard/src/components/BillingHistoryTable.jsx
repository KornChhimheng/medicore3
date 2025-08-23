import React from "react";

// BillingHistoryTable component now accepts 'billingHistory' as a prop
const BillingHistoryTable = ({ billingHistory }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      {/* Filters and Search at the top of the table */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-4 sm:space-y-0">
        {/* Dropdown for "This week" */}
        <div className="relative">
          <select className="appearance-none bg-gray-100 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-blue-500">
            <option>This week</option>
            <option>Last month</option>
            <option>This year</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>

        {/* Toggle buttons - All, Telemedicine, In clinic, Insurance */}
        <div className="flex space-x-2 bg-gray-100 rounded-full p-1">
          {/* Active button style: bg-blue-600 text-white */}
          <button className="px-4 py-1 text-sm rounded-full bg-blue-600 text-white shadow">
            All
          </button>
          {/* Inactive button style: text-gray-700 hover:bg-gray-200, bg-gray-100 for default light background */}
          <button className="px-4 py-1 text-sm rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200">
            Telemedicine
          </button>
          <button className="px-4 py-1 text-sm rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200">
            In clinic
          </button>
          <button className="px-4 py-1 text-sm rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200">
            Insurance
          </button>
        </div>
      </div>

      {/* Outer div for table: Removed overflow-x-auto. Use table-fixed and w-full for consistent column widths. */}
      {/* If content is too long for a column, it will truncate with 'truncate' class or wrap without 'whitespace-nowrap' */}
      <table className="min-w-full divide-y divide-gray-200 table-fixed">
        <thead className="bg-white">
          <tr>
            {/* Adjusted widths to make columns fit within 100% */}
            <th
              scope="col"
              className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-[12%]"
            >
              Type
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-[12%]"
            >
              Send date
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-[15%]"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-[20%]"
            >
              Recipient
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-[10%]"
            >
              Amount
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-[12%]"
            >
              Due date
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-[10%]"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-[9%]"
            ></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {billingHistory.length > 0 ? (
            billingHistory.map((entry) => (
              <tr key={entry.id}>
                {/* Removed whitespace-nowrap from most cells to allow text wrapping if needed */}
                <td className="px-3 py-4 text-sm font-medium text-gray-900 overflow-hidden text-ellipsis">
                  {entry.type}
                </td>
                <td className="px-3 py-4 text-sm text-gray-600 overflow-hidden text-ellipsis">
                  {entry.sendDate}
                </td>
                <td className="px-3 py-4 text-sm text-gray-600 overflow-hidden text-ellipsis">
                  {entry.name}
                </td>
                <td className="px-3 py-4 text-sm text-gray-600 overflow-hidden text-ellipsis">
                  {entry.recipient}
                </td>
                <td className="px-3 py-4 text-sm font-semibold text-gray-900 overflow-hidden text-ellipsis">
                  {entry.amount}
                </td>
                <td className="px-3 py-4 text-sm text-gray-600 overflow-hidden text-ellipsis">
                  {entry.dueDate}
                </td>
                <td className="px-3 py-4 text-sm text-gray-600 overflow-hidden text-ellipsis">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      entry.status === "Paid"
                        ? "bg-green-100 text-green-800"
                        : entry.status === "Requested"
                        ? "bg-blue-100 text-blue-800"
                        : entry.status === "Sent"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {entry.status}
                  </span>
                </td>
                {/* Action Icons Column - kept whitespace-nowrap and flex-none for icons */}
                <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-1 flex-nowrap">
                    {" "}
                    {/* flex-nowrap to keep icons together */}
                    {/* View icon */}
                    <svg
                      className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    {/* Send icon */}
                    <svg
                      className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l4.415-1.565a1 1 0 00.707-.292l5.642-5.642a1 1 0 10-1.414-1.414L8.4 10.913l-3.376 1.196l-.969-3.037L10.894 2.553z"></path>
                    </svg>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="8"
                className="px-6 py-4 text-center text-sm text-gray-500"
              >
                No billing history found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BillingHistoryTable;
