// Import useDispatch to send actions to Redux
import { useDispatch } from "react-redux";

// Import user actions from the user slice
import {
  addUser,
  removeUser,
} from "../store/userSlice";

// Import auth API functions
import {
  getProfile,
  logoutUser,
} from "../services/authService";

// Custom hook for login and logout
export function useAuth() {
  const dispatch = useDispatch();

  // Fetch the logged in user profile
  async function fetchUser() {
    try {
      // Call the API to get user profile
      const res = await getProfile();

      // Get the user data from the response
      const userData = res.data.data;

      // Save the user in Redux
      dispatch(addUser(userData));
    } catch (error) {
      // If profile fetch fails, user is not logged in
      dispatch(removeUser());
    }
  }

  // Log the user out
  async function logout() {
    try {
      // Call the logout API
      await logoutUser();

      // Remove user from Redux
      dispatch(removeUser());
    } catch (err) {
      console.log(err);
    }
  }

  // Return the functions so components can use them
  return {
    fetchUser: fetchUser,
    logout: logout,
  };
}
