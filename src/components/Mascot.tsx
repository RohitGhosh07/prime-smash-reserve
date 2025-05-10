
import React from 'react';

interface MascotProps {
  message: string;
  type?: 'info' | 'alert' | 'success' | 'welcome';
}

const Mascot: React.FC<MascotProps> = ({ message, type = 'info' }) => {
  const getBgColor = () => {
    switch (type) {
      case 'alert':
        return 'bg-amber-100';
      case 'success':
        return 'bg-green-100';
      case 'welcome':
        return 'bg-purple-100';
      default:
        return 'bg-blue-100';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'alert':
        return 'text-amber-700';
      case 'success':
        return 'text-green-700';
      case 'welcome':
        return 'text-purple-700';
      default:
        return 'text-blue-700';
    }
  };

  return (
    <div className="mascot-tooltip">
      <div className={`flex items-center justify-center w-12 h-12 rounded-full ${getBgColor()} p-2`}>
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Shuttlecock body */}
          <circle cx="50" cy="50" r="30" fill="white" stroke="#333" strokeWidth="2" />
          <circle cx="40" cy="40" r="5" fill="#333" /> {/* Left eye */}
          <circle cx="60" cy="40" r="5" fill="#333" /> {/* Right eye */}
          
          {/* Smile */}
          <path d="M35 60 Q50 70 65 60" fill="none" stroke="#333" strokeWidth="3" strokeLinecap="round" />
          
          {/* Feathers */}
          <path d="M50 20 L30 5" stroke="#333" strokeWidth="3" strokeLinecap="round" />
          <path d="M50 20 L50 0" stroke="#333" strokeWidth="3" strokeLinecap="round" />
          <path d="M50 20 L70 5" stroke="#333" strokeWidth="3" strokeLinecap="round" />
          
          {/* Cork base */}
          <circle cx="50" cy="80" r="15" fill="#F9A826" stroke="#333" strokeWidth="2" />
        </svg>
      </div>
      <span className={`tooltiptext ${getTextColor()} bg-white shadow-lg border border-gray-100`}>
        {message}
      </span>
    </div>
  );
};

export default Mascot;
