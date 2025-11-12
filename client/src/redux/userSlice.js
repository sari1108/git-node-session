import { createSlice } from '@reduxjs/toolkit';

const userToken = localStorage.getItem("userToken") || null;

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: userToken ? JSON.parse(userToken) : null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("userToken", JSON.stringify(action.payload));
    },
    clearToken: (state) => {
      state.token = null;
      localStorage.removeItem("userToken");
    }
  }
});

export const { setToken, clearToken } = userSlice.actions;
export default userSlice.reducer;
