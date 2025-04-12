import React, { useState } from 'react';
import ProfileSettings from './ProfileSettings';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  language: string;
  currency: string;
  notifications: {
    email: boolean;
    sms: boolean;
    marketing: boolean;
  };
  twoFactorEnabled: boolean;
}

const ProfilePage: React.FC = () => {
  // Mock user profile data - in a real app, this would come from an API or context
  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    language: 'en',
    currency: 'USD',
    notifications: {
      email: true,
      sms: true,
      marketing: false,
    },
    twoFactorEnabled: false,
  });

  const handleUpdateProfile = (updatedProfile: UserProfile) => {
    // In a real app, this would make an API call to update the profile
    console.log('Updating profile:', updatedProfile);
    setUserProfile(updatedProfile);
  };

  const handleChangePassword = (currentPassword: string, newPassword: string) => {
    // In a real app, this would make an API call to change the password
    console.log('Changing password:', { currentPassword, newPassword });
  };

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your account settings and preferences
          </p>
        </div>
        
        <ProfileSettings 
          profile={userProfile}
          onUpdateProfile={handleUpdateProfile}
          onChangePassword={handleChangePassword}
        />
      </div>
    </div>
  );
};

export default ProfilePage; 