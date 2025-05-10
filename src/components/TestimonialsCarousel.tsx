
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  comment: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Amit Sharma",
    role: "Regular Player",
    comment: "I've been playing badminton for years, but the facilities at Prime Badminton Academy are world-class. The courts are always well-maintained!",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Weekend Warrior",
    comment: "The booking process is so simple, and the staff is always friendly. I love bringing my family here on weekends!",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    name: "Raj Malhotra",
    role: "Professional Player",
    comment: "As someone who competes professionally, I need quality courts for practice. Prime Badminton Academy provides exactly what I need to stay at the top of my game.",
    image: "https://randomuser.me/api/portraits/men/67.jpg"
  },
  {
    id: 4,
    name: "Anjali Desai",
    role: "Fitness Enthusiast",
    comment: "I started playing badminton as a way to stay fit, and this academy has been perfect. Great ambiance, clean facilities, and affordable rates!",
    image: "https://randomuser.me/api/portraits/women/28.jpg"
  }
];

const TestimonialsCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Players Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our community of badminton enthusiasts.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="min-w-full px-4">
                  <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
                    <div className="flex flex-col md:flex-row gap-6 items-center text-center md:text-left">
                      <div className="shrink-0">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-24 h-24 rounded-full object-cover border-4 border-academy-green"
                        />
                      </div>
                      <div>
                        <svg width="45" height="36" className="mb-4 text-academy-green/30" viewBox="0 0 45 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.5 36H0V22.5C0 16.5 1.125 11.625 3.375 7.875C5.625 4.125 9 1.5 13.5 0V6.75C10.875 7.875 9 9.5625 7.875 11.8125C6.75 14.0625 6.1875 17.25 6.1875 21.375H13.5V36ZM44.5 36H31V22.5C31 16.5 32.125 11.625 34.375 7.875C36.625 4.125 40 1.5 44.5 0V6.75C41.875 7.875 40 9.5625 38.875 11.8125C37.75 14.0625 37.1875 17.25 37.1875 21.375H44.5V36Z" fill="currentColor"/>
                        </svg>
                        <p className="text-gray-700 text-lg mb-6">{testimonial.comment}</p>
                        <div>
                          <h4 className="font-bold text-xl mb-1">{testimonial.name}</h4>
                          <p className="text-gray-500">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-3">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full hover:bg-academy-green hover:text-white"
              onClick={prevTestimonial}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all",
                    activeIndex === index 
                      ? "bg-academy-green scale-125" 
                      : "bg-gray-300 hover:bg-gray-400"
                  )}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full hover:bg-academy-green hover:text-white"
              onClick={nextTestimonial}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
