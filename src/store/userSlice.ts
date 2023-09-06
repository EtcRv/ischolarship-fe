import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  isLogin: false,
  user: {}
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToken(state, action) {
      const { token } = action.payload;
      state.token = token;
    },
    updateUser(state, action) {
      const {user} = action.payload
      state.user = user;
    },
    updateLoginStatus(state) {
      state.isLogin = !state.isLogin
    }
  
  },
});

export const { addToken, updateUser, updateLoginStatus } = userSlice.actions;

export default userSlice.reducer;