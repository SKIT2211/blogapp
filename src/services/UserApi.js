import axoisInstance from "../services/axoisInstance";
import { toast } from "react-toastify";
import { APIS } from "../constants/constant";

export const registerUser = async (data) => {
  try {
    const response = await axoisInstance.post(
      `${APIS.USERS_API}/register`,
      data
    );
    const user = await response?.data;
    if (!user) {
      toast.error("User not registered");
    } else {
      toast.success("User Registered Successfully");
    }
  } catch (e) {
    toast.error("error", e.message);
  }
};

export const loginUser = async (data) => {
  try {
    const response = await axoisInstance.post(`${APIS.USERS_API}/login`, data);
    const user = await response?.data;
    if (user?.data) {
      toast.success(user.msg);
      localStorage.setItem("Loggedinuser", JSON.stringify(user));
      localStorage.setItem("AccessToken", JSON.stringify(user.accessToken));
      localStorage.setItem("RefreshToken", JSON.stringify(user.refreshToken));
    } else {
      toast.error(user.msg);
    }
  } catch (e) {
    toast.error("Details not correct, Try again!", e.message);
  }
};

export const deleteUser = async (_id) => {
  try {
    const response = await axoisInstance.delete(
      `${APIS.USERS_API}/allusers/${_id}`
    );
    const user = await response?.data;
    if (!user) {
      toast.error("User not deleted");
    } else {
      toast.success("User Removed!!");
    }
  } catch (e) {
    toast.error("error", e.message);
  }
};

export const updateRole = async (payload) => {
  let { _id } = payload;
  try {
    const response = await axoisInstance.put(
      `${APIS.USERS_API}/allusers/${_id}`,
      payload
    );
    const user = await response?.data;
    if (!user) {
      toast.error("Role not updated");
    } else {
      toast.success("Role Changed!!");
    }
  } catch (e) {
    toast.error("error", e.message);
  }
};

export const userValidd = async (params) => {
  try {
    await axoisInstance.get(
      `${APIS.USERS_API}/forgotpassword/${params.id}/${params.token}`
    );
  } catch (e) {
    toast.error("error", e.message);
  }
};
