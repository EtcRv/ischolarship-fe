import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  isLogin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
   
    addToken(state, action) {
      const { token } = action.payload;
      state.token = token;
    },
  
  },
});

export const { addToken } = userSlice.actions;

export default userSlice.reducer;