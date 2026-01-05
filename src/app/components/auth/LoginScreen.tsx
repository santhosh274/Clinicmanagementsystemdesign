import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserRole } from '../../App';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Activity, AlertCircle, Lock, Mail, User as UserIcon } from 'lucide-react';
import { toast } from 'sonner';

interface LoginScreenProps {
  onLogin: (role: UserRole, name: string) => void;
}

// Mock user database for demo
const mockUsers: Record<UserRole, { email: string; password: string; name: string }[]> = {
  patient: [
    { email: 'patient@demo.com', password: 'demo123', name: 'John Patient' },
    { email: '9876543210', password: 'demo123', name: 'John Patient' }
  ],
  doctor: [
    { email: 'doctor@demo.com', password: 'demo123', name: 'Dr. Sarah Smith' },
    { email: '9876543211', password: 'demo123', name: 'Dr. Sarah Smith' }
  ],
  staff: [
    { email: 'staff@demo.com', password: 'demo123', name: 'Mary Reception' },
    { email: '9876543212', password: 'demo123', name: 'Mary Reception' }
  ],
  lab: [
    { email: 'lab@demo.com', password: 'demo123', name: 'Lab Tech' },
    { email: '9876543213', password: 'demo123', name: 'Lab Tech' }
  ],
  pharmacy: [
    { email: 'pharmacy@demo.com', password: 'demo123', name: 'Pharmacist' },
    { email: '9876543214', password: 'demo123', name: 'Pharmacist' }
  ],
  admin: [
    { email: 'admin@demo.com', password: 'admin123', name: 'Admin User' },
    { email: '9876543215', password: 'admin123', name: 'Admin User' }
  ],
};

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole | ''>('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const roleHelperText: Record<UserRole, string> = {
    patient: 'Access patient portal, book appointments, view reports and e-prescriptions',
    doctor: 'Access consultation and e-prescription features, manage appointments',
    staff: 'Manage reception desk, patient check-in, and appointment scheduling',
    lab: 'Upload lab reports, manage test results and patient records',
    pharmacy: 'Scan QR codes, dispense medications, view e-prescriptions',
    admin: 'Full system access, user management, and analytics dashboard',
  };

  const validateEmail = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const validatePhone = (value: string): boolean => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(value);
  };

  const isFormValid = (): boolean => {
    return (
      selectedRole !== '' &&
      emailOrPhone.trim() !== '' &&
      password.trim() !== '' &&
      (validateEmail(emailOrPhone) || validatePhone(emailOrPhone))
    );
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedRole) {
      toast.error('Please select a role to continue');
      return;
    }

    if (!isFormValid()) {
      toast.error('Please fill in all fields correctly');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const users = mockUsers[selectedRole as UserRole];
      const user = users.find(
        (u) => (u.email === emailOrPhone || u.email === emailOrPhone) && u.password === password
      );

      if (user) {
        toast.success(`Welcome back, ${user.name}!`);
        onLogin(selectedRole as UserRole, user.name);
      } else {
        toast.error('Selected role does not match credentials. Please check and try again.');
      }

      setIsLoading(false);
    }, 1000);
  };

  const handleQuickLogin = (role: UserRole, name: string) => {
    toast.success(`Welcome back, ${name}!`);
    onLogin(role, name);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
              <Activity className="w-10 h-10 text-white" />
            </div>
          </Link>
          <h1 className="text-3xl text-gray-900">HealthCare CMS</h1>
          <p className="text-sm text-gray-600">Secure role-based access to healthcare services</p>
        </div>

        {/* Login Form */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Select your role and enter credentials</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Role Selection - MANDATORY */}
              <div className="space-y-2">
                <Label htmlFor="role" className="flex items-center gap-2">
                  <UserIcon className="w-4 h-4" />
                  Login As <span className="text-red-500">*</span>
                </Label>
                <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value as UserRole)}>
                  <SelectTrigger id="role" className={!selectedRole ? 'text-gray-400' : ''}>
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="patient">Patient</SelectItem>
                    <SelectItem value="doctor">Doctor</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="lab">Lab Technician</SelectItem>
                    <SelectItem value="pharmacy">Pharmacist</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                
                {/* Role-specific helper text */}
                {selectedRole && (
                  <p className="text-xs text-blue-600 flex items-start gap-1 mt-1">
                    <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    <span>{roleHelperText[selectedRole as UserRole]}</span>
                  </p>
                )}
              </div>

              {/* Email or Phone */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email or Mobile Number
                </Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="your@email.com or 10-digit mobile"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  disabled={!selectedRole}
                  className={!selectedRole ? 'bg-gray-100 cursor-not-allowed' : ''}
                />
                {emailOrPhone && !validateEmail(emailOrPhone) && !validatePhone(emailOrPhone) && (
                  <p className="text-xs text-red-600">Please enter a valid email or 10-digit mobile number</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Password
                  </Label>
                  <Link 
                    to={`/forgot-password${selectedRole ? `?role=${selectedRole}` : ''}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={!selectedRole}
                  className={!selectedRole ? 'bg-gray-100 cursor-not-allowed' : ''}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={!isFormValid() || isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>

              {/* Demo credentials hint */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-900">
                <p className="font-medium mb-1">Demo Credentials:</p>
                <p>Email: {selectedRole ? `${selectedRole}@demo.com` : 'Select role first'}</p>
                <p>Password: {selectedRole === 'admin' ? 'admin123' : 'demo123'}</p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Quick Access for Demo */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-base">Quick Access (Demo)</CardTitle>
            <CardDescription>Click a role to explore the system instantly</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={() => handleQuickLogin('patient', 'John Patient')}
              className="justify-start"
            >
              Patient Portal
            </Button>
            <Button
              variant="outline"
              onClick={() => handleQuickLogin('doctor', 'Dr. Sarah Smith')}
              className="justify-start"
            >
              Doctor
            </Button>
            <Button
              variant="outline"
              onClick={() => handleQuickLogin('staff', 'Mary Reception')}
              className="justify-start"
            >
              Staff
            </Button>
            <Button
              variant="outline"
              onClick={() => handleQuickLogin('lab', 'Lab Tech')}
              className="justify-start"
            >
              Lab Technician
            </Button>
            <Button
              variant="outline"
              onClick={() => handleQuickLogin('pharmacy', 'Pharmacist')}
              className="justify-start"
            >
              Pharmacist
            </Button>
            <Button
              variant="outline"
              onClick={() => handleQuickLogin('admin', 'Admin User')}
              className="justify-start"
            >
              Admin
            </Button>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center">
          <Link to="/" className="text-sm text-gray-600 hover:text-blue-600">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}