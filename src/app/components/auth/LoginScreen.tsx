import { useState } from 'react';
import { UserRole } from '../../App';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface LoginScreenProps {
  onLogin: (role: UserRole, name: string) => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleQuickLogin = (role: UserRole, name: string) => {
    onLogin(role, name);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl text-gray-900">Clinic Management System</h1>
          <p className="text-sm text-gray-600">Access varies by role</p>
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
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button className="w-full" disabled>
              Sign In
            </Button>
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
