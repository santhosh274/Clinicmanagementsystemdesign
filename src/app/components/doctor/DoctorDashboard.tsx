import { Routes, Route, Navigate } from 'react-router-dom';
import { Calendar, Pill, LayoutGrid } from 'lucide-react';
import DashboardLayout from '../shared/DashboardLayout';
import DoctorSchedule from './DoctorSchedule';
import PrescriptionFlow from './PrescriptionFlow';

interface DoctorDashboardProps {
  userName: string;
  onLogout: () => void;
}

export default function DoctorDashboard({ userName, onLogout }: DoctorDashboardProps) {
  const navigation = [
    { label: 'My Schedule', path: '/doctor', icon: <Calendar className="h-5 w-5" /> },
    { label: 'Quick Prescribe', path: '/doctor/prescribe', icon: <Pill className="h-5 w-5" /> },
  ];

  return (
    <DashboardLayout
      userName={userName}
      userRole="Doctor"
      navigation={navigation}
      onLogout={onLogout}
    >
      <Routes>
        <Route path="/" element={<DoctorSchedule />} />
        <Route path="/prescribe" element={<PrescriptionFlow />} />
        <Route path="*" element={<Navigate to="/doctor" replace />} />
      </Routes>
    </DashboardLayout>
  );
}
