import React, { useState } from 'react';
import { useGetAllRedeemedCouponsQuery } from '../../redux/features/user/userApi';
import { FiCheckCircle, FiClock, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const RedeemCoupon = () => {
  const { data: redeemedCoupons, isLoading, isError } = useGetAllRedeemedCouponsQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const couponsPerPage = 5; 

  const totalCoupons = redeemedCoupons?.data?.length || 0;
  const totalPages = Math.ceil(totalCoupons / couponsPerPage);
  const startIndex = (currentPage - 1) * couponsPerPage;
  const endIndex = startIndex + couponsPerPage;
  const currentCoupons = redeemedCoupons?.data?.slice(startIndex, endIndex) || [];

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Redeemed Coupons</h1>
          <p className="text-gray-600 mt-1">Your coupon redemption history</p>
        </div>

        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-3 text-gray-600">Loading your coupons...</p>
            </div>
          ) : isError ? (
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-red-100 text-red-500 mb-3">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Failed to load coupons</h3>
              <p className="mt-1 text-gray-500">Please try again later</p>
            </div>
          ) : totalCoupons === 0 ? (
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-500 mb-3">
                <FiCheckCircle className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">No coupons redeemed yet</h3>
              <p className="mt-1 text-gray-500">Redeem your first coupon to see it here</p>
            </div>
          ) : (
            <>
              <ul className="divide-y divide-gray-200">
                {currentCoupons.map((coupon) => (
                  <li key={coupon._id} className="p-5 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center">
                          <FiCheckCircle className="text-green-500 mr-2" />
                          <h3 className="font-medium text-gray-900">
                            {coupon.coupon?.code || 'Coupon code not available'}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          {coupon.coupon?.description || 'No description available'}
                        </p>
                      </div>
                      {coupon.coupon?.discount && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {coupon.coupon.discount}% OFF
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-3 flex items-center text-sm text-gray-500">
                      <FiClock className="mr-1.5 h-4 w-4 flex-shrink-0" />
                      <p>
                        Redeemed on {new Date(coupon.redeemedAt).toLocaleDateString()} • 
                        {coupon.coupon?.expirationDate ? (
                          ` Expires ${new Date(coupon.coupon.expirationDate).toLocaleDateString()}`
                        ) : ' No expiration'}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              {totalPages > 1 && (
                <div className="flex items-center justify-between px-5 py-4 border-t border-gray-200">
                  <div className="text-sm text-gray-700">
                    Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                    <span className="font-medium">{Math.min(endIndex, totalCoupons)}</span> of{' '}
                    <span className="font-medium">{totalCoupons}</span> coupons
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded-md border ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                    >
                      <FiChevronLeft className="h-5 w-5" />
                    </button>
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
                        // Show pages around current page
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = index + 1;
                        } else if (currentPage <= 3) {
                          pageNum = index + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + index;
                        } else {
                          pageNum = currentPage - 2 + index;
                        }

                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`px-3 py-1 rounded-md ${currentPage === pageNum ? 'bg-blue-100 text-blue-600' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 rounded-md border ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                    >
                      <FiChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RedeemCoupon;