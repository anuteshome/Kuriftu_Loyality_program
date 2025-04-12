import React, { useState } from 'react';
import {
  Gift,
  CreditCard,
  Plane,
  Hotel,
  ShoppingBag,
  CheckCircle,
  XCircle,
  ChevronRight,
  Star,
  Crown,
  Award,
  Gem,
} from 'lucide-react';

interface Reward {
  id: string;
  name: string;
  description: string;
  points: number;
  icon: React.ReactNode;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  type: 'gift-card' | 'hotel-stay' | 'flight';
}

interface RewardsPageProps {
  userPoints: number;
  userTier: 'bronze' | 'silver' | 'gold' | 'platinum';
}

const RewardsPage: React.FC<RewardsPageProps> = ({ userPoints, userTier }) => {
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const rewards: Reward[] = [
    {
      id: '1',
      name: 'Silver Gift Shop Card',
      description: 'Get a $50 gift card for our exclusive silver gift shop',
      points: 1000,
      icon: <ShoppingBag className="w-6 h-6 text-gray-400" />,
      tier: 'silver',
      type: 'gift-card',
    },
    {
      id: '2',
      name: 'Gold Gift Shop Card',
      description: 'Get a $100 gift card for our premium gold gift shop',
      points: 2000,
      icon: <ShoppingBag className="w-6 h-6 text-yellow-500" />,
      tier: 'gold',
      type: 'gift-card',
    },
    {
      id: '3',
      name: 'One Night Stay',
      description: 'Enjoy a complimentary night in our luxury suite',
      points: 5000,
      icon: <Hotel className="w-6 h-6 text-purple-600" />,
      tier: 'gold',
      type: 'hotel-stay',
    },
    {
      id: '4',
      name: 'Round Trip Flight',
      description: 'Book a round trip flight to Kuriftu Resort',
      points: 10000,
      icon: <Plane className="w-6 h-6 text-blue-600" />,
      tier: 'platinum',
      type: 'flight',
    },
  ];

  const availableRewards = rewards.filter(reward => {
    // Check if user's tier is high enough
    const tierOrder = ['bronze', 'silver', 'gold', 'platinum'];
    const userTierIndex = tierOrder.indexOf(userTier);
    const rewardTierIndex = tierOrder.indexOf(reward.tier);
    return userTierIndex >= rewardTierIndex;
  });

  const handleRedeem = (reward: Reward) => {
    if (userPoints < reward.points) {
      setError('Not enough points to redeem this reward');
      return;
    }
    setSelectedReward(reward);
    setShowConfirmation(true);
    setError(null);
  };

  const handleConfirmRedeem = () => {
    if (!selectedReward) return;
    
    // In a real app, this would make an API call to redeem the reward
    console.log('Redeeming reward:', selectedReward);
    setShowConfirmation(false);
    setSelectedReward(null);
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'bronze':
        return <Award className="w-5 h-5 text-amber-700" />;
      case 'silver':
        return <Award className="w-5 h-5 text-gray-400" />;
      case 'gold':
        return <Award className="w-5 h-5 text-yellow-500" />;
      case 'platinum':
        return <Crown className="w-5 h-5 text-purple-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Available Points</h2>
            <div className="flex items-center space-x-2 mt-2">
              <Gem className="w-5 h-5 text-purple-600" />
              <span className="text-3xl font-bold">{userPoints}</span>
              <span className="text-gray-500">points</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {getTierIcon(userTier)}
            <span className="text-lg font-semibold capitalize">{userTier} Tier</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 p-4 rounded-lg flex items-center space-x-2">
          <XCircle className="w-5 h-5 text-red-600" />
          <span className="text-red-600">{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableRewards.map(reward => (
          <div key={reward.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                {reward.icon}
                <h3 className="text-lg font-semibold">{reward.name}</h3>
              </div>
              <div className="flex items-center space-x-1">
                <Gem className="w-4 h-4 text-purple-600" />
                <span className="font-medium">{reward.points}</span>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{reward.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                {getTierIcon(reward.tier)}
                <span className="text-sm text-gray-500 capitalize">{reward.tier} tier</span>
              </div>
              <button
                onClick={() => handleRedeem(reward)}
                className="flex items-center space-x-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                <span>Redeem</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showConfirmation && selectedReward && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Confirm Redemption</h3>
              <button
                onClick={() => setShowConfirmation(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Reward:</span>
                <span className="font-medium">{selectedReward.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Points Required:</span>
                <div className="flex items-center space-x-1">
                  <Gem className="w-4 h-4 text-purple-600" />
                  <span className="font-medium">{selectedReward.points}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Your Points:</span>
                <div className="flex items-center space-x-1">
                  <Gem className="w-4 h-4 text-purple-600" />
                  <span className="font-medium">{userPoints}</span>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRedeem}
                className="flex items-center space-x-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Confirm</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RewardsPage; 