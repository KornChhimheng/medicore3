import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../common/Sidebar";
import Header from "../common/Header";
import Dashboard from "./pages/Dashboard";
import PatientManagementPage from "./components/PatientManagementPage";

function ReceptionistApp() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex">
      <Sidebar userType="receptionist" sidebarOpen={sidebarOpen} />
      <div
        className={`transition-all duration-300 ease-in-out ${
          sidebarOpen ? "ml-64" : "ml-20"
        } flex-1`}
      >
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="patients" element={<PatientManagementPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default ReceptionistApp;
