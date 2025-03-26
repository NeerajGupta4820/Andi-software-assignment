import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaCheck, FaPercent, FaGift, FaUserShield } from "react-icons/fa";

const Home = () => {
  // const featuredCoupons = [
  //   { 
  //     id: 1, 
  //     code: "WELCOME20", 
  //     description: "20% off your first purchase", 
  //     discount: "20% OFF",
  //     category: "New Users",
  //     expires: "31 Dec 2023"
  //   },
  //   { 
  //     id: 2, 
  //     code: "FREESHIP", 
  //     description: "Free shipping on all orders", 
  //     discount: "FREE SHIPPING",
  //     category: "All Users",
  //     expires: "15 Jan 2024"
  //   },
  //   { 
  //     id: 3, 
  //     code: "FLASH50", 
  //     description: "Limited time 50% discount", 
  //     discount: "50% OFF",
  //     category: "Flash Sale",
  //     expires: "05 Jan 2024"
  //   },
  // ];

  // const [claimedCoupons, setClaimedCoupons] = useState([]);

  // const handleRedeem = (id) => {
  //   if (!claimedCoupons.includes(id)) {
  //     setClaimedCoupons([...claimedCoupons, id]);
  //   }
  // };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Unlock Exclusive <span className="text-blue-600">Discounts</span> & Savings
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover amazing deals and claim your coupons for incredible savings on your favorite products.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/register" 
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              Get Started <FaArrowRight />
            </Link>
            <Link 
              to="/login" 
              className="px-8 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg font-medium hover:bg-blue-50 transition"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-xl text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaPercent className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Browse Coupons</h3>
              <p className="text-gray-600">Discover amazing discounts and offers from various categories.</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaGift className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Claim Your Coupons</h3>
              <p className="text-gray-600">Easily claim coupons with just one click and save them to your account.</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUserShield className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Admin Approval</h3>
              <p className="text-gray-600">Admins verify users and create exclusive coupons for the community.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Coupons */}
      {/* <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Featured Coupons</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCoupons.map((coupon) => (
              <div
                key={coupon.id}
                className={`bg-white p-6 rounded-xl shadow-lg border-l-4 ${
                  claimedCoupons.includes(coupon.id) 
                    ? "border-gray-300 opacity-90" 
                    : "border-blue-500"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {coupon.category}
                  </span>
                  <span className="text-sm text-gray-500">Expires: {coupon.expires}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{coupon.discount}</h3>
                <p className="text-gray-600 mb-4">{coupon.description}</p>
                <div className="flex items-center justify-between">
                  <code className="font-mono text-lg bg-gray-100 px-3 py-1 rounded">
                    {coupon.code}
                  </code>
                  <button
                    onClick={() => handleRedeem(coupon.id)}
                    disabled={claimedCoupons.includes(coupon.id)}
                    className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
                      claimedCoupons.includes(coupon.id)
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    {claimedCoupons.includes(coupon.id) ? (
                      <>
                        <FaCheck /> Claimed
                      </>
                    ) : (
                      "Redeem"
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Saving?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of happy customers who are already enjoying exclusive discounts.
          </p>
          <Link 
            to="/register" 
            className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition"
          >
            Sign Up Now - It's Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;