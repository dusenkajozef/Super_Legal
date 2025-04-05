import { configureStore } from "@reduxjs/toolkit";
import promptReducer from "./promptSlice";
import goodMessagesReducer from "./goodMessagesSlice";
import badMessagesReducer from "./badMessagesSlice";

export const store = configureStore({
  reducer: {
    prompt: promptReducer,
    goodMessages: goodMessagesReducer,
    badMessages: badMessagesReducer,
  },
});
