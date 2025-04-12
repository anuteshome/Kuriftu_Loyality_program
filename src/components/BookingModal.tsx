import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Users, CreditCard, Award } from 'lucide-react';

interface BookingItem {
  name: string;
  price: number;
  pointsPerBooking: number;
  type: 'room' | 'spa' | 'activity';
  duration?: string;
  occupancy?: string;
}

interface BookingModalProps {
  item: BookingItem;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (bookingData: {
    startDate: string;
    endDate?: string;
    time?: string;
    guests: number;
    totalAmount: number;
    pointsEarned: number;
    paymentMethod: string;
  }) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({
  item,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    time: '',
    guests: 1,
    paymentMethod: 'credit_card',
  });

  const [totalAmount, setTotalAmount] = useState(item.price);
  const [pointsEarned, setPointsEarned] = useState(item.pointsPerBooking);

  useEffect(() => {
    if (item.type === 'room') {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      const nights = Math.max(days, 1);
      setTotalAmount(item.price * nights);
      setPointsEarned(item.pointsPerBooking * nights);
    } else {
      setTotalAmount(item.price * formData.guests);
      setPointsEarned(item.pointsPerBooking * formData.guests);
    }
  }, [formData.startDate, formData.endDate, formData.guests, item]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      totalAmount,
      pointsEarned,
    });
    onClose();
  };

  if (!isOpen) return null;

  const etbPrice = totalAmount * 55; // Assuming 1 USD = 55 ETB

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{item.name}</h2>
            <p className="text-sm text-gray-600">{item.type.charAt(0).toUpperCase() + item.type.slice(1)} Booking</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="bg-purple-50 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <Award className="w-5 h-5 text-purple-600 mr-2" />
            <p className="text-sm text-purple-600">
              Earn {pointsEarned} points with this booking
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {item.type === 'room' ? (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Check-in Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Check-out Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    required
                    value={formData.endDate}
                    min={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of {item.type === 'room' ? 'Guests' : 'People'}
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="number"
                min="1"
                max={item.type === 'room' ? 4 : 10}
                required
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            {item.occupancy && (
              <p className="mt-1 text-sm text-gray-500">Maximum occupancy: {item.occupancy}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Method
            </label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="credit_card">Credit Card</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="cash">Cash</option>
              </select>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">ETB {etbPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Points to Earn</span>
              <span className="text-purple-600 font-medium">{pointsEarned} points</span>
            </div>
            <div className="flex justify-between pt-2 border-t">
              <span className="font-medium">Total Amount</span>
              <span className="font-bold">ETB {etbPrice.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal; 