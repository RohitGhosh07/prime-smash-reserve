
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TimeSlotProps {
  time: string;
  available: boolean;
  price: number;
  spotsLeft: number;
  onBook: () => void;
}

const TimeSlot: React.FC<TimeSlotProps> = ({ time, available, price, spotsLeft, onBook }) => {
  return (
    <div className={cn(
      "slot-card p-6 rounded-xl shadow-md transition-all duration-300",
      available ? "bg-white border border-gray-100" : "bg-gray-100"
    )}>
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-lg">{time}</h3>
        {spotsLeft <= 2 && available && (
          <span className="badge-bounce inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
            {spotsLeft === 1 ? "Last spot!" : `${spotsLeft} spots left!`}
          </span>
        )}
      </div>
      
      <div className="mb-4">
        <p className="text-xl font-bold text-gray-900">₹{price}</p>
        <p className="text-sm text-gray-500">per hour</p>
      </div>
      
      <Button 
        onClick={onBook}
        disabled={!available}
        className={cn(
          "w-full rounded-full",
          available 
            ? "bg-academy-green hover:bg-academy-green/90 text-white" 
            : "bg-gray-300 text-gray-600 cursor-not-allowed"
        )}
      >
        {available ? "Book Slot" : "Unavailable"}
      </Button>
    </div>
  );
};

export default TimeSlot;
