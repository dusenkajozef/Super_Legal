import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
};

const badMessagesSlice = createSlice({
  name: "messagesBad",
  initialState,
  reducers: {
    setBadMessages: (state, action) => {
      state.messages = action.payload;
    },
    addBadMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const { setBadMessages, addBadMessage } = badMessagesSlice.actions;

export default badMessagesSlice.reducer;
