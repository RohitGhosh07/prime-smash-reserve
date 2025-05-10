
import React from 'react';
import { Button } from '@/components/ui/button';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl font-bold mb-6">About Prime Badminton Academy</h2>
            <p className="text-gray-700 mb-6 text-lg">
              Established in 2018, Prime Badminton Academy has quickly become the go-to destination for badminton enthusiasts of all skill levels in the city.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-academy-green/10 flex items-center justify-center mt-1 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-academy-green">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Professional-Grade Courts</h3>
                  <p className="text-gray-600">8 international standard courts with premium flooring and lighting</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-academy-green/10 flex items-center justify-center mt-1 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-academy-green">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Expert Coaching</h3>
                  <p className="text-gray-600">Trained coaches available for players of all ages and skill levels</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-academy-green/10 flex items-center justify-center mt-1 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-academy-green">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Modern Amenities</h3>
                  <p className="text-gray-600">Changing rooms, equipment shop, and refreshment area</p>
                </div>
              </div>
            </div>
            <Button className="bg-academy-blue hover:bg-academy-blue/90 text-white rounded-full px-8">
              Learn More
            </Button>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-academy-green/20 rounded-full z-0"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-academy-blue/20 rounded-full z-0"></div>
              <img 
                src="https://images.unsplash.com/photo-1613918618042-ae2dce541d42?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
                alt="Badminton Court" 
                className="rounded-2xl shadow-lg relative z-10 w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
