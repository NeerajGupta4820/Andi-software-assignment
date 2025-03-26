import User from "../models/userModel";
import Coupon from "../models/couponModeld";

/**
 * User Profile Controllers
 */
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Server error",
      error: error.message 
    });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const updates = {
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      ...(req.body.password && { password: req.body.password })
    };

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ 
      success: true, 
      message: "Profile updated successfully",
      data: user 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Profile update failed",
      error: error.message 
    });
  }
};

/**
 * User Management Controllers (Admin Only)
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" })
      .select("-password")
      .sort({ createdAt: -1 });
      
    res.status(200).json({ 
      success: true, 
      count: users.length,
      data: users 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch users",
      error: error.message 
    });
  }
};

const getApprovedUsers = async (req, res) => {
  try {
    const users = await User.find({ status: "approved", role: "user" })
      .select("-password")
      .sort({ createdAt: -1 });
      
    res.status(200).json({ 
      success: true, 
      count: users.length,
      data: users 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch approved users",
      error: error.message 
    });
  }
};

const getPendingUsers = async (req, res) => {
  try {
    const users = await User.find({ status: "pending", role: "user" })
      .select("-password")
      .sort({ createdAt: -1 });
      
    res.status(200).json({ 
      success: true, 
      count: users.length,
      data: users 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch pending users",
      error: error.message 
    });
  }
};

const getRejectedUsers = async (req, res) => {
  try {
    const users = await User.find({ status: "rejected", role: "user" })
      .select("-password -rejectionReason")
      .sort({ createdAt: -1 });
      
    res.status(200).json({ 
      success: true, 
      count: users.length,
      data: users 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch rejected users",
      error: error.message 
    });
  }
};

const updateUserStatus = async (req, res) => {
  const { userId } = req.params;
  const { status, reason } = req.body;

  // Validate status
  if (!["approved", "rejected", "pending"].includes(status)) {
    return res.status(400).json({ 
      success: false, 
      message: "Invalid status value" 
    });
  }

  try {
    const updateData = { status };
    if (status === "rejected" && reason) {
      updateData.rejectionReason = reason;
    }

    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: `User status updated to ${status}`,
      data: user 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Failed to update user status",
      error: error.message 
    });
  }
};

/**
 * Coupon Redemption Controller
 */
const redeemCoupon = async (req, res) => {
  try {
    const { code } = req.body;

    if (typeof code !== "string") {
      return res.status(400).json({ success: false, message: "Invalid coupon format" });
    }

    const coupon = await Coupon.findOne({ code: code.trim() });

    if (!coupon) {
      return res.status(404).json({ success: false, message: "Coupon not found" });
    }

    if (coupon.currentUses >= coupon.totalQuantity) {
      return res.status(400).json({ success: false, message: "Coupon usage limit reached" });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const alreadyRedeemed = user.redeemedCoupons.some(
      (c) => c.coupon.toString() === coupon._id.toString()
    );

    if (alreadyRedeemed) {
      return res.status(400).json({ success: false, message: "Coupon already redeemed" });
    }

    // Redeem coupon
    user.redeemedCoupons.push({ coupon: coupon._id });
    coupon.currentUses += 1;

    await Promise.all([user.save(), coupon.save()]);

    res.status(200).json({ success: true, message: "Coupon redeemed successfully", data: coupon });
  } catch (error) {
    res.status(500).json({ success: false, message: "Coupon redemption failed", error: error.message });
  }
};

const getAllRedeemedCoupons = async (req, res) => {
  try {
    const userId = req.user.id; 
    
    const user = await User.findById(userId).populate({
      path: "redeemedCoupons.coupon",
      select: "code discount description",
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      count: user.redeemedCoupons.length,
      data: user.redeemedCoupons,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch redeemed coupons",
      error: error.message,
    });
  }
};

export {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getApprovedUsers,
  getPendingUsers,
  getRejectedUsers,
  updateUserStatus,
  redeemCoupon,
  getAllRedeemedCoupons
};