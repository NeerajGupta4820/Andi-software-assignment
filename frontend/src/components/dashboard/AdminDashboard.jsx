import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { selectCurrentUser } from '../../redux/features/auth/authSlice';
import Sidebar from '../admin/Sidebar';
import UsersSection from '../admin/UsersSection';
import PendingUsers from '../admin/PendingUsers';
import RejectedUsers from '../admin/RejectedUsers';
import ProfileSection from '../admin/ProfileSection';
import Addcoupon from '../admin/Addcoupon';
import AllCoupons from '../admin/AllCoupon';

const AdminDashboard = () => {
  const user = useSelector(selectCurrentUser);

  return (
    <div className="min-h-screen bg-gray-100 pt-16"> {/* Added pt-16 for navbar height */}
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <Routes>
                <Route path="/users" element={<UsersSection />} />
                <Route path="/addcoupon" element={<Addcoupon />} />
                <Route path="/allcoupons" element={<AllCoupons />} />
                <Route path="/pending" element={<PendingUsers />} />
                <Route path="/rejected" element={<RejectedUsers />} />
                <Route path="*" element={<ProfileSection profile={user} />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;