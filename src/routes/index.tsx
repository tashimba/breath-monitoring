import { Routes, Route, Navigate } from "react-router-dom";
import PatientsList from "../components/Patients/PatientsList";
import PatientDetails from "../components/Patients/PatientDetails";
import Profile from "../components/Profile";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/patients" replace />} />
      <Route path="/patients" element={<PatientsList />} />
      <Route path="/patients/:id" element={<PatientDetails />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};
