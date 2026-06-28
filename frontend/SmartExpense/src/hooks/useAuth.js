import { useDispatch } from "react-redux";
import {
  addUser,
  removeUser,
} from "../store/userSlice";

import {
  getProfile,
  logoutUser,
} from "../services/authService";

export const useAuth = () => {
  const dispatch = useDispatch();

  const fetchUser = async () => {
    try {
      const res = await getProfile();

      dispatch(addUser(res.data.data));
    } catch {
      dispatch(removeUser());
    }
  };

  const logout = async () => {
    try {
      await logoutUser();

      dispatch(removeUser());
    } catch (err) {
      console.log(err);
    }
  };

  return {
    fetchUser,
    logout,
  };
};