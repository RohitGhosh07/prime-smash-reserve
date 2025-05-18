import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const HeroSection = () => {
  return (
    <div className="relative min-h-[80vh] flex items-center">
      <div className="absolute inset-0">
        <img 
          src="https://images.pexels.com/photos/274108/pexels-photo-274108.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Golf Course"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="secondary" className="bg-white/90 text-gray-800">Golfing</Badge>
            <Badge variant="secondary" className="bg-white/90 text-gray-800">Fairway</Badge>
            <Badge variant="secondary" className="bg-white/90 text-gray-800">Tee time</Badge>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            Tee Off in Perfect Surroundings
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Book your tee time at premium courses designed for both challenge and enjoyment.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/book">
              <Button size="lg" className="bg-green-700 hover:bg-green-800 text-white px-8 py-6 text-lg rounded-full">
                Book Now
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full">
              Learn More
            </Button>
          </div>

          <Card className="mt-12 max-w-sm bg-white/95 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <img 
                  src="https://images.pexels.com/photos/914682/pexels-photo-914682.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Course Preview"
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">Course Availability</h3>
                  <p className="text-sm text-gray-600 mb-2">Next available slot in 2 hours</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm text-gray-700">8 slots available today</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;