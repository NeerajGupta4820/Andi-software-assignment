// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';
// import User from "./models/UserModel.js"
// import connectDB from './config/db.js'; // Your DB connection file

// const indianUsers = [
//   {
//     name: "Arun Sharma",
//     email: "arun.sharma@example.com",
//     phone: "919876543210",
//     password: "password123",
//     role: "user",
//     status: "approved"
//   },
//   {
//     name: "Priya Patel",
//     email: "priya.patel@example.com",
//     phone: "919876543211",
//     password: "password123",
//     role: "user",
//     status: "approved"
//   },
//   {
//     name: "Vikram Singh",
//     email: "vikram.singh@example.com",
//     phone: "919876543212",
//     password: "password123",
//     role: "user",
//     status: "approved"
//   },
//   {
//     name: "Mohammed Khan",
//     email: "mohammed.khan@example.com",
//     phone: "919876543213",
//     password: "password123",
//     role: "user",
//     status: "approved"
//   },
//   {
//     name: "Deepika Iyer",
//     email: "deepika.iyer@example.com",
//     phone: "919876543214",
//     password: "password123",
//     role: "user",
//     status: "approved"
//   },
//   {
//     name: "Rajesh Gupta",
//     email: "rajesh.gupta@example.com",
//     phone: "919876543215",
//     password: "password123",
//     role: "user",
//     status: "approved"
//   },
//   {
//     name: "Ananya Reddy",
//     email: "ananya.reddy@example.com",
//     phone: "919876543216",
//     password: "password123",
//     role: "user",
//     status: "approved"
//   },
//   {
//     name: "Sanjay Verma",
//     email: "sanjay.verma@example.com",
//     phone: "919876543217",
//     password: "password123",
//     role: "user",
//     status: "approved"
//   },
//   {
//     name: "Meera Joshi",
//     email: "meera.joshi@example.com",
//     phone: "919876543218",
//     password: "password123",
//     role: "user",
//     status: "approved"
//   },
//   {
//     name: "Aarav Desai",
//     email: "aarav.desai@example.com",
//     phone: "919876543219",
//     password: "password123",
//     role: "admin", // One admin user
//     status: "approved"
//   }
// ];

// const seedDB = async () => {
//   try {
//     await connectDB();
    
//     console.log('Starting seed process...');
    
//     // Hash passwords and create users
//     for (const user of indianUsers) {
//       const salt = await bcrypt.genSalt(10);
//       user.password = await bcrypt.hash(user.password, salt);
      
//       await User.create(user);
//       console.log(`Created user: ${user.name}`);
//     }
    
//     console.log('Database seeded successfully!');
//     process.exit(0);
//   } catch (err) {
//     console.error('Seeding error:', err);
//     process.exit(1);
//   }
// };

// seedDB();


// import mongoose from 'mongoose';
// import Coupon from './models/CouponModel.js'; // Adjust path as needed
// import connectDB from './config/db.js';
// import User from './models/UserModel.js'; // Needed for createdBy reference

// // First get an admin user ID to use as createdBy
// const getAdminUserId = async () => {
//   const admin = await User.findOne({ role: 'admin' });
//   return admin._id;
// };

