import React, { useState, useEffect } from "react";
import { useRedeemCouponMutation } from "../../redux/features/user/userApi";

const RedeemCoupon = () => {
  const [couponCode, setCouponCode] = useState("");
  const [redeemCoupon, { isLoading, isError, error, isSuccess, data }] = useRedeemCouponMutation();

  useEffect(() => {
    if (isSuccess) {
      setCouponCode(""); 
    }
  }, [isSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return; 
    redeemCoupon(couponCode.trim());
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Redeem Coupon</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="couponCode" className="block text-sm font-medium text-gray-700 mb-1">
            Coupon Code
          </label>
          <input
            type="text"
            id="couponCode"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter coupon code"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          } transition-colors`}
        >
          {isLoading ? "Processing..." : "Redeem Coupon"}
        </button>

        {isError && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
            {error?.data?.message || "Failed to redeem coupon"}
          </div>
        )}

        {isSuccess && (
          <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md text-sm">
            {data?.message || "Coupon redeemed successfully!"}
          </div>
        )}
      </form>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-2">How to redeem:</h3>
        <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
          <li>Enter your coupon code exactly as shown</li>
          <li>Coupons are case-sensitive</li>
          <li>Each coupon can only be used once</li>
        </ul>
      </div>
    </div>
  );
};

export default RedeemCoupon;
