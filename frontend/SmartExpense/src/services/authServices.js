import axios from "axios";
import { BASE_URL } from "../utils/constants";

export const loginUser = (data) => {
  return axios.post(
    BASE_URL + "/login",
    data,
    {
      withCredentials: true,
    }
  );
};

export const signupUser = (data) => {
  return axios.post(
    BASE_URL + "/signup",
    data,
    {
      withCredentials: true,
    }
  );
};

export const logoutUser = () => {
  return axios.post(
    BASE_URL + "/logout",
    {},
    {
      withCredentials: true,
    }
  );
};

export const getProfile = () => {
  return axios.get(
    BASE_URL + "/profile",
    {
      withCredentials: true,
    }
  );
};