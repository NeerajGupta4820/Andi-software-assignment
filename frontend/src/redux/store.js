import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../redux/features/auth/authApi';
import { userApi } from '../redux/features/user/userApi';
import { couponApi } from '../redux/features/coupon/couponApi';
import authReducer from '../redux/features/auth/authSlice';
import userReducer from '../redux/features/user/userSlice';
import couponReducer from '../redux/features/coupon/couponSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [couponApi.reducerPath]: couponApi.reducer,
    auth: authReducer,
    user: userReducer,
    coupon: couponReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(couponApi.middleware),
});