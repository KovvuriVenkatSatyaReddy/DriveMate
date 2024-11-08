import React, { useState } from 'react';
import NotificationCard from './NotificationCard';

function Notifications() {
  // Mock data: You can fetch this data from an API
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Drive: Google Summer Internship',
      description: 'Google is offering internships for 2025 batch students. Apply now!',
      timestamp: '1 hour ago',
      driveLink: '/internships/google-summer-internship', // Link to the drive details
    },
    {
      id: 2,
      title: 'TCS Digital Hiring Drive',
      description: 'TCS is conducting a hiring drive for fresh graduates in November. Register soon!',
      timestamp: '3 hours ago',
      driveLink: '/hiring/tcs-digital-hiring', // Link to the drive details
    },
    {
      id: 3,
      title: 'Infosys Off-Campus Drive',
      description: 'Infosys is hiring for multiple roles. Check out the details and apply!',
      timestamp: '1 day ago',
      driveLink: '/hiring/infosys-off-campus-drive', // Link to the drive details
    },
  ]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Notifications</h2>
      <div>
        {notifications.map((notification) => (
          <NotificationCard
            key={notification.id}  // Adding a unique key for each NotificationCard
            notification={notification}
          />
        ))}
      </div>
    </div>
  );
}

export default Notifications;
