
import React, { useState } from 'react';
import TimeSlot from './TimeSlot';
import Mascot from './Mascot';
import { Button } from '@/components/ui/button';
import { format, addDays, subDays, startOfDay, isToday, isTomorrow } from 'date-fns';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Mock data for time slots
const generateMockSlots = (date: Date) => {
  const isWeekend = [0, 6].includes(date.getDay());
  const timeSlots = [];
  
  // Start at 6 AM, end at 10 PM
  for (let hour = 6; hour <= 22; hour++) {
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    const period = hour < 12 ? 'AM' : 'PM';
    
    // More likely to be booked during peak hours (6-9 PM)
    let randomAvailability = Math.random();
    const isPeakHour = hour >= 18 && hour <= 21;
    const isBookedAlready = isPeakHour ? randomAvailability > 0.3 : randomAvailability > 0.7;
    
    // For demo purposes, make weekends more booked
    const available = isWeekend ? randomAvailability > 0.6 : !isBookedAlready;
    
    // Random spots left (1-4)
    const spotsLeft = Math.floor(Math.random() * 4) + 1;
    
    timeSlots.push({
      time: `${formattedHour}:00 ${period}`,
      available,
      price: 500, // Fixed price of Rs. 500
      spotsLeft
    });
  }
  
  return timeSlots;
};

const SlotGrid: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [slots, setSlots] = useState(generateMockSlots(new Date()));
  const [bookingSuccess, setBookingSuccess] = useState(false);
  
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setSlots(generateMockSlots(date));
    }
  };
  
  const handlePrevDay = () => {
    const newDate = subDays(selectedDate, 1);
    setSelectedDate(newDate);
    setSlots(generateMockSlots(newDate));
  };
  
  const handleNextDay = () => {
    const newDate = addDays(selectedDate, 1);
    setSelectedDate(newDate);
    setSlots(generateMockSlots(newDate));
  };
  
  const handleBookSlot = () => {
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 3000);
  };
  
  const getDateLabel = (date: Date) => {
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'EEEE');
  };
  
  return (
    <section id="slots" className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Available Slots</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Reserve your court time in advance. All slots are for one full hour of play.
          </p>
        </div>
        
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={handlePrevDay}
              className="rounded-full w-10 h-10 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal w-[240px] rounded-full",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  <span>{getDateLabel(selectedDate)}, {format(selectedDate, 'MMM d')}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateChange}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
            
            <Button
              variant="outline"
              onClick={handleNextDay}
              className="rounded-full w-10 h-10 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="hidden sm:block">
            <Mascot message="Pro tip: Early morning slots are usually less crowded!" type="info" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {slots.map((slot, index) => (
            <TimeSlot
              key={index}
              time={slot.time}
              available={slot.available}
              price={slot.price}
              spotsLeft={slot.spotsLeft}
              onBook={handleBookSlot}
            />
          ))}
        </div>
        
        {bookingSuccess && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full mx-4 animate-scale-in">
              <div className="mb-4 text-5xl">🎉</div>
              <h3 className="text-2xl font-bold mb-2">Booking Confirmed!</h3>
              <p className="text-gray-600 mb-6">Your court is reserved. Get ready to smash!</p>
              <Button 
                onClick={() => setBookingSuccess(false)}
                className="bg-academy-green hover:bg-academy-green/90 text-white rounded-full px-8"
              >
                Done
              </Button>
              
              {/* Confetti Animation */}
              <div className="confetti-container">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="confetti-piece"
                    style={{
                      left: `${Math.random() * 100}%`,
                      width: `${Math.random() * 10 + 5}px`,
                      height: `${Math.random() * 10 + 5}px`,
                      backgroundColor: ['#4ADE80', '#0EA5E9', '#F59E0B'][Math.floor(Math.random() * 3)],
                      animationDelay: `${Math.random() * 0.5}s`,
                      animationDuration: `${Math.random() * 3 + 2}s`,
                      animationName: 'confetti'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SlotGrid;
