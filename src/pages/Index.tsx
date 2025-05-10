
import React from 'react';
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SlotGrid from "@/components/SlotGrid";
import BookingForm from "@/components/BookingForm";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import AboutSection from "@/components/AboutSection";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
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
