import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { useGetAvailableCouponsQuery } from '../../redux/features/coupon/couponApi';
import Sidebar from '../user/Sidebar';
import ProfileSection from '../user/ProfileSection';
import CouponsSection from '../user/CouponsSection';
import RedeemCoupon from '../user/RedeemCoupon';
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import ClaimedCoupons from '../user/ClaimedCoupons';

const UserDashboard = () => {
  const user = useSelector(selectCurrentUser);
  const { data: couponsData, isLoading: couponsLoading } = useGetAvailableCouponsQuery();
  const availableCoupons = couponsData?.coupons || [];

  if (couponsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">User data not available. Please log in.</div>
      </div>
    );
  }

  if (user.status === 'pending') {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-yellow-600 mb-4">Account Pending Approval</h2>
          <p className="text-gray-600 mb-4">
            Your account is currently under review. Please wait for administrator approval.
          </p>
          <p className="text-sm text-gray-500">
            You'll receive an email notification once your account is approved.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <Routes>
                <Route path="/profile" element={<ProfileSection profile={user} />} />
                <Route path="/coupons" element={<CouponsSection coupons={availableCoupons} />} />
                <Route path="/redeem" element={<RedeemCoupon />} />
                <Route path="/claim-coupons" element={<ClaimedCoupons />} />
                <Route path="*" element={<ProfileSection profile={user} />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;