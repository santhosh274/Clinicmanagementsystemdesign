import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import LoginScreen from './components/auth/LoginScreen';
import PatientPortal from './components/patient/PatientPortal';
import StaffDashboard from './components/staff/StaffDashboard';
import DoctorDashboard from './components/doctor/DoctorDashboard';
import LabDashboard from './components/lab/LabDashboard';
import PharmacyDashboard from './components/pharmacy/PharmacyDashboard';
import AdminDashboard from './components/admin/AdminDashboard';

export type UserRole = 'patient' | 'doctor' | 'staff' | 'lab' | 'pharmacy' | 'admin' | null;

function App() {
  const [currentUser, setCurrentUser] = useState<{ role: UserRole; name: string } | null>(null);

  const handleLogin = (role: UserRole, name: string) => {
    setCurrentUser({ role, name });
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            currentUser ? (
              <Navigate to={`/${currentUser.role}`} replace />
            ) : (
              <LoginScreen onLogin={handleLogin} />
            )
          } 
        />
        <Route 
          path="/patient/*" 
          element={
            currentUser?.role === 'patient' ? (
              <PatientPortal userName={currentUser.name} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        <Route 
          path="/staff/*" 
          element={
            currentUser?.role === 'staff' ? (
              <StaffDashboard userName={currentUser.name} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        <Route 
          path="/doctor/*" 
          element={
            currentUser?.role === 'doctor' ? (
              <DoctorDashboard userName={currentUser.name} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        <Route 
          path="/lab/*" 
          element={
            currentUser?.role === 'lab' ? (
              <LabDashboard userName={currentUser.name} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        <Route 
          path="/pharmacy/*" 
          element={
            currentUser?.role === 'pharmacy' ? (
              <PharmacyDashboard userName={currentUser.name} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        <Route 
          path="/admin/*" 
          element={
            currentUser?.role === 'admin' ? (
              <AdminDashboard userName={currentUser.name} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
