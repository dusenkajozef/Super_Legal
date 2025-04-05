import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  prompt: "",
};

const promptSlice = createSlice({
  name: "prompt",
  initialState,
  reducers: {
    setPrompt: (state, action) => {
      state.prompt = action.payload;
    },
  },
});

export const { setPrompt } = promptSlice.actions;

export default promptSlice.reducer;
