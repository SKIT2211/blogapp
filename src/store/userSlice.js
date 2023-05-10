import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axoisInstance from "../services/axoisInstance";

 
export const getUsers = createAsyncThunk("users/getUsers", async () => {
  try {
      const response = await axoisInstance.get(`http://localhost:9000/users/allusers`);
      const users = await response?.data;
      if (users.length > 0) {
        return users;
      } else {
        toast.error("No Users Found");
      }
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
}); 

const initialState = {
  users: [],
  loading: false,
  error: "",
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.loading = true;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    },
    [getUsers.rejected]: (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    },
  },
});

export default usersSlice.reducer;