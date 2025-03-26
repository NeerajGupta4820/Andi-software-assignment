import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const couponApi = createApi({
  reducerPath: 'couponApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: `${import.meta.env.VITE_BASE_URL}/api/coupon`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Coupon'],
  endpoints: (builder) => ({
    getCoupons: builder.query({
      query: () => '/',
      providesTags: ['Coupon'],
    }),
    createCoupon: builder.mutation({
      query: (couponData) => ({
        url: '/',
        method: 'POST',
        body: couponData,
      }),
      invalidatesTags: ['Coupon'],
    }),
    getAvailableCoupons: builder.query({
      query: () => '/available',
      providesTags: ['Coupon'],
    }),
    redeemCoupon: builder.mutation({
      query: (code) => ({
        url: '/redeem',
        method: 'POST',
        body: { code },
      }),
      invalidatesTags: ['Coupon'],
    }),
  }),
});

export const { 
  useGetCouponsQuery,
  useCreateCouponMutation,
  useGetAvailableCouponsQuery,
  useRedeemCouponMutation,
} = couponApi;