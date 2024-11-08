
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      console.log(state.user);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
    updateUser: (state, action) => {
      state.user = action.payload.user;
      console.log(state.user);
      
    },
  },
});

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;


// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   isAuthenticated: false,
//   user: null,
//   token: null,
//   banned: false,
//   placed: true,
//   role: "admin",
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     login: (state, action) => {
//       state.isAuthenticated = true;
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//       state.role = action.payload.role;
//       state.banned = action.payload.banned;
//       state.placed = action.payload.placed;
//     },
//     logout: (state) => {
//       state.isAuthenticated = false;
//       state.user = null;
//       state.token = null;
//       state.role = null;
//       state.banned = false;
//       state.placed = true;
//     },
//     setUser: (state, action) => {
//       state.user = action.payload;
//       state.role = action.payload.role;
//     },
//   },
// });

// export const { login, logout, setUser } = authSlice.actions;
// export default authSlice.reducer;
