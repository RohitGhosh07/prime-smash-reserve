
import React, { useState, useEffect } from 'react';
import TimeSlot from './TimeSlot';
import Mascot from './Mascot';
import { Button } from '@/components/ui/button';
import { format, addDays, subDays, startOfDay, isToday, isTomorrow, parseISO } from 'date-fns';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

interface Slot {
  time: string;
  formattedHour: number;
  period: string;
  available: boolean;
  price: number;
  spotsLeft: number;
}

// Generate all possible time slots
const generateTimeSlots = () => {
  const timeSlots: Slot[] = [];
  
  // Start at 6 AM, end at 10 PM
  for (let hour = 6; hour <= 22; hour++) {
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    const period = hour < 12 ? 'AM' : 'PM';
    
    timeSlots.push({
      time: `${formattedHour}:00 ${period}`,
      formattedHour,
      period,
      available: true, // Default to available
      price: 500, // Fixed price of Rs. 500
      spotsLeft: 4 // Default spots
    });
  }
  
  return timeSlots;
};

const SlotGrid: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [slots, setSlots] = useState<Slot[]>(generateTimeSlots());
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const { toast } = useToast();
  const { user, userProfile } = useAuth();
  
  // Fetch booked slots whenever date changes
  useEffect(() => {
    fetchBookedSlots(selectedDate);
  }, [selectedDate]);

  const fetchBookedSlots = async (date: Date) => {
    try {
      const formattedDate = format(date, 'yyyy-MM-dd');
      
      const { data: bookings, error } = await supabase
        .from('bookings')
        .select('start_time')
        .eq('booking_date', formattedDate);
        
      if (error) {
        console.error('Error fetching booked slots:', error);
        return;
      }
      
      // Generate fresh slots
      let updatedSlots = generateTimeSlots();
      
      // Mark booked slots as unavailable
      if (bookings && bookings.length > 0) {
        updatedSlots = updatedSlots.map(slot => {
          // Convert slot time (e.g., "6:00 AM") to database format for comparison
          const hour = slot.period === 'AM' 
            ? (slot.formattedHour === 12 ? 0 : slot.formattedHour) 
            : (slot.formattedHour === 12 ? 12 : slot.formattedHour + 12);
          
          const slotTimeDb = `${hour.toString().padStart(2, '0')}:00:00`;
          
          const isBooked = bookings.some(booking => booking.start_time === slotTimeDb);
          
          return {
            ...slot,
            available: !isBooked,
            // If booked, set spotsLeft to 0, otherwise random between 1-4
            spotsLeft: isBooked ? 0 : Math.floor(Math.random() * 4) + 1
          };
        });
      }
      
      setSlots(updatedSlots);
    } catch (error) {
      console.error('Failed to fetch booked slots:', error);
    }
  };
  
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
    }
  };
  
  const handlePrevDay = () => {
    const newDate = subDays(selectedDate, 1);
    setSelectedDate(newDate);
  };
  
  const handleNextDay = () => {
    const newDate = addDays(selectedDate, 1);
    setSelectedDate(newDate);
  };
  
  const handleBookSlot = async (time: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to book a slot",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Extract hour and period from time string (e.g., "6:00 AM")
      const [hourMinute, period] = time.split(' ');
      const [hour] = hourMinute.split(':');
      const hourNum = parseInt(hour);
      
      // Convert to 24-hour format for database
      const hour24 = period === 'AM' 
        ? (hourNum === 12 ? 0 : hourNum)
        : (hourNum === 12 ? 12 : hourNum + 12);
      
      const startTime = `${hour24.toString().padStart(2, '0')}:00:00`;
      const endHour = (hour24 + 1) % 24;
      const endTime = `${endHour.toString().padStart(2, '0')}:00:00`;
      
      const bookingDate = format(selectedDate, 'yyyy-MM-dd');
      
      const { error } = await supabase
        .from('bookings')
        .insert([
          {
            user_id: user.id,
            booking_date: bookingDate,
            start_time: startTime,
            end_time: endTime,
            payment_method: 'upi', // Default payment method
            amount: 500
          }
        ]);
        
      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Booking failed",
            description: "This slot is already booked. Please select another time.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Booking failed",
            description: error.message,
            variant: "destructive",
          });
        }
      } else {
        setBookingSuccess(true);
        fetchBookedSlots(selectedDate); // Refresh slots
        setTimeout(() => setBookingSuccess(false), 3000);
      }
    } catch (error: any) {
      toast({
        title: "Booking failed",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    }
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
              disabled={isToday(selectedDate)}
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
                  disabled={(date) => date < startOfDay(new Date())}
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
              onBook={() => handleBookSlot(slot.time)}
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
