import React from 'react';
import { Award, Calendar, Gift, Star, Clock, ChevronRight } from 'lucide-react';

interface CustomerDashboardProps {
  user: {
    name: string;
    tier: string;
    points: number;
    nextTier: string;
    pointsToNextTier: number;
  };
  upcomingEvents: Array<{
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
  }>;
  recentPoints: Array<{
    id: string;
    activity: string;
    points: number;
    date: string;
  }>;
}

const CustomerDashboard: React.FC<CustomerDashboardProps> = ({ user, upcomingEvents, recentPoints }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user.name}!</h1>
        <p className="text-gray-600 mt-1">Here's your Kuriftu Rewards status</p>
      </div>
      
      {/* Tier and Points Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Award className="w-10 h-10 text-amber-500 mr-3" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{user.tier} Tier</h2>
              <p className="text-gray-600">{user.points} points</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Next tier: {user.nextTier}</p>
            <p className="text-sm text-purple-600 font-medium">{user.pointsToNextTier} points to go</p>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-purple-600 h-2.5 rounded-full" 
              style={{ width: `${(user.points / (user.points + user.pointsToNextTier)) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Calendar className="w-6 h-6 text-purple-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Upcoming Events</h2>
          </div>
          
          {upcomingEvents.length > 0 ? (
            <div className="space-y-4">
              {upcomingEvents.map(event => (
                <div key={event.id} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-800">{event.title}</h3>
                      <p className="text-sm text-gray-600">{event.date} at {event.time}</p>
                      <p className="text-sm text-gray-500">{event.location}</p>
                    </div>
                    <button className="text-purple-600 hover:text-purple-800">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No upcoming events</p>
          )}
        </div>
        
        {/* Recent Points Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Gift className="w-6 h-6 text-purple-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Recent Points Activity</h2>
          </div>
          
          {recentPoints.length > 0 ? (
            <div className="space-y-4">
              {recentPoints.map(activity => (
                <div key={activity.id} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-800">{activity.activity}</h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{activity.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-amber-500 mr-1" />
                      <span className="font-medium text-gray-800">+{activity.points}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No recent points activity</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard; 