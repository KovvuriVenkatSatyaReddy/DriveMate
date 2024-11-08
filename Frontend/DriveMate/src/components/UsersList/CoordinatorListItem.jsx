import React from 'react';

function CoordinatorListItem({ user, placed = false, onDemote, onBan }) {
  return (
    <div key={user._id} className="bg-gray-100 p-4 rounded-lg mb-2 flex justify-between items-center">
      <div>
        <p>
          <strong>{user.name}</strong> (Coordinator)
          {user.placed && (
            <span className="ml-2 bg-green-500 text-white px-2 py-1 rounded text-sm">
              Placed
            </span>
          )}
        </p>
        <p>Email: {user.email}</p>
      </div>

      <div className="action-buttons flex space-x-2">
        {/* Demote Button */}
        <button onClick={onDemote} className="bg-red-500 text-white px-4 py-2 rounded">
          Demote to User
        </button>

        {/* Ban Button */}
        <button onClick={onBan} className="bg-yellow-500 text-white px-4 py-2 rounded">
          Ban Coordinator
        </button>
      </div>
    </div>
  );
}

export default CoordinatorListItem;
