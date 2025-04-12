import React, { useState } from 'react';
import { Bed, Heart, Activity } from 'lucide-react';
import BookingModal from './BookingModal';

interface BookingItem {
  id: string;
  name: string;
  description: string;
  price: number;
  pointsPerBooking: number;
  type: 'room' | 'spa' | 'activity';
  image: string;
  duration?: string;
  occupancy?: string;
  availability?: string[];
}

interface BookingListProps {
  items: BookingItem[];
  onBookingSubmit: (itemId: string, bookingData: any) => void;
  showTabs?: boolean;
}

const BookingList: React.FC<BookingListProps> = ({ 
  items, 
  onBookingSubmit,
  showTabs = true 
}) => {
  const [selectedItem, setSelectedItem] = useState<BookingItem | null>(null);
  const [activeTab, setActiveTab] = useState<'room' | 'spa' | 'activity'>('room');

  const getIcon = (type: string) => {
    switch (type) {
      case 'room':
        return <Bed className="w-5 h-5" />;
      case 'spa':
        return <Heart className="w-5 h-5" />;
      case 'activity':
        return <Activity className="w-5 h-5" />;
      default:
        return null;
    }
  };

  // If showTabs is false, set activeTab to the type of the first item
  React.useEffect(() => {
    if (!showTabs && items.length > 0) {
      setActiveTab(items[0].type);
    }
  }, [showTabs, items]);

  const filteredItems = items.filter(item => item.type === activeTab);

  return (
    <div className="container mx-auto px-4 py-8">
      {showTabs && (
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border border-gray-200 p-1">
            <button
              onClick={() => setActiveTab('room')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'room'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Bed className="w-5 h-5" />
                <span>Rooms</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('spa')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'spa'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5" />
                <span>Spa</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('activity')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'activity'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5" />
                <span>Activities</span>
              </div>
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-2">
                {getIcon(item.type)}
                <h3 className="text-xl font-semibold text-gray-800">
                  {item.name}
                </h3>
              </div>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Price</span>
                  <span className="font-semibold">
                    ETB {(item.price * 55).toLocaleString()}
                  </span>
                </div>
                {item.duration && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Duration</span>
                    <span>{item.duration}</span>
                  </div>
                )}
                {item.occupancy && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Max Occupancy</span>
                    <span>{item.occupancy}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Points</span>
                  <span className="text-purple-600">
                    {item.pointsPerBooking} points
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedItem(item)}
                className="mt-6 w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors duration-300"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <BookingModal
          item={selectedItem}
          isOpen={true}
          onClose={() => setSelectedItem(null)}
          onSubmit={(bookingData) => {
            onBookingSubmit(selectedItem.id, bookingData);
            setSelectedItem(null);
          }}
        />
      )}
    </div>
  );
};

export default BookingList; 