import React from 'react';
import BookingList from './BookingList';

interface RoomsPageProps {
  onBookingSubmit: (itemId: string, bookingData: any) => void;
}

const RoomsPage: React.FC<RoomsPageProps> = ({ onBookingSubmit }) => {
  return (
    <div>
      <div className="relative h-64 bg-gray-900">
        <img
          src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Rooms"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">Our Rooms</h1>
        </div>
      </div>
      <BookingList
        items={[
          {
            id: '1',
            name: 'Deluxe Room',
            description: 'Spacious room with city view',
            price: 150,
            pointsPerBooking: 150,
            type: 'room',
            image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            occupancy: '2 Adults',
          },
          {
            id: '2',
            name: 'Suite',
            description: 'Luxury suite with separate living area',
            price: 300,
            pointsPerBooking: 300,
            type: 'room',
            image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            occupancy: '2 Adults + 1 Child',
          },
        ]}
        onBookingSubmit={onBookingSubmit}
        showTabs={false}
      />
    </div>
  );
};

export default RoomsPage; 