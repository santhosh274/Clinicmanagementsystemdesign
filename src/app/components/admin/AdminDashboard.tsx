import { Routes, Route, Navigate } from 'react-router-dom';
import { Users, Settings, LayoutGrid } from 'lucide-react';
import DashboardLayout from '../shared/DashboardLayout';
import RoleManagement from './RoleManagement';

interface AdminDashboardProps {
  userName: string;
  onLogout: () => void;
}

export default function AdminDashboard({ userName, onLogout }: AdminDashboardProps) {
  const navigation = [
    { label: 'Role Management', path: '/admin', icon: <Users className="h-5 w-5" /> },
    { label: 'Settings', path: '/admin/settings', icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <DashboardLayout
      userName={userName}
      userRole="Administrator"
      navigation={navigation}
      onLogout={onLogout}
    >
      <Routes>
        <Route path="/" element={<RoleManagement />} />
        <Route path="/settings" element={<div className="text-gray-600">Settings coming soon...</div>} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </DashboardLayout>
  );
}
