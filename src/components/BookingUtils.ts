
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

export interface BookingDetails {
  date: Date;
  time: string;
  formattedHour: number;
  period: string;
  paymentMethod?: string;
}

export const createBooking = async (booking: BookingDetails, userId: string) => {
  if (!userId) {
    throw new Error('User not authenticated');
  }
  
  // Extract hour and period from time string (e.g., "6:00 AM")
  const hourNum = booking.formattedHour;
  const period = booking.period;
  
  // Convert to 24-hour format for database
  const hour24 = period === 'AM' 
    ? (hourNum === 12 ? 0 : hourNum)
    : (hourNum === 12 ? 12 : hourNum + 12);
  
  const startTime = `${hour24.toString().padStart(2, '0')}:00:00`;
  const endHour = (hour24 + 1) % 24;
  const endTime = `${endHour.toString().padStart(2, '0')}:00:00`;
  
  const bookingDate = format(booking.date, 'yyyy-MM-dd');
  
  const { data, error } = await supabase
    .from('bookings')
    .insert([
      {
        user_id: userId,
        booking_date: bookingDate,
        start_time: startTime,
        end_time: endTime,
        payment_method: booking.paymentMethod || 'upi',
        amount: 500
      }
    ]);
    
  if (error) {
    throw error;
  }
  
  return data;
};

export const fetchBookedSlots = async (date: Date) => {
  const formattedDate = format(date, 'yyyy-MM-dd');
  
  const { data: bookings, error } = await supabase
    .from('bookings')
    .select('start_time')
    .eq('booking_date', formattedDate);
    
  if (error) {
    throw error;
  }
  
  return bookings || [];
};
