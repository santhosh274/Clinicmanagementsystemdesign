import { Routes, Route, Navigate } from 'react-router-dom';
import { Calendar, FileText, Activity, Home } from 'lucide-react';
import DashboardLayout from '../shared/DashboardLayout';
import PatientHome from './PatientHome';
import AppointmentBooking from './AppointmentBooking';
import AppointmentStatus from './AppointmentStatus';
import ReportDownload from './ReportDownload';

interface PatientPortalProps {
  userName: string;
  onLogout: () => void;
}

export default function PatientPortal({ userName, onLogout }: PatientPortalProps) {
  const navigation = [
    { label: 'Home', path: '/patient', icon: <Home className="h-5 w-5" /> },
    { label: 'Book Appointment', path: '/patient/book', icon: <Calendar className="h-5 w-5" /> },
    { label: 'Appointment Status', path: '/patient/status', icon: <Activity className="h-5 w-5" /> },
    { label: 'My Reports', path: '/patient/reports', icon: <FileText className="h-5 w-5" /> },
  ];

  return (
    <DashboardLayout
      userName={userName}
      userRole="Patient"
      navigation={navigation}
      onLogout={onLogout}
    >
      <Routes>
        <Route path="/" element={<PatientHome />} />
        <Route path="/book" element={<AppointmentBooking />} />
        <Route path="/status" element={<AppointmentStatus />} />
        <Route path="/reports" element={<ReportDownload />} />
        <Route path="*" element={<Navigate to="/patient" replace />} />
      </Routes>
    </DashboardLayout>
  );
}
