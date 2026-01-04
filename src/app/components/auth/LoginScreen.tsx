import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { UserRole } from '../../App';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Activity, ArrowLeft } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (role: UserRole, name: string) => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [searchParams] = useSearchParams();
  const preselectedRole = searchParams.get('role') as UserRole | null;
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleQuickLogin = (role: UserRole, name: string) => {
    onLogin(role, name);
  };

  const getRoleName = (role: UserRole | null) => {
    if (!role) return null;
    const roleNames: Record<string, string> = {
      patient: 'Patient',
      doctor: 'Doctor',
      staff: 'Staff',
      lab: 'Lab Technician',
      pharmacy: 'Pharmacist',
      admin: 'Administrator',
    };
    return roleNames[role] || null;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
              <Activity className="w-10 h-10 text-white" />
            </div>
          </Link>
          <h1 className="text-3xl text-gray-900">HealthCare CMS</h1>
          {preselectedRole ? (
            <p className="text-sm text-gray-600">{getRoleName(preselectedRole)} Portal Login</p>
          ) : (
            <p className="text-sm text-gray-600">Access varies by role</p>
          )}
        </div>

        {/* Login Form */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Enter your credentials to access the system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email or Phone</Label>
              <Input 
                id="email" 
                type="text" 
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <Input 
                id="password" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled>
              Sign In
            </Button>
            
            {preselectedRole && (
              <Link to="/">
                <Button variant="ghost" className="w-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>

        {/* Quick Access for Demo */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-base">Quick Access (Demo)</CardTitle>
            <CardDescription>Click a role to explore the system</CardDescription>
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
              onClick={() => handleQuickLogin('doctor', 'Dr. Smith')}
              className="justify-start"
            >
              Doctor
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleQuickLogin('staff', 'Mary Reception')}
              className="justify-start"
            >
              Reception Staff
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
              Administrator
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}