
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from '@/context/AuthContext';

const BookingForm: React.FC = () => {
  const [date, setDate] = useState<Date>();
  const [timeSlot, setTimeSlot] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();
  
  React.useEffect(() => {
    if (userProfile) {
      setName(`${userProfile.first_name || ''} ${userProfile.last_name || ''}`.trim());
      setEmail(user?.email || '');
    }
  }, [userProfile, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to book a slot",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }
    
    if (!date || !timeSlot || !paymentMethod) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Calculate start and end times from the selected time slot
      const [startHour, period] = timeSlot.split(':')[0].split(/([ap]m)/i);
      const startTime = `${startHour.padStart(2, '0')}:00:00`;
      const endHour = (parseInt(startHour) + 1) % 12 || 12;
      const endTime = `${endHour.toString().padStart(2, '0')}:00:00`;
      
      const bookingDate = format(date, 'yyyy-MM-dd');
      
      const { data, error } = await supabase
        .from('bookings')
        .insert([
          {
            user_id: user.id,
            booking_date: bookingDate,
            start_time: startTime,
            end_time: endTime,
            payment_method: paymentMethod,
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
        toast({
          title: "Booking Submitted!",
          description: "Check your email for confirmation details.",
        });
        
        // Reset form after successful submission
        setDate(undefined);
        setTimeSlot('');
        setPaymentMethod('');
        setPhone('');
      }
    } catch (error: any) {
      toast({
        title: "Booking failed",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking-form" className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg rounded-2xl border-0">
            <CardHeader className="bg-academy-green text-white rounded-t-2xl">
              <CardTitle className="text-2xl">Book Your Court</CardTitle>
              <CardDescription className="text-white/80">
                Complete the form below to reserve your slot
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      placeholder="John Doe" 
                      required 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="+91 98765 43210" 
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="john@example.com" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={!!user} // Disable if user is logged in
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="date"
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                          disabled={isSubmitting}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          disabled={(date) => date < new Date()}
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Time Slot</Label>
                    <Select 
                      value={timeSlot} 
                      onValueChange={setTimeSlot}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6am">6:00 AM</SelectItem>
                        <SelectItem value="7am">7:00 AM</SelectItem>
                        <SelectItem value="8am">8:00 AM</SelectItem>
                        <SelectItem value="9am">9:00 AM</SelectItem>
                        <SelectItem value="5pm">5:00 PM</SelectItem>
                        <SelectItem value="6pm">6:00 PM</SelectItem>
                        <SelectItem value="7pm">7:00 PM</SelectItem>
                        <SelectItem value="8pm">8:00 PM</SelectItem>
                        <SelectItem value="9pm">9:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Payment Method</Label>
                    <Select 
                      value={paymentMethod} 
                      onValueChange={setPaymentMethod}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="upi">UPI</SelectItem>
                        <SelectItem value="card">Credit/Debit Card</SelectItem>
                        <SelectItem value="wallet">Mobile Wallet</SelectItem>
                        <SelectItem value="netbanking">Net Banking</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-academy-blue hover:bg-academy-blue/90 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "Confirm Booking • ₹500"}
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="text-sm text-gray-500 flex justify-center">
              <p>Cancellations are allowed up to 4 hours before booking</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
