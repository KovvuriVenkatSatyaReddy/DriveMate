import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginSignup from './components/loginSignup/LoginSignup.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import ErrorPage from './components/ErrorPage/ErrorPage.jsx';
import './index.css';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import store from './store/store.js';
import { Provider } from 'react-redux';
import Profile from './components/Profile/Profile.jsx';
import Chat from './components/Chat/Chat.jsx';
import Notifications from './components/Notifications/Notifications.jsx';
import UsersList from './components/UsersList/UsersList.jsx';
import DriveDetails from './components/Dashboard/DriveDetails.jsx';
import UserDetails from './components/UsersList/UserDetails.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'login',
        element: <LoginSignup />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'drive',
        element: <Dashboard />,  // Parent route to display drive listing
      },
      {
        path: 'drive/:driveName',   // Directly map this route to DriveDetails
        element: <DriveDetails />,
      },
      {
        path: 'chat',
        element: <Chat />,
      },
      {
        path: 'notifications',
        element: <Notifications />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'admin',
        children: [
          {
            path: 'user-list',
            element: <UsersList />,
          },
          {
            path: 'user-details/:userId',  // Route for viewing user details
            element: <UserDetails />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition: Bounce
      />
    </Provider>
  </React.StrictMode>
);
