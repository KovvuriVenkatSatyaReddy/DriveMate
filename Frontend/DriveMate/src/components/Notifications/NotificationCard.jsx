import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotificationCard({ notification }) {
  const navigate = useNavigate();

  const handleViewMore = () => {
    // Redirect to the full drive link
    navigate(notification.driveLink);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h3 className="font-semibold text-lg text-blue-600">{notification.title}</h3>
      <p className="text-gray-600">{notification.description}</p>
      <div className='flex flex-1 justify-between '>
        <span className="text-gray-400 text-sm">{notification.timestamp}</span>
        
        {/* View More Button */}
        <button
          onClick={handleViewMore}
          className="mt-2 text-blue-500 hover:underline"
        >
          View More
        </button>
      </div>
    </div>
  );
}

export default NotificationCard;
