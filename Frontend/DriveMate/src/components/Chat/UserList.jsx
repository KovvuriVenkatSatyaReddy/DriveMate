import React from 'react';

function UserList({ users, selectUser }) {
  return (
    <div className="mb-4">
      {users.map((user) => (
        <div
          key={user.id}
          onClick={() => selectUser(user)}
          className="p-2 mb-2 bg-white shadow-md rounded-md cursor-pointer hover:bg-blue-50"
        >
          <div className="flex flex-col">
            <h3 className="font-semibold text-blue-800 truncate max-w-full">{user.name}</h3>
            <span className="text-gray-500 truncate max-w-full">{user.email}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserList;
