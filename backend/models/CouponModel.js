import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, "Coupon code is required"],
    unique: true,
    uppercase: true,
  },
  name: {
    type: String,
    required: [true, "Coupon name is required"],
    trim: true,
  },
  discountType: {
    type: String,
    enum: ["percentage", "fixed"],
    required: true,
  },
  discountValue: {
    type: Number,
    required: [true, "Discount value is required"],
    min: [1, "Discount value must be at least 1"],
  },
  totalQuantity: {
    type: Number,
    default: 1,
  },
  currentUses: {
    type: Number,
    default: 0,
  },
  minOrderValue: {
    type: Number,
    default: 0,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    required: [true, "End date is required"],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

couponSchema.index({ code: 1 }, { unique: true });
couponSchema.index({ endDate: 1 });
couponSchema.index({ isActive: 1 });

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;
