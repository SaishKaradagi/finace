import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import goalReducer from "./goalSlice";
import chatReducer from "./chatSlice";
import postsReducer from "./postSlice"; // <-- Import postSlice

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
    chat: chatReducer,
    posts: postsReducer, // <-- Add posts reducer here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
