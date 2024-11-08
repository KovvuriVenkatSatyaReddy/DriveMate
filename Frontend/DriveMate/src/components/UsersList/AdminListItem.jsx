import React from 'react';

function AdminListItem({ user, placed = false }) {
  return (
    <div key={user._id} className="bg-gray-100 p-4 rounded-lg mb-2">
      <p>
        <strong>{user.name}</strong> (Admin)
        {placed && (
          <span className="ml-2 bg-green-500 text-white px-2 py-1 rounded text-sm">
            Placed
          </span>
        )}
      </p>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default AdminListItem;
