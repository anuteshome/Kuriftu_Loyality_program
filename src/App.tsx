import React, { useState } from 'react';
import {
  Crown,
  Gift,
  Calendar,
  User,
  CreditCard,
  ChevronRight,
  Award,
  Sparkles,
  Timer,
  Gem,
  Menu,
  X,
  Home,
  Hotel,
  Utensils,
  Heart,
  Map,
  Phone,
  Star,
  Clock,
  Users,
  Coffee,
  Wine,
  Palmtree,
  Mountain,
  MessageCircle,
  Mail,
  Navigation,
  Settings,
  Bot,
} from 'lucide-react';
import BookingList from './components/BookingList';
import ProfilePage from './components/ProfilePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import DiningReservationPage, { DiningReservationData } from './components/DiningReservationPage';
import AdminDashboard from './components/AdminDashboard';
import EmployeeDashboard from './components/EmployeeDashboard';
import RewardsPage from './components/RewardsPage';
import ChatBotPage from './components/ChatBotPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedBookingItem, setSelectedBookingItem] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
  const [userPoints, setUserPoints] = useState(3750);
  const [userTier, setUserTier] = useState<'bronze' | 'silver' | 'gold' | 'platinum'>('gold');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const tiers = [
    {
      name: 'Bronze',
      icon: <Award className="w-6 h-6 text-amber-700" />,
      points: '0-1000',
      benefits: ['5% discount on next visit', 'Welcome drink', 'Late checkout (subject to availability)'],
    },
    {
      name: 'Silver',
      icon: <Award className="w-6 h-6 text-gray-400" />,
      points: '1001-2500',
      benefits: ['Free breakfast', 'Early check-in', '10% spa discount'],
    },
    {
      name: 'Gold',
      icon: <Award className="w-6 h-6 text-yellow-500" />,
      points: '2501-5000',
      benefits: ['Spa vouchers', 'Priority booking', 'Room upgrades'],
    },
    {
      name: 'Platinum',
      icon: <Crown className="w-6 h-6 text-purple-600" />,
      points: '5001+',
      benefits: ['Private dining', 'Exclusive events', 'Personal concierge'],
    },
  ];

  const navItems = [
    { name: 'Home', icon: <Home className="w-5 h-5" />, page: 'home' },
    { name: 'Rooms', icon: <Hotel className="w-5 h-5" />, page: 'rooms' },
    { name: 'Dining', icon: <Utensils className="w-5 h-5" />, page: 'dining' },
    { name: 'Spa', icon: <Heart className="w-5 h-5" />, page: 'spa' },
    { name: 'Activities', icon: <Map className="w-5 h-5" />, page: 'activities' },
    { name: 'Contact', icon: <Phone className="w-5 h-5" />, page: 'contact' },
    { name: 'Rewards', icon: <Gift className="w-5 h-5" />, page: 'rewards' },
  ];

  const rooms = [
    {
      name: 'Lake View Suite',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      price: '350',
      pointsPerNight: 1000,
      amenities: ['King bed', 'Private balcony', 'Lake view', 'Mini bar'],
      size: '45m²',
      occupancy: '2 Adults + 1 Child',
    },
    {
      name: 'Garden Villa',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      price: '500',
      pointsPerNight: 1500,
      amenities: ['Private pool', 'Garden access', 'Butler service', 'Dining area'],
      size: '80m²',
      occupancy: '4 Adults',
    },
    {
      name: 'Presidential Suite',
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      price: '1200',
      pointsPerNight: 3000,
      amenities: ['Panoramic view', 'Private terrace', '24/7 butler', 'Private chef'],
      size: '120m²',
      occupancy: '4 Adults + 2 Children',
    },
  ];

  const restaurants = [
    {
      name: 'Lakeside Restaurant',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      cuisine: 'International',
      pointsPerVisit: 200,
      description: 'Panoramic lake views with international cuisine',
      timing: '6:30 AM - 10:30 PM',
    },
    {
      name: 'Ethiopian Fine Dining',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      cuisine: 'Ethiopian',
      pointsPerVisit: 300,
      description: 'Traditional Ethiopian cuisine with a modern twist',
      timing: '12:00 PM - 11:00 PM',
    },
    {
      name: 'Sunset Lounge',
      image: 'https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      cuisine: 'Tapas & Cocktails',
      pointsPerVisit: 150,
      description: 'Light bites and craft cocktails with sunset views',
      timing: '4:00 PM - 12:00 AM',
    },
  ];

  const spaServices = [
    {
      name: 'Ethiopian Coffee Ritual',
      image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      duration: '90 minutes',
      points: 500,
      price: '150',
      description: 'Traditional coffee scrub and massage',
    },
    {
      name: 'Lake Tana Relaxation',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      duration: '120 minutes',
      points: 700,
      price: '200',
      description: 'Full body massage and facial treatment',
    },
    {
      name: 'Couples Retreat',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      duration: '150 minutes',
      points: 1000,
      price: '350',
      description: 'Couples massage, private spa suite, champagne',
    },
  ];

  const activities = [
    {
      name: 'Lake Tana Boat Tour',
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      duration: '3 hours',
      points: 400,
      price: '80',
      description: 'Explore ancient monasteries and wildlife',
    },
    {
      name: 'Coffee Plantation Tour',
      image: 'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      duration: '4 hours',
      points: 300,
      price: '60',
      description: 'Learn about Ethiopian coffee culture',
    },
    {
      name: 'Blue Nile Falls Hike',
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      duration: '6 hours',
      points: 600,
      price: '120',
      description: 'Guided hike to the magnificent falls',
    },
  ];

  const handleLogin = (email: string, password: string, role: string) => {
    // In a real app, this would validate credentials with an API
    console.log('Logging in with:', { email, password, role });
    setIsLoggedIn(true);
    
    // Check if the user is an admin or employee
    if (role === 'admin') {
      setIsAdmin(true);
      setIsEmployee(false);
      setCurrentPage('admin');
    } else if (role === 'employee') {
      setIsAdmin(false);
      setIsEmployee(true);
      setCurrentPage('employee');
    } else {
      setIsAdmin(false);
      setIsEmployee(false);
      setCurrentPage('home');
    }
  };

  const handleSignup = (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
  }) => {
    // In a real app, this would register the user with an API
    console.log('Signing up user:', userData);
    setIsLoggedIn(true);
    setIsAdmin(false);
    setIsEmployee(false);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setIsEmployee(false);
    setCurrentPage('home');
  };

  const RoomsPage = () => {
    const roomItems = rooms.map(room => ({
      id: room.name,
      name: room.name,
      description: room.amenities.join(', '),
      price: parseFloat(room.price.toString()),
      pointsPerBooking: room.pointsPerNight,
      type: 'room' as const,
      image: room.image,
      occupancy: room.occupancy
    }));

    return (
    <div className="space-y-8">
      <div className="relative h-[400px] -mt-12 mb-12 rounded-b-3xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
          alt="Luxury Suite"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center">
          <div className="max-w-3xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Luxurious Accommodations
            </h1>
            <p className="text-xl text-white/90">
              Experience unparalleled comfort with stunning views
            </p>
          </div>
        </div>
      </div>

        <BookingList 
          items={roomItems} 
          onBookingSubmit={handleBookingSubmit} 
          showTabs={false}
        />
              </div>
  );
  };

  const DiningPage = () => {
    const handleReservationSubmit = (data: DiningReservationData) => {
      console.log('Dining reservation submitted:', data);
      // Here you would typically send the reservation data to your backend
      alert('Reservation confirmed! Thank you for your booking.');
      setShowReservationForm(false);
    };

    if (showReservationForm) {
      return (
        <div className="space-y-8">
          <div className="relative h-[200px] -mt-12 mb-12 rounded-b-3xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
              alt="Fine Dining"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center">
              <div className="max-w-3xl px-4">
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
                  Dining Reservation
                </h1>
                <p className="text-lg text-white/90">
                  Book your table at our restaurants
                </p>
            </div>
              </div>
                  </div>
          
          <DiningReservationPage onSubmit={handleReservationSubmit} />
          
          <div className="text-center mt-8">
            <button 
              onClick={() => setShowReservationForm(false)}
              className="text-purple-600 hover:text-purple-800 font-medium"
            >
              ← Back to Restaurants
                </button>
      </div>
    </div>
  );
    }

    return (
    <div className="space-y-8">
      <div className="relative h-[400px] -mt-12 mb-12 rounded-b-3xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
          alt="Fine Dining"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center">
          <div className="max-w-3xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Culinary Excellence
            </h1>
            <p className="text-xl text-white/90">
              Savor exceptional dining experiences
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {restaurants.map((restaurant) => (
          <div key={restaurant.name} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
            <div className="relative h-64">
              <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
              <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                {restaurant.pointsPerVisit} pts/visit
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{restaurant.name}</h3>
              <div className="flex items-center space-x-2 text-gray-600 mb-4">
                <Coffee className="w-4 h-4" />
                <span className="text-sm">{restaurant.cuisine}</span>
              </div>
              <p className="text-gray-600 mb-4">{restaurant.description}</p>
              <div className="flex items-center space-x-2 text-gray-600 mb-4">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{restaurant.timing}</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t">
                <div className="flex items-center space-x-2">
                  <Wine className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-gray-600">Reservations recommended</span>
                </div>
                  <button 
                    onClick={() => {
                      setSelectedRestaurant(restaurant.name);
                      setShowReservationForm(true);
                    }}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                  Reserve
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  };

  const SpaPage = () => {
    const spaItems = spaServices.map(service => ({
      id: service.name,
      name: service.name,
      description: service.description,
      price: parseFloat(service.price.toString()),
      pointsPerBooking: service.points,
      type: 'spa' as const,
      image: service.image,
      duration: service.duration
    }));

    return (
    <div className="space-y-8">
      <div className="relative h-[400px] -mt-12 mb-12 rounded-b-3xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
          alt="Spa Treatment"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center">
          <div className="max-w-3xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Rejuvenate Your Senses
            </h1>
            <p className="text-xl text-white/90">
              Indulge in our signature spa treatments
            </p>
          </div>
        </div>
      </div>

        <BookingList 
          items={spaItems} 
          onBookingSubmit={handleBookingSubmit} 
          showTabs={false}
        />
    </div>
  );
  };

  const ActivitiesPage = () => {
    const activityItems = activities.map(activity => ({
      id: activity.name,
      name: activity.name,
      description: activity.description,
      price: parseFloat(activity.price.toString()),
      pointsPerBooking: activity.points,
      type: 'activity' as const,
      image: activity.image,
      duration: activity.duration
    }));

    return (
    <div className="space-y-8">
      <div className="relative h-[400px] -mt-12 mb-12 rounded-b-3xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
          alt="Activities"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center">
          <div className="max-w-3xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Discover Adventures
            </h1>
            <p className="text-xl text-white/90">
              Explore the wonders of Ethiopia
            </p>
          </div>
        </div>
      </div>

        <BookingList 
          items={activityItems} 
          onBookingSubmit={handleBookingSubmit} 
          showTabs={false}
        />
    </div>
  );
  };

  const ContactPage = () => (
    <div className="space-y-8">
      <div className="relative h-[400px] -mt-12 mb-12 rounded-b-3xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
          alt="Contact"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center">
          <div className="max-w-3xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-white/90">
              We're here to help with your inquiries
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                rows={4}
                placeholder="How can we help?"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <MessageCircle className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold">Chat with Us</h3>
                <p className="text-gray-600">Available 24/7 for your inquiries</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold">Email Us</h3>
                <p className="text-gray-600">info@kuriftu.com</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <Phone className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold">Call Us</h3>
                <p className="text-gray-600">+251 116 670 344</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <Navigation className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold">Visit Us</h3>
                <p className="text-gray-600">Bahir Dar, Ethiopia</p>
                <p className="text-gray-600">Lake Tana</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const LandingPage = () => (
    <div className="space-y-12">
      <div className="relative h-[600px] -mt-12 mb-12">
        <img
          src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
          alt="Luxury Resort"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center">
          <div className="max-w-3xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Experience Luxury, Earn Rewards
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Join Kuriftu's exclusive rewards program and unlock a world of personalized perks and privileges.
            </p>
            <button 
              onClick={() => setCurrentPage('signup')}
              className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors"
            >
              Join Now
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tiers.map((tier) => (
          <div key={tier.name} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center space-x-3 mb-4">
              {tier.icon}
              <h3 className="text-xl font-semibold">{tier.name}</h3>
            </div>
            <p className="text-sm text-gray-500 mb-4">{tier.points} points</p>
            <ul className="space-y-2">
              {tier.benefits.map((benefit) => (
                <li key={benefit} className="flex items-center space-x-2">
                  <Gem className="w-4 h-4 text-purple-600" />
                  <span className="text-gray-600">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
          <User className="w-8 h-8 text-purple-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Personalized Experience</h3>
          <p className="text-gray-600">Rewards that adapt to your preferences and stay history.</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
          <CreditCard className="w-8 h-8 text-purple-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Earn on Everything</h3>
          <p className="text-gray-600">Points for stays, dining, spa treatments, and experiences.</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
          <Gift className="w-8 h-8 text-purple-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Instant Benefits</h3>
          <p className="text-gray-600">Start enjoying rewards from your very first stay.</p>
        </div>
      </div>
    </div>
  );

  const GuestDashboard = () => (
    <div className="space-y-8">
      <div className="relative h-64 rounded-xl overflow-hidden mb-8">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
          alt="Luxury Resort"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-transparent flex items-center p-8">
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-2">Welcome back, Alex!</h2>
            <p className="text-xl">Gold Member</p>
            <div className="mt-4">
              <p className="text-2xl font-semibold">3,750 Points</p>
              <p className="text-sm opacity-80">1,250 until Platinum</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Calendar className="w-6 h-6 text-purple-600" />
              <h3 className="text-lg font-semibold">Upcoming Stay</h3>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-gray-600">Lake Tana Resort</p>
          <p className="text-sm text-gray-500">March 15-18, 2024</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Gift className="w-6 h-6 text-purple-600" />
              <h3 className="text-lg font-semibold">Available Rewards</h3>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-gray-600">3 rewards available</p>
          <p className="text-sm text-gray-500">Spa voucher expires in 30 days</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Personalized Offers</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg">
            <Sparkles className="w-8 h-8 text-purple-600" />
            <div>
              <h4 className="font-semibold">50% off your next spa visit</h4>
              <p className="text-sm text-gray-600">Based on your preferences</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
            <Timer className="w-8 h-8 text-blue-600" />
            <div>
              <h4 className="font-semibold">Early check-in available</h4>
              <p className="text-sm text-gray-600">For your upcoming stay</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-4">
              <Hotel className="w-6 h-6 text-purple-600" />
              <div>
                <h4 className="font-semibold">Lake View Suite Booking</h4>
                <p className="text-sm text-gray-600">2 nights • 2,000 points earned</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">2 days ago</span>
          </div>
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-4">
              <Utensils className="w-6 h-6 text-purple-600" />
              <div>
                <h4 className="font-semibold">Dinner at Lakeside Restaurant</h4>
                <p className="text-sm text-gray-600">200 points earned</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">5 days ago</span>
          </div>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <Heart className="w-6 h-6 text-purple-600" />
              <div>
                <h4 className="font-semibold">Ethiopian Coffee Ritual Spa</h4>
                <p className="text-sm text-gray-600">500 points earned</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">1 week ago</span>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Upcoming Events</h3>
        <div className="space-y-4">
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Calendar className="w-6 h-6 text-purple-600" />
                <div>
                  <h4 className="font-semibold">Wine Tasting Evening</h4>
                  <p className="text-sm text-gray-600">March 20, 2024 • 7:00 PM</p>
                </div>
              </div>
              <button className="text-purple-600 text-sm font-semibold">RSVP</button>
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Map className="w-6 h-6 text-blue-600" />
                <div>
                  <h4 className="font-semibold">Cultural Tour</h4>
                  <p className="text-sm text-gray-600">March 25, 2024 • 9:00 AM</p>
                </div>
              </div>
              <button className="text-blue-600 text-sm font-semibold">Book Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const handleBookingSubmit = (itemId: string, bookingData: any) => {
    console.log('Booking submitted:', itemId, bookingData);
    // Here you would typically send the booking data to your backend
    alert('Booking confirmed! Thank you for your reservation.');
  };

  const handleRedeemReward = (reward: any) => {
    // In a real app, this would make an API call to redeem the reward
    console.log('Redeeming reward:', reward);
    setUserPoints(prevPoints => prevPoints - reward.points);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onLogin={handleLogin} onSwitchToSignup={() => setCurrentPage('signup')} />;
      case 'signup':
        return <SignupPage onSignup={handleSignup} onSwitchToLogin={() => setCurrentPage('login')} />;
      case 'rooms':
        return <RoomsPage />;
      case 'dining':
        return <DiningPage />;
      case 'spa':
        return <SpaPage />;
      case 'activities':
        return <ActivitiesPage />;
      case 'contact':
        return <ContactPage />;
      case 'profile':
        return <ProfilePage />;
      case 'rewards':
        return <RewardsPage userPoints={userPoints} userTier={userTier} />;
      case 'chatbot':
        return <ChatBotPage />;
      case 'admin':
        return <AdminDashboard onLogout={handleLogout} />;
      case 'employee':
        return <EmployeeDashboard onLogout={handleLogout} />;
      default:
        return isLoggedIn ? <GuestDashboard /> : <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {!isAdmin && !isEmployee && (
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-800"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <div className="flex items-center cursor-pointer" onClick={() => setCurrentPage('home')}>
                <Crown className="w-8 h-8 text-purple-600" />
                <span className="ml-2 text-xl font-semibold">Kuriftu Rewards</span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setCurrentPage(item.page)}
                  className={`flex items-center space-x-1 text-gray-600 hover:text-gray-800 ${
                    currentPage === item.page ? 'text-purple-600' : ''
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
                {!isLoggedIn ? (
                <>
                  <button
                    onClick={() => setCurrentPage('login')}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setCurrentPage('signup')}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Join Now
                  </button>
                </>
                ) : (
                  <>
                    <button
                      onClick={() => setCurrentPage('profile')}
                      className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
                    >
                      <Settings className="w-5 h-5" />
                      <span>Profile</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-2">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  setCurrentPage(item.page);
                  setIsMenuOpen(false);
                }}
                className={`flex items-center space-x-2 w-full px-4 py-2 text-gray-600 hover:bg-gray-50 ${
                  currentPage === item.page ? 'text-purple-600 bg-purple-50' : ''
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        )}
      </nav>
      )}

      <main className={`${isAdmin || isEmployee ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'}`}>
        {renderPage()}
      </main>

      {/* Floating Chat Button and Chat Modal */}
      {!isAdmin && !isEmployee && currentPage !== 'chatbot' && (
        <div className="fixed bottom-6 right-6 z-50">
          {isChatOpen ? (
            <div className="bg-white rounded-lg shadow-xl overflow-hidden" style={{ width: '350px', height: '500px' }}>
              <div className="flex justify-between items-center bg-purple-600 text-white p-3">
                <h3 className="font-medium flex items-center">
                  <Bot className="w-5 h-5 mr-2" />
                  Kuriftu Assistant
                </h3>
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="text-white hover:text-gray-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="h-full">
                <ChatBotPage />
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsChatOpen(true)}
              className="bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
            >
              <Bot className="w-6 h-6" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default App;