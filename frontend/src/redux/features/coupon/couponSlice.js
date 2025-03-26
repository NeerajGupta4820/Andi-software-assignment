import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  availableCoupons: [],
  status: 'idle',
  error: null,
};

const couponSlice = createSlice({
  name: 'coupon',
  initialState,
  reducers: {
    couponRedeemed: (state, action) => {
      state.availableCoupons = state.availableCoupons.filter(
        coupon => coupon._id !== action.payload
      );
    },
  },
});

export const { couponRedeemed } = couponSlice.actions;
export default couponSlice.reducer;

export const selectAvailableCoupons = (state) => state.coupon.availableCoupons;