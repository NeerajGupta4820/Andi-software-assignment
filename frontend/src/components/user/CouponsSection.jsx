import React, { useState } from 'react';
import { useGetAvailableCouponsQuery } from '../../redux/features/coupon/couponApi';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const CouponsSection = () => {
  const { data: coupons = [], isLoading, error } = useGetAvailableCouponsQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const couponsPerPage = 6;

  const indexOfLastCoupon = currentPage * couponsPerPage;
  const indexOfFirstCoupon = indexOfLastCoupon - couponsPerPage;
  const currentCoupons = coupons.slice(indexOfFirstCoupon, indexOfLastCoupon);
  const totalPages = Math.ceil(coupons.length / couponsPerPage);

  const formatExpiryDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Failed to load coupons" />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-0">My Coupons</h1>
        <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
          {coupons.length} {coupons.length === 1 ? 'coupon' : 'coupons'} available
        </div>
      </div>

      {coupons.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No coupons available</h3>
          <p className="mt-1 text-gray-500">Check back later for new coupon offers</p>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentCoupons.map((coupon) => (
              <div
                key={coupon._id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{coupon.name}</h3>
                      <p className="text-gray-600 text-sm mt-1">
                        Code: <span className="font-mono">{coupon.code}</span>
                      </p>
                    </div>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                      {coupon.discountValue}
                      {coupon.discountType === 'percentage' ? '%' : '$'} OFF
                    </span>
                  </div>
                  
                  <div className="mt-3 flex items-center text-sm text-gray-500">
                    <svg
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Expires: {formatExpiryDate(coupon.endDate)}
                  </div>
                  
                  {coupon.minOrderValue > 0 && (
                    <div className="mt-2 text-sm text-gray-500">
                      Min. order: ${coupon.minOrderValue}
                    </div>
                  )}
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${(coupon.currentUses / coupon.totalQuantity) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {coupon.currentUses} of {coupon.totalQuantity} used
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {coupons.length > couponsPerPage && (
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`flex items-center px-4 py-2 rounded-md ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FiChevronLeft className="mr-1" />
                Previous
              </button>
              <div className="hidden md:flex space-x-1">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-4 py-2 rounded-md ${
                      currentPage === index + 1
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <span className="md:hidden text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`flex items-center px-4 py-2 rounded-md ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Next
                <FiChevronRight className="ml-1" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CouponsSection;