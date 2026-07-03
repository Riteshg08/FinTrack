import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: true,
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },

    removeUser: (state) => {
      state.user = null;
      state.loading = false;
    },

    setLoading: (state) => {
      state.loading = true;
    },
  },
});

export const {
  addUser,
  removeUser,
  setLoading,
} = userSlice.actions;

export default userSlice.reducer;
