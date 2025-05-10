
import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const LocationSection: React.FC = () => {
  return (
    <section id="location" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Find Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Conveniently located with ample parking space, we're just a short drive from the city center.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-academy-green/10 flex items-center justify-center mb-4">
              <MapPin className="text-academy-green" />
            </div>
            <h3 className="font-bold text-lg mb-2">Address</h3>
            <p className="text-gray-600">
              123 Sports Complex, Sector 15<br />
              City Center, 380015
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-academy-green/10 flex items-center justify-center mb-4">
              <Phone className="text-academy-green" />
            </div>
            <h3 className="font-bold text-lg mb-2">Contact</h3>
            <p className="text-gray-600">
              Phone: +91 98765 43210<br />
              Email: info@primebadminton.com
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-academy-green/10 flex items-center justify-center mb-4">
              <Clock className="text-academy-green" />
            </div>
            <h3 className="font-bold text-lg mb-2">Hours</h3>
            <p className="text-gray-600">
              Weekdays: 6:00 AM - 11:00 PM<br />
              Weekends: 5:00 AM - 11:00 PM
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
          <div className="aspect-video w-full">
            {/* Replace with actual Google Maps iframe */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.8219652911753!2d72.49594075!3d22.993148499999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84f521640d4b%3A0x6853686a4e0a35f1!2sSports%20Complex%2C%20Ahmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1652347508656!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              className="border-0" 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Prime Badminton Academy Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
