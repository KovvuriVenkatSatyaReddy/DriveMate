import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { banUser, markUserAsPlaced } from '../../store/userSlice'; // Create actions to handle banning and placement

const UserDetails = () => {
  const { userId } = useParams();  // Fetch the userId from the URL params
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch user details from the store (assuming you have a slice for users)
  const user = useSelector((state) => state.auth.find(user => user.id === userId));

  const [isBanned, setIsBanned] = useState(user?.banned);
  const [isPlaced, setIsPlaced] = useState(user?.placed);

  useEffect(() => {
    if (!user) {
      // Redirect if user not found
      navigate('/admin/user-list');
    }
  }, [user, navigate]);

  const handleBanUser = () => {
    dispatch(banUser(userId));  // Dispatch the action to ban the user
    setIsBanned(true);
  };

  const handleMarkAsPlaced = () => {
    dispatch(markUserAsPlaced(userId));  // Dispatch the action to mark the user as placed
    setIsPlaced(true);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">User Details</h1>
      
      {user ? (
        <div className="bg-white p-4 rounded shadow-md">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Personal Email:</strong> {user.personalEmail}</p>
          <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>10th Percentage:</strong> {user.tenthPercentage}%</p>
          <p><strong>12th Percentage:</strong> {user.twelfthPercentage}%</p>
          <p><strong>Current GPA:</strong> {user.gpa}</p>
          <p><strong>Resume:</strong> <a href={user.resumeLink} target="_blank" rel="noopener noreferrer">View Resume</a></p>
          
          <div className="mt-4">
            {isBanned ? (
              <p className="text-red-600">This user is banned from further drives.</p>
            ) : (
              <button onClick={handleBanUser} className="bg-red-500 text-white px-4 py-2 rounded">
                Ban User
              </button>
            )}

            {isPlaced ? (
              <p className="text-green-600">This user is already placed and cannot apply for future drives.</p>
            ) : (
              <button onClick={handleMarkAsPlaced} className="bg-blue-500 text-white px-4 py-2 rounded ml-4">
                Mark as Placed
              </button>
            )}
          </div>
        </div>
      ) : (
        <p>User not found.</p>
      )}
    </div>
  );
};

export default UserDetails;
