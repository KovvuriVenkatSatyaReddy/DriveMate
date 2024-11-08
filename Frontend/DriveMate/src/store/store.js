import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './userSlice';
import driveReducer from './driveSlice'
// import { thunk } from 'redux-thunk';
const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer, 
    drives: driveReducer,
  },
  // middleware: [thunk],
});

export default store;