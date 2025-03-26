import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";
import { toast } from "react-hot-toast";
import { HiMenuAlt4 } from "react-icons/hi";
import { FaTimes } from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sidebarRef = useRef(null);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully!");
    navigate("/");
    setIsOpen(false);
  };

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {isMobile && (
        <button
          id="hamburger"
          onClick={toggleSidebar}
          className="fixed z-40 top-20 left-4 p-2 rounded-md bg-blue-600 text-white shadow-lg md:hidden"
          aria-label="Toggle sidebar"
        >
          {isOpen ? <FaTimes size={20} /> : <HiMenuAlt4 size={20} />}
        </button>
      )}

      <div
        ref={sidebarRef}
        className={`fixed md:relative z-30 h-[calc(100vh-64px)] bg-white shadow-lg md:shadow-none transition-all duration-300 ease-in-out
          ${isMobile ? 
            (isOpen ? 'w-64 translate-x-0' : '-translate-x-full') : 
            'w-64 translate-x-0'}
        `}
      >
        <div className="h-full flex flex-col p-4 border-r border-gray-200">
          <div className="p-4 mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>
          </div>
          
          <nav className="flex-1 space-y-1">
            <NavLink
              to="/dashboard/profile"
              onClick={closeSidebar}
              className={({ isActive }) => 
                `flex items-center px-4 py-3 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-50 text-blue-600 font-medium' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <span className="ml-2">Profile</span>
            </NavLink>

            <NavLink
              to="/dashboard/users"
              onClick={closeSidebar}
              className={({ isActive }) => 
                `flex items-center px-4 py-3 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-50 text-blue-600 font-medium' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <span className="ml-2">All Users</span>
            </NavLink>

            <NavLink
              to="/dashboard/pending"
              onClick={closeSidebar}
              className={({ isActive }) => 
                `flex items-center px-4 py-3 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-50 text-blue-600 font-medium' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <span className="ml-2">Pending Approvals</span>
            </NavLink>

            <NavLink
              to="/dashboard/rejected"
              onClick={closeSidebar}
              className={({ isActive }) => 
                `flex items-center px-4 py-3 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-50 text-blue-600 font-medium' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <span className="ml-2">Rejected Users</span>
            </NavLink>

            <NavLink
              to="/dashboard/allcoupons"
              onClick={closeSidebar}
              className={({ isActive }) => 
                `flex items-center px-4 py-3 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-50 text-blue-600 font-medium' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <span className="ml-2">All Coupons</span>
            </NavLink>

            <NavLink
              to="/dashboard/addcoupon"
              onClick={closeSidebar}
              className={({ isActive }) => 
                `flex items-center px-4 py-3 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-50 text-blue-600 font-medium' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <span className="ml-2">Add Coupon</span>
            </NavLink>
          </nav>
          
          <div className="mt-auto pt-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-3 text-left text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
            >
              <span className="ml-2">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity"
          onClick={closeSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;