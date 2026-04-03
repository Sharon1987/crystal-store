import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: [],
  reducers: {
    // 推入新訊息
    pushMessage(state, action) {
      const { text, type = "success" } = action.payload;
      const id = Date.now();
      state.push({ id, text, type });
    },
    // 移除特定訊息
    removeMessage(state, action) {
      const index = state.findIndex((item) => item.id === action.payload);
      state.splice(index, 1);
    },
  },
});

export const { pushMessage, removeMessage } = messageSlice.actions;
export default messageSlice.reducer;
