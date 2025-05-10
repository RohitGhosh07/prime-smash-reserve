
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, userProfile, signOut } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const getUserInitials = () => {
    if (userProfile && userProfile.first_name && userProfile.last_name) {
      return `${userProfile.first_name[0]}${userProfile.last_name[0]}`.toUpperCase();
    } else if (user && user.email) {
      return user.email[0].toUpperCase();
    }
    return "U";
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-academy-green flex items-center">
              <div className="mr-2 text-2xl">🏸</div>
              Prime Badminton
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/#slots" className="text-gray-600 hover:text-academy-green transition-colors">Book a Slot</Link>
            <Link to="/#about" className="text-gray-600 hover:text-academy-green transition-colors">About</Link>
            <Link to="/#testimonials" className="text-gray-600 hover:text-academy-green transition-colors">Testimonials</Link>
            <Link to="/#location" className="text-gray-600 hover:text-academy-green transition-colors">Location</Link>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="rounded-full p-0 h-9 w-9 border-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-academy-green text-white">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link to="/profile">
                    <DropdownMenuItem className="cursor-pointer">
                      Profile
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button size="sm" variant="default">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
          
          <div className="md:hidden flex items-center">
            {user && (
              <Link to="/profile" className="mr-4">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-academy-green text-white">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
              </Link>
            )}
            
            <button 
              onClick={toggleMenu}
              className="text-gray-600 hover:text-academy-green focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {isOpen && (
          <div className="md:hidden pb-4 pt-2 border-t">
            <Link to="/#slots" className="block py-2 text-gray-600" onClick={toggleMenu}>Book a Slot</Link>
            <Link to="/#about" className="block py-2 text-gray-600" onClick={toggleMenu}>About</Link>
            <Link to="/#testimonials" className="block py-2 text-gray-600" onClick={toggleMenu}>Testimonials</Link>
            <Link to="/#location" className="block py-2 text-gray-600" onClick={toggleMenu}>Location</Link>
            
            {!user && (
              <Link to="/auth" className="block py-2">
                <Button size="sm" variant="default" onClick={toggleMenu}>
                  Sign In
                </Button>
              </Link>
            )}
            
            {user && (
              <button 
                onClick={() => {
                  signOut();
                  toggleMenu();
                }}
                className="block w-full text-left py-2 text-red-600"
              >
                Sign Out
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
