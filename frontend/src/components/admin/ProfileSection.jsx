import React from 'react';

const ProfileSection = ({ profile }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Profile Information</h1>
      
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
            <p className="mt-1 text-lg font-semibold text-gray-800">
              {profile?.name || 'Not provided'}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Email</h3>
            <p className="mt-1 text-lg font-semibold text-gray-800">
              {profile?.email || 'Not provided'}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Phone</h3>
            <p className="mt-1 text-lg font-semibold text-gray-800">
              {profile?.phone || 'Not provided'}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Account Status</h3>
            <p className="mt-1 text-lg font-semibold text-gray-800">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                profile?.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {profile?.status || 'unknown'}
              </span>
            </p>
          </div>
        </div>
        
        <div className="mt-6">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;