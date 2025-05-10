
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SlotGrid from "@/components/SlotGrid";
import BookingForm from "@/components/BookingForm";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import AboutSection from "@/components/AboutSection";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Index: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      
      {user && (
        <div className="bg-academy-blue text-white py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <p className="text-lg">Welcome back! Ready to hit the court?</p>
            <Button 
              onClick={() => navigate('/dashboard')} 
              variant="outline" 
              className="text-white border-white hover:bg-white hover:text-academy-blue"
            >
              Go to Dashboard
            </Button>
          </div>
        </div>
      )}
      
      <SlotGrid />
      <BookingForm />
      <TestimonialsCarousel />
      <AboutSection />
      <LocationSection />
      <Footer />
    </div>
  );
};

export default Index;
