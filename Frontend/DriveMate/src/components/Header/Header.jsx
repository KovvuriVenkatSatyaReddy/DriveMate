import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout as logoutApi } from '../../api/authApi';

const Header = () => {
  const authStatus = useSelector((state) => state.auth.isAuthenticated);
  const userId = useSelector((state) => state.auth.user?._id); // Move this outside the function
  const location = useLocation(); // Hook to get the current route
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use this for navigation

  // Navigation items with the route and active status
  const navItems = [
    { name: 'Dashboard', to: '/dashboard', active: authStatus },
    { name: 'Login', to: '/login', active: !authStatus },
  ];

  const handleLogout = async () => {
    if (!userId) {
      console.error('User ID not found. Cannot logout.');
      return;
    }

    try {
      await logoutApi(dispatch, userId); // Await the logout function
      navigate('/login'); // Redirect after successful logout
    } catch (error) {
      console.error('Logout error:', error); // Handle logout error
    }
  };

  return (
    <header className="bg-blue-600 text-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          DriveMate
        </Link>

        {/* Navigation Links */}
        <nav className="space-x-4">
          {navItems.map(
            (item) =>
              item.active && (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`hover:text-black ${
                    location.pathname === item.to ? 'text-blue-800 bg-yellow-500 px-4 py-1 rounded-full' : ''
                  }`}
                >
                  {item.name}
                </Link>
              )
          )}
          {authStatus && (
            <button
              onClick={handleLogout}
              className="hover:text-black bg-red-600 px-4 py-1 rounded-full"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
