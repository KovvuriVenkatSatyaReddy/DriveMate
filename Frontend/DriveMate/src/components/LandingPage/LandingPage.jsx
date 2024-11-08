import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Sidebar from '../Sidebar/Sidebar';
import SidebarItem from '../Sidebar/SidebarItem';
import LoginSignup from '../loginSignup/LoginSignup'; // Import LoginSignup component
import { LayoutDashboard, MessageCircle, User, Bell, BarChart } from 'lucide-react';

const LandingPage = () => {
  const role = useSelector((state) => state.auth.user?.role || "student");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Get isAuthenticated from Redux state
  console.log(role);

  useEffect(() => {}, [role]);

  if (!isAuthenticated) {
    return <LoginSignup />; // Show LoginSignup page if not authenticated
  }

  return (
    <div className='h-screen flex flex-col'>
      {/* Sticky header */}
      <Header className='sticky top-0 z-10' />
      
      {/* Main content with flex layout */}
      <div className='flex flex-1'>
        {/* Sidebar with its own scrollbar */}
        <div className='sticky top-0 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300'>
          <Sidebar>
            <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" to="/dashboard" />
            <SidebarItem icon={<MessageCircle size={20} />} text="Chat" to="/chat" alert />
            <SidebarItem icon={<Bell size={20} />} text="Notifications" to="/notifications" />
            {role === 'admin' && (
              <>
                <SidebarItem icon={<User size={20} />} text="User List" to="/admin/user-list" />
                {/* <SidebarItem icon={<BarChart size={20} />} text="Statistics" to="/admin/statistics" /> */}
              </>
            )}
            <hr className='my-3' />
            <SidebarItem icon={<User size={20} />} text="Profile" to="/profile" />
          </Sidebar>
        </div>

        {/* Scrollable main content */}
        <div className='flex-1 overflow-y-auto p-6'>
          <Outlet />
        </div>
      </div>

      {/* Sticky footer (optional) */}
      <Footer className='sticky bottom-0' />
    </div>
  );
}

export default LandingPage;
