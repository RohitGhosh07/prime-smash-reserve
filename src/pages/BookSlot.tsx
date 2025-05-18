import React from 'react';
import BookingForm from '@/components/BookingForm';

const BookSlot = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Book a Slot</h1>
      <BookingForm />
    </div>
  );
};

export default BookSlot;