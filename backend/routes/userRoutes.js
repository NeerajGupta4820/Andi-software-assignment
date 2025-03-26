import express from 'express';
import { 
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getApprovedUsers,
  getPendingUsers,
  getRejectedUsers,
  updateUserStatus,
  redeemCoupon,
  getAllRedeemedCoupons
} from '../controllers/userController.js';
import { checkLogin, checkAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/profile').get(checkLogin, getUserProfile).put(checkLogin, updateUserProfile);
router.route('/').get(checkLogin, checkAdmin, getAllUsers); 
router.route('/approved').get(checkLogin, checkAdmin, getApprovedUsers); 
router.route('/pending').get(checkLogin, checkAdmin, getPendingUsers); 
router.route('/rejected').get(checkLogin, checkAdmin, getRejectedUsers); 
router.route('/:userId/status').put(checkLogin, checkAdmin, updateUserStatus); 
router.route('/redeem').post(checkLogin, redeemCoupon);
router.route('/redeemed-coupons').get(checkLogin, getAllRedeemedCoupons);

export default router;