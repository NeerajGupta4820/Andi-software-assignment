import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateCouponMutation } from "../../redux/features/coupon/couponApi";
import { toast } from "react-hot-toast";

const CreateCoupon = () => {
  const navigate = useNavigate();
  const [createCoupon, { isLoading }] = useCreateCouponMutation();
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    discountType: "percentage",
    discountValue: "",
    minOrderValue: "",
    totalQuantity: "",
    // startDate: "",
    // endDate: "",
    isActive: true,
  });

  const validateCode = (code) => {
    const specialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    return specialChars.test(code);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === "code") {
      const uppercaseValue = value.toUpperCase();
      setFormData({ ...formData, [name]: uppercaseValue });
      
      if (uppercaseValue && !validateCode(uppercaseValue)) {
        setErrors({ ...errors, code: "Code must contain at least one special character" });
      } else {
        const newErrors = { ...errors };
        delete newErrors.code;
        setErrors(newErrors);
      }
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
      
      // Clear error when field is filled
      if (value && errors[name]) {
        const newErrors = { ...errors };
        delete newErrors[name];
        setErrors(newErrors);
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.code) {
      newErrors.code = "Code is required";
    } else if (!validateCode(formData.code)) {
      newErrors.code = "Code must contain at least one special character";
    }
    if (!formData.discountValue) newErrors.discountValue = "Discount value is required";
    if (!formData.totalQuantity) newErrors.totalQuantity = "Total quantity is required";
    // if (!formData.startDate) newErrors.startDate = "Start date is required";
    // if (!formData.endDate) newErrors.endDate = "End date is required";
    
    // Validate end date is after start date
    // if (formData.startDate && formData.endDate && new Date(formData.endDate) <= new Date(formData.startDate)) {
    //   newErrors.endDate = "End date must be after start date";
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }
    
    try {
      await createCoupon({
        ...formData,
        discountValue: Number(formData.discountValue),
        minOrderValue: Number(formData.minOrderValue) || 0,
        totalQuantity: Number(formData.totalQuantity),
        // startDate: new Date(formData.startDate).toISOString(),
        // endDate: new Date(formData.endDate).toISOString(),
      }).unwrap();

      toast.success("Coupon created successfully!");
      navigate("allcoupons");
    } catch (error) {
      toast.error(`Failed to create coupon: ${error.data?.message || "Please try again"}`);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">Create New Coupon</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* First Row - 3 fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Code <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border ${errors.code ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 uppercase`}
              placeholder="e.g., SAVE20#"
            />
            {errors.code && (
              <p className="mt-1 text-sm text-red-500">{errors.code}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Discount Type <span className="text-red-500">*</span></label>
            <select
              name="discountType"
              value={formData.discountType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed Amount</option>
            </select>
          </div>
        </div>

        {/* Second Row - 3 fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Discount Value <span className="text-red-500">*</span></label>
            <input
              type="number"
              name="discountValue"
              value={formData.discountValue}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border ${errors.discountValue ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.discountValue && (
              <p className="mt-1 text-sm text-red-500">{errors.discountValue}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Order Value</label>
            <input
              type="number"
              name="minOrderValue"
              value={formData.minOrderValue}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Quantity <span className="text-red-500">*</span></label>
            <input
              type="number"
              name="totalQuantity"
              value={formData.totalQuantity}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border ${errors.totalQuantity ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.totalQuantity && (
              <p className="mt-1 text-sm text-red-500">{errors.totalQuantity}</p>
            )}
          </div>
        </div>

        {/* Third Row - 2 fields (dates) */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date <span className="text-red-500">*</span></label>
            <input
              type="datetime-local"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border ${errors.startDate ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.startDate && (
              <p className="mt-1 text-sm text-red-500">{errors.startDate}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date <span className="text-red-500">*</span></label>
            <input
              type="datetime-local"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border ${errors.endDate ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.endDate && (
              <p className="mt-1 text-sm text-red-500">{errors.endDate}</p>
            )}
          </div>
        </div> */}
        
        {/* Active checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleInputChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">Active</label>
        </div>

        {/* Submit button */}
        <div>
          <button
            type="submit"
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={isLoading || Object.keys(errors).length > 0}
          >
            {isLoading ? "Creating..." : "Create Coupon"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCoupon;