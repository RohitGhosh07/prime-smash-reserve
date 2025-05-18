import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-green-700 flex items-center">
            <div className="mr-2 text-2xl">⛳</div>
            GolfClub Elite
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-green-700 transition-colors">Home</Link>
            <Link to="/#about" className="text-gray-600 hover:text-green-700 transition-colors">About</Link>
            <Link to="/#features" className="text-gray-600 hover:text-green-700 transition-colors">Course Features</Link>
            <Link to="/#amenities" className="text-gray-600 hover:text-green-700 transition-colors">Amenities</Link>
            <Link to="/#events" className="text-gray-600 hover:text-green-700 transition-colors">Events</Link>
            <Button variant="default" className="bg-green-700 hover:bg-green-800">
              Contact Us
            </Button>
          </div>
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-600 hover:text-green-700 focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {isOpen && (
          <div className="md:hidden pb-4 pt-2 border-t">
            <Link to="/" className="block py-2 text-gray-600 hover:text-green-700" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/#about" className="block py-2 text-gray-600 hover:text-green-700" onClick={() => setIsOpen(false)}>About</Link>
            <Link to="/#features" className="block py-2 text-gray-600 hover:text-green-700" onClick={() => setIsOpen(false)}>Course Features</Link>
            <Link to="/#amenities" className="block py-2 text-gray-600 hover:text-green-700" onClick={() => setIsOpen(false)}>Amenities</Link>
            <Link to="/#events" className="block py-2 text-gray-600 hover:text-green-700" onClick={() => setIsOpen(false)}>Events</Link>
            <Button variant="default" className="w-full mt-2 bg-green-700 hover:bg-green-800">
              Contact Us
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;