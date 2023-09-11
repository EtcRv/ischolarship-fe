import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isRecommend: true,
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    updateRecommendStatus(state) {
      state.isRecommend = !state.isRecommend
    }
  },
});

export const { updateRecommendStatus } = settingSlice.actions;

export default settingSlice.reducer;