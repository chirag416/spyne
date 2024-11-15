import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Car, UserCircle2 } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Car className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Car Management System</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            Welcome! Please login or register to manage your car inventory.
          </p>
          <div className="grid gap-4">
            <Button 
              variant="default" 
              className="w-full" 
              onClick={() => navigate("/login")}
            >
              <UserCircle2 className="mr-2 h-4 w-4" />
              Login
            </Button>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => navigate("/signup")}
            >
              Register
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;