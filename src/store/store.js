import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./userSlice";
import blogReducer from "./blogSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    blogs: blogReducer,
  },
});
