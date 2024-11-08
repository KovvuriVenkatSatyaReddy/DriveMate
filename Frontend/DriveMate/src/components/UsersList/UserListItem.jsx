import React from 'react';

function UserListItem({ user , onPromote, onDemote, onBan }) {
  return (
    <div key={user._id} className="bg-gray-100 p-4 rounded-lg mb-2 flex justify-between items-center">
      <div>
        <p>
          <strong>{user.name}</strong>
          {user.placed && (
            <p className="bg-green-500 text-white mx-2 px-2 py-1 rounded text-sm inline-block">
                Placed
            </p>
          )}
        </p>
        <p>Email: {user.email}</p>
      </div>

      <div className="action-buttons flex space-x-2">
        {/* Show either promote or demote button based on user's role */}
        {user.role === 'student' ? (
          <button onClick={onPromote} className="bg-blue-500 text-white px-4 py-2 rounded">
            Promote to Coordinator
          </button>
        ) : (
          <button onClick={onDemote} className="bg-red-500 text-white px-4 py-2 rounded">
            Demote to User
          </button>
        )}

        {/* Ban Button */}
        <button onClick={onBan} className="bg-yellow-500 text-white px-4 py-2 rounded">
          Ban User
        </button>
      </div>
    </div>
  );
}

export default UserListItem;
