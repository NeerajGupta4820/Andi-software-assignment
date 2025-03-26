import React, { useState } from 'react';
import { useGetCouponsQuery } from '../../redux/features/coupon/couponApi';

const AllCoupons = () => {
  const { data: coupons = [], isLoading, error } = useGetCouponsQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const couponsPerPage = 5;

  // Pagination logic
  const indexOfLastCoupon = currentPage * couponsPerPage;
  const indexOfFirstCoupon = indexOfLastCoupon - couponsPerPage;
  const currentCoupons = coupons.slice(indexOfFirstCoupon, indexOfLastCoupon);
  const totalPages = Math.ceil(coupons.length / couponsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (isLoading) return <div className="text-center py-8 text-gray-500">Loading coupons...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error fetching coupons</div>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold mb-6">Existing Coupons</h2>
      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
        {currentCoupons.length === 0 ? (
          <div className="text-center py-10 bg-gray-100 rounded-lg">
            <p className="text-gray-500">No coupons found</p>
          </div>
        ) : (
          currentCoupons.map((coupon) => (
            <div
              key={coupon._id}
              className="bg-gray-100 rounded-lg p-5 border-l-4 border-blue-500 hover:shadow transition-all"
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold text-lg">{coupon.code}</h3>
                  <p className="text-gray-600 text-sm mt-1">{coupon.description || 'No description'}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    coupon.isActive ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {coupon.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="mt-4 text-sm grid grid-cols-2 gap-3">
                <p>
                  <strong>Discount:</strong> {coupon.discount}% OFF
                </p>
                <p>
                  <strong>Uses:</strong> {coupon.currentUses || 0}/{coupon.totalQuantity}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-4 py-2 bg-blue-500 text-white rounded-md">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllCoupons;
