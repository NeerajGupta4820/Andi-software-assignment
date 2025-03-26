import { Link } from "react-router-dom";
import { RiCoupon2Fill } from "react-icons/ri";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-8">
          <div className="col-span-2 md:col-span-1 space-y-3">
            <Link to="/" className="flex items-center text-xl font-bold">
              <RiCoupon2Fill className="mr-2 text-2xl text-blue-500" />
              <span className="text-white">CouponGen</span>
            </Link>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Discover and share the best discount coupons and exclusive deals.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300" aria-label="Facebook">
                <FaFacebook size={16} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300" aria-label="Twitter">
                <FaTwitter size={16} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300" aria-label="Instagram">
                <FaInstagram size={16} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300" aria-label="LinkedIn">
                <FaLinkedin size={16} />
              </a>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors duration-300">Home</Link></li>
              <li><Link to="/coupons" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors duration-300">All Coupons</Link></li>
              <li><Link to="/categories" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors duration-300">Categories</Link></li>
              <li><Link to="/deals" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors duration-300">Today's Deals</Link></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors duration-300">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors duration-300">Contact</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors duration-300">Privacy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors duration-300">Terms</Link></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1 space-y-3">
            <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Newsletter</h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Get the latest coupons and deals.
            </p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900 text-xs sm:text-sm"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-300 text-xs sm:text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-4 pb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left space-y-2 sm:space-y-0">
            <p className="text-gray-500 text-xs">
              &copy; {new Date().getFullYear()} CouponGen. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link to="/privacy" className="text-gray-500 hover:text-gray-300 text-xs transition-colors duration-300">Privacy</Link>
              <Link to="/terms" className="text-gray-500 hover:text-gray-300 text-xs transition-colors duration-300">Terms</Link>
              <Link to="/cookies" className="text-gray-500 hover:text-gray-300 text-xs transition-colors duration-300">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;