// const couponData = [
//   {
//     code: "SUMMER25",
//     name: "Summer Sale 25% Off",
//     discountType: "percentage",
//     discountValue: 25,
//     totalQuantity: 100,
//     minOrderValue: 500,
//     endDate: new Date('2025-08-31'),
//     isActive: true
//   },
//   {
//     code: "WELCOME10",
//     name: "New Customer Discount",
//     discountType: "percentage",
//     discountValue: 10,
//     totalQuantity: 200,
//     endDate: new Date('2025-12-31'),
//     isActive: true
//   },
//   {
//     code: "FLAT50",
//     name: "Flat ₹50 Off",
//     discountType: "fixed",
//     discountValue: 50,
//     totalQuantity: 150,
//     minOrderValue: 200,
//     endDate: new Date('2025-07-15'),
//     isActive: true
//   },
//   {
//     code: "FREESHIP",
//     name: "Free Shipping",
//     discountType: "fixed",
//     discountValue: 100, 
//     totalQuantity: 75,
//     minOrderValue: 1000,
//     endDate: new Date('2025-06-30'),
//     isActive: true
//   },
//   {
//     code: "BIGSALE30",
//     name: "Big Sale 30% Off",
//     discountType: "percentage",
//     discountValue: 30,
//     totalQuantity: 50,
//     minOrderValue: 1000,
//     endDate: new Date('2025-09-30'),
//     isActive: true
//   },
//   {
//     code: "WEEKEND20",
//     name: "Weekend Special",
//     discountType: "fixed",
//     discountValue: 1000,
//     totalQuantity: 80,
//     minOrderValue: 10000,
//     endDate: new Date('2025-07-31'),
//     isActive: true
//   },
//   {
//     code: "FIRSTORDER",
//     name: "First Order Discount",
//     discountType: "fixed",
//     discountValue: 205,
//     totalQuantity: 300,
//     minOrderValue: 2000,
//     endDate: new Date('2025-12-31'),
//     isActive: true
//   },
//   {
//     code: "LOYALTY10",
//     name: "Loyal Customer Reward",
//     discountType: "fixed",
//     discountValue: 200,
//     totalQuantity: 120,
//     minOrderValue: 700,
//     endDate: new Date('2025-11-30'),
//     isActive: true
//   },
//   {
//     code: "FLASH40",
//     name: "Flash Sale 40% Off",
//     discountType: "percentage",
//     discountValue: 140,
//     totalQuantity: 30,
//     minOrderValue: 1500,
//     endDate: new Date('2025-06-15'),
//     isActive: true
//   },
//   {
//     code: "HOLIDAY25",
//     name: "Holiday Special",
//     discountType: "percentage",
//     discountValue: 25,
//     totalQuantity: 100,
//     minOrderValue: 1000,
//     endDate: new Date('2025-12-25'),
//     isActive: true
//   },
//   {
//     code: "SAVE100",
//     name: "Save ₹100",
//     discountType: "fixed",
//     discountValue: 100,
//     totalQuantity: 60,
//     minOrderValue: 500,
//     endDate: new Date('2025-08-15'),
//     isActive: true
//   },
//   {
//     code: "MEMBER15",
//     name: "Member Exclusive",
//     discountType: "percentage",
//     discountValue: 15,
//     totalQuantity: 90,
//     minOrderValue: 1000,
//     endDate: new Date('2025-10-31'),
//     isActive: true
//   },
//   {
//     code: "SPRING20",
//     name: "Spring Sale",
//     discountType: "percentage",
//     discountValue: 20,
//     totalQuantity: 70,
//     minOrderValue: 1000,
//     endDate: new Date('2025-05-31'),
//     isActive: true
//   },
//   {
//     code: "B2G1",
//     name: "Buy 2 Get 1 Free",
//     discountType: "fixed", 
//     discountValue: 240, 
//     totalQuantity: 40,
//     minOrderValue: 1000,
//     endDate: new Date('2025-07-31'),
//     isActive: true
//   },
//   {
//     code: "ANNIVERSARY",
//     name: "Store Anniversary",
//     discountType: "percentage",
//     discountValue: 20,
//     totalQuantity: 200,
//     minOrderValue: 1000,
//     endDate: new Date('2025-08-15'),
//     isActive: true
//   }
// ];

// const seedCoupons = async () => {
//   try {
//     await connectDB();
    
//     const adminUserId = await getAdminUserId();
    
//     console.log('Starting coupon seed process...');
    
//     // Add createdBy to all coupons
//     const couponsWithCreator = couponData.map(coupon => ({
//       ...coupon,
//       createdBy: adminUserId
//     }));
    
//     await Coupon.deleteMany({}); // Clear existing coupons
    
//     await Coupon.insertMany(couponsWithCreator);
    
//     console.log('Successfully seeded 15 coupons!');
//     process.exit(0);
//   } catch (error) {
//     console.error('Coupon seeding error:', error);
//     process.exit(1);
//   }
// };

// seedCoupons();