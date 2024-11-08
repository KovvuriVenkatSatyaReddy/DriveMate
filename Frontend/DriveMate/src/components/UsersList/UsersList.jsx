import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { banUser, unbanUser } from '../../store/userSlice';
import AdminListItem from './AdminListItem';
import CoordinatorListItem from './CoordinatorListItem';
import UserListItem from './UserListItem';
import BannedUserListItem from './BannedUserListItem';
import { demoteToUser, fetchAllUsers, promoteToCoordinator ,banUser,unBanUser} from '../../api/authApi';
import { Diameter } from 'lucide-react';

const UsersList = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    fetchAllUsers(dispatch);
  },[])
  const accessToken = useSelector(state => state.auth.accessToken);

  const admins = useSelector((state) => state.users.admins);
  const coordinators = useSelector((state) => state.users.coordinators);
  const normalUsers = useSelector((state) => state.users.students);
  const bannedUsers = useSelector((state) => state.users.bannedStudents);

  const handlePromoteToCoordinator = (userId) => {
    // dispatch(promoteToCoordinator(userId));
    console.log("in hpc");
    
    promoteToCoordinator(userId,accessToken,dispatch);
  };

  const handleDemoteToUser = (userId) => {
    // dispatch(demoteToUser(userId));
    demoteToUser(userId,accessToken,dispatch);
  };

  const handleBanUser = (userId) => {
    banUser(userId,accessToken,dispatch);
    // dispatch(banUser(userId));
  };

  const handleUnbanUser = (userId) => {
    unBanUser(userId,accessToken,dispatch);
    // dispatch(unbanUser(userId));
  };

  return (
    <div className="user-list-widget p-4">
      <h2 className="text-2xl font-bold mb-6">User List</h2>

      {/* Admins Section */}
      <section className="mb-6">
        <h3 className="text-xl font-semibold text-blue-600 mb-4">Admins</h3>
        {admins.length > 0 ? (
          admins.map((user) => (
            <AdminListItem key={user._id} user={user} />
          ))
        ) : (
          <p>No admins found.</p>
        )}
      </section>

      {/* Coordinators Section */}
      <section className="mb-6">
        <h3 className="text-xl font-semibold text-green-600 mb-4">Coordinators</h3>
        {coordinators.length > 0 ? (
          coordinators.map((user) => (
            <CoordinatorListItem
              key={user._id}
              user={user}
              onDemote={() => handleDemoteToUser(user._id)}
              onBan={() => handleBanUser(user._id)}
            />
          ))
        ) : (
          <p className='flex flex-1 space-x-1 justify-center font-semi-bold bg-gray-100 text-lg py-4 rounded'>No coordinators found.</p>
        )}
      </section>

      {/* Normal Users Section */}
      <section className="mb-6">
        <h3 className="text-xl font-semibold text-gray-600 mb-4">Active Users</h3>
        {normalUsers.length > 0 ? (
          normalUsers.map((user) => (
            <UserListItem
              key={user._id}
              user={user}
              onPromote={() => handlePromoteToCoordinator(user._id)}
              onBan={() => handleBanUser(user._id)}
            />
          ))
        ) : (
          <p className='flex flex-1 space-x-1 justify-center font-semi-bold bg-gray-100 text-lg py-4 rounded'>No active users found.</p>
        )}
      </section>

      {/* Banned Users Section */}
      <section className="mb-6">
        <h3 className="text-xl font-semibold text-red-600 mb-4">Banned Users</h3>
        {bannedUsers.length > 0 ? (
          bannedUsers.map((user) => (
            <BannedUserListItem 
              key={user._id} 
              user={user} 
              onUnban={() => handleUnbanUser(user._id)} 
            />
          ))
        ) : (
          <p className='flex flex-1 space-x-1 justify-center font-semi-bold bg-gray-100 text-lg py-4 rounded'>No banned users.</p>
        )}
      </section>
    </div>
  );
};

export default UsersList;
