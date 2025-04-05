import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
};

const goodMessagesSlice = createSlice({
  name: "messagesGood",
  initialState,
  reducers: {
    setGoodMessages: (state, action) => {
      state.messages = action.payload;
    },
    addGoodMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const { setGoodMessages, addGoodMessage } = goodMessagesSlice.actions;

export default goodMessagesSlice.reducer;
