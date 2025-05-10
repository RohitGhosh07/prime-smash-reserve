
import React from 'react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[url('/badminton-bg.jpg')] bg-cover bg-center opacity-10"></div>
      <div className="container mx-auto px-4 py-20 lg:py-32 relative z-10">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900">
            Prime Badminton Academy
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-700">
            <span className="font-semibold">Smash, Sweat, Repeat.</span> Join us for the ultimate badminton experience.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-academy-green hover:bg-academy-green/90 text-white px-8 py-6 text-lg rounded-full">
              Book a Slot
            </Button>
            <Button size="lg" variant="outline" className="border-academy-blue text-academy-blue hover:bg-academy-blue/10 px-8 py-6 text-lg rounded-full">
              View Courts
            </Button>
          </div>
          <div className="mt-8 inline-block bg-white/80 backdrop-blur-sm py-2 px-4 rounded-full shadow-md">
            <p className="text-academy-blue font-medium flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Currently Open • 8 Courts Available
            </p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
};

export default HeroSection;
