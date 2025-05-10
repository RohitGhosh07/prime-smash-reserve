
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, CreditCard, Home, User } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();

  // Redirect to auth page if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  if (!user) return null;

  const menuItems = [
    {
      title: 'My Bookings',
      description: 'View and manage your court reservations',
      icon: <Calendar className="h-8 w-8 text-academy-blue" />,
      onClick: () => navigate('/profile'),
    },
    {
      title: 'Book a Court',
      description: 'Reserve your next badminton session',
      icon: <Clock className="h-8 w-8 text-academy-green" />,
      onClick: () => navigate('/#slots'),
    },
    {
      title: 'Payment Methods',
      description: 'Manage your payment options',
      icon: <CreditCard className="h-8 w-8 text-amber-500" />,
      onClick: () => navigate('/profile'),
    },
    {
      title: 'My Profile',
      description: 'Update your personal information',
      icon: <User className="h-8 w-8 text-purple-500" />,
      onClick: () => navigate('/profile'),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Welcome, {userProfile?.first_name || 'Player'}!</h1>
          <p className="text-gray-600 mt-2">What would you like to do today?</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuItems.map((item, index) => (
            <Card 
              key={index} 
              className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={item.onClick}
            >
              <CardHeader className="pb-3">
                {item.icon}
              </CardHeader>
              <CardContent>
                <CardTitle className="text-xl mb-2">{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Quick Stats</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Total Bookings</p>
              <p className="text-3xl font-bold text-academy-blue">4</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600">Upcoming Sessions</p>
              <p className="text-3xl font-bold text-academy-green">2</p>
            </div>
            <div className="p-4 bg-amber-50 rounded-lg">
              <p className="text-sm text-gray-600">Loyalty Points</p>
              <p className="text-3xl font-bold text-amber-600">250</p>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <Button 
              onClick={() => navigate('/')}
              className="bg-academy-blue hover:bg-academy-blue/90 text-white"
            >
              <Home className="mr-2 h-4 w-4" /> Return to Homepage
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
