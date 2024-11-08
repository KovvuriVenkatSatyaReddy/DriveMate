import React from 'react';

const BannedUserListItem = ({ user, onUnban }) => {
  return (
    <div className="banned-user-card border border-red-600 rounded p-4 mb-4 flex justify-between items-center">
      <div>
        {/* Displaying limited information */}
        <h4 className="text-lg font-semibold text-red-600">{user.name}</h4>
        <p>Email: {user.email}</p>
        {user.placed && (
          <p className="bg-green-500 text-white px-2 py-1 rounded text-sm inline-block">
            Placed
          </p>
        )}
      </div>

      {/* Unban Button */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={onUnban}
      >
        Unban User
      </button>
    </div>
  );
};

export default BannedUserListItem;
