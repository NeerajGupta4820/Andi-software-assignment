import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: `${import.meta.env.VITE_BASE_URL}/api/user`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => '/profile',
      providesTags: ['User'],
    }),
    updateProfile: builder.mutation({
      query: (userData) => ({
        url: '/profile',
        method: 'PUT',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
    getAllUsers: builder.query({
      query: () => '/',
      providesTags: ['User'],
    }),
    getApprovedUsers: builder.query({
      query: () => '/approved',
      providesTags: ['User'],
    }),
    getPendingUsers: builder.query({
      query: () => '/pending',
      providesTags: ['User'],
    }),
    getRejectedUsers: builder.query({
      query: () => '/rejected',
      providesTags: ['User'],
    }),
    updateUserStatus: builder.mutation({
      query: ({ userId, status, reason }) => ({
        url: `/${userId}/status`,
        method: 'PUT',
        body: { status, reason },
      }),
      invalidatesTags: ['User'],
    }),
    redeemCoupon: builder.mutation({
      query: (code) => ({
        url: '/redeem',
        method: 'POST',
        body: { code },
      }),
      invalidatesTags: ['User'],
    }),
    getAllRedeemedCoupons: builder.query({
      query: () => '/redeemed-coupons',
      providesTags: ['User'],
    }),
  }),
});

export const { 
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetAllUsersQuery,
  useGetApprovedUsersQuery,
  useGetPendingUsersQuery,
  useGetRejectedUsersQuery,
  useUpdateUserStatusMutation,
  useRedeemCouponMutation,
  useGetAllRedeemedCouponsQuery
} = userApi;