import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: null,
  allUsers: [],
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateProfileLocally: (state, action) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
  },
});

export const { updateProfileLocally } = userSlice.actions;
export default userSlice.reducer;

export const selectUserProfile = (state) => state.user.profile;
export const selectAllUsers = (state) => state.user.allUsers;