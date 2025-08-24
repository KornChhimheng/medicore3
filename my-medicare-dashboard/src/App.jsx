import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PatientApp from "./patient/PatientApp";
import ReceptionistApp from "./receptionist/ReceptionistApp";

function App() {
  return (
    <Router>
      <Routes>
        {/* redirect root to patient for now */}
        <Route path="/" element={<Navigate to="/patient" />} />

        {/* patient routes */}
        <Route path="/patient/*" element={<PatientApp />} />

        {/* receptionist routes */}
        <Route path="/receptionist/*" element={<ReceptionistApp />} />
      </Routes>
    </Router>
  );
}

export default App;
