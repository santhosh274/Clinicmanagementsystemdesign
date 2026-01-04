import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  fallbackPath?: string;
  label?: string;
}

export default function BackButton({ fallbackPath, label = 'Back' }: BackButtonProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // Disable on dashboard/home pages
  const isDashboard = location.pathname === '/' ||
                      location.pathname.endsWith('/') || 
                      location.pathname.includes('/dashboard') ||
                      location.pathname.match(/\/(patient|doctor|staff|lab|pharmacy|admin)$/);

  const handleBack = () => {
    if (fallbackPath) {
      navigate(fallbackPath);
    } else {
      navigate(-1);
    }
  };

  if (isDashboard) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      onClick={handleBack}
      className="gap-2"
    >
      <ArrowLeft className="w-4 h-4" />
      {label}
    </Button>
  );
}