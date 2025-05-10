
import React from 'react';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-academy-green rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M17.7 3.2S16 1.9 12 2.5c-2.7.4-5.5 1.8-7.5 3.8A8.8 8.8 0 0 0 2 12c0 1.5.4 2.8 1.1 4"></path>
                  <path d="M9.2 21.5c4 .4 5.7-.9 5.7-.9"></path>
                  <path d="M13.4 7.2c-2.4-.7-4.3-.6-6.5.9-2 1.3-3.5 3.4-2.7 8.3l3.9.9 3-2.5"></path>
                  <path d="m21.5 2.3-8.5 10.3"></path>
                  <path d="m17 6-3.3 4"></path>
                </svg>
              </div>
              <span className="font-bold text-xl text-white">Prime Badminton</span>
            </div>
            <p className="mb-6">
              Your premier destination for world-class badminton facilities and vibrant community.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-academy-green transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-academy-green transition-colors">About Us</a></li>
              <li><a href="#slots" className="hover:text-academy-green transition-colors">Book Slots</a></li>
              <li><a href="#testimonials" className="hover:text-academy-green transition-colors">Testimonials</a></li>
              <li><a href="#location" className="hover:text-academy-green transition-colors">Location</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Services</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-academy-green transition-colors">Court Booking</a></li>
              <li><a href="#" className="hover:text-academy-green transition-colors">Coaching Lessons</a></li>
              <li><a href="#" className="hover:text-academy-green transition-colors">Equipment Shop</a></li>
              <li><a href="#" className="hover:text-academy-green transition-colors">Tournaments</a></li>
              <li><a href="#" className="hover:text-academy-green transition-colors">Corporate Events</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Quick Booking</h4>
            <p className="mb-4">Book your slot instantly</p>
            <Button className="bg-academy-green hover:bg-academy-green/90 text-white w-full mb-4">
              Book Now
            </Button>
            <p className="text-sm">
              Need assistance?<br />
              Call us at: +91 98765 43210
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Prime Badminton Academy. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="hover:text-academy-green transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-academy-green transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-academy-green transition-colors">Refund Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
