
import React from 'react';
import { Button } from "@/components/ui/button";

const Navbar: React.FC = () => {
  return (
    <nav className="w-full py-4 bg-white shadow-sm">
      <div className="container flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-academy-green rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M17.7 3.2S16 1.9 12 2.5c-2.7.4-5.5 1.8-7.5 3.8A8.8 8.8 0 0 0 2 12c0 1.5.4 2.8 1.1 4"></path>
              <path d="M9.2 21.5c4 .4 5.7-.9 5.7-.9"></path>
              <path d="M13.4 7.2c-2.4-.7-4.3-.6-6.5.9-2 1.3-3.5 3.4-2.7 8.3l3.9.9 3-2.5"></path>
              <path d="m21.5 2.3-8.5 10.3"></path>
              <path d="m17 6-3.3 4"></path>
            </svg>
          </div>
          <span className="font-bold text-xl">Prime Badminton</span>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <a href="#slots" className="text-gray-600 hover:text-academy-green transition-colors">Book Slots</a>
          <a href="#about" className="text-gray-600 hover:text-academy-green transition-colors">About</a>
          <a href="#testimonials" className="text-gray-600 hover:text-academy-green transition-colors">Testimonials</a>
          <a href="#location" className="text-gray-600 hover:text-academy-green transition-colors">Location</a>
        </div>
        <Button className="bg-academy-blue hover:bg-academy-blue/90 text-white">
          Book Now
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
