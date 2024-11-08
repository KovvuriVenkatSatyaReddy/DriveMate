import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../api/authApi';
const Profile = () => {
  // Initial user data (could be fetched from an API)
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user);
  const accessToken = useSelector(state => state.auth.accessToken);

  const [userInfo, setUserInfo] = useState({
    name: user.name ?? '',
    email: user.email ?? '',
    personalEmail: user.personalEmail ?? '',
    phoneNumber: user.phoneNumber ?? '',
    degree: user.degree ?? '',
    branch: user.branch ?? '',
    gender: user.gender ?? '',
    tenthPercentage: user.tenthPercentage ?? '',
    twelfthPercentage: user.twelfthPercentage ?? '',
    currentCGPA: user.currentCGPA ?? '',
    resumeLink: user.resumeLink ?? '',
  });

  // const userInfo = useSelector((state) => state.auth.user);
  // console.log(userInfo);
  
  // State to toggle between view and edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Handler to update form input values
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Handler for save/update button
  const handleSave = () => {
    // In a real-world application, you would send the updated data to a server here
    console.log(accessToken);
    const temp = updateUser(user,userInfo,accessToken,dispatch);
    console.log(temp);
    
    // console.log('Updated User Info:', userInfo);
    setIsEditing(false); // Exit edit mode after saving
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Profile Information</h2>

      {/* Profile Information Section */}
      <div className="bg-white p-4 shadow rounded-md">
        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={userInfo.name}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`mt-1 block w-full rounded-md border ${
              isEditing ? 'border-gray-300' : 'border-transparent'
            } p-2`}
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleInputChange}
            disabled={true}
            className={`mt-1 block w-full rounded-md border ${
              isEditing ? 'border-gray-300' : 'border-transparent'
            } p-2`}
          />
        </div>

        {/* Personal Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Personal Email</label>
          <input
            type="email"
            name="personalEmail"
            value={userInfo.personalEmail}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`mt-1 block w-full rounded-md border ${
              isEditing ? 'border-gray-300' : 'border-transparent'
            } p-2`}
          />
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={userInfo.phoneNumber}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`mt-1 block w-full rounded-md border ${
              isEditing ? 'border-gray-300' : 'border-transparent'
            } p-2`}
          />
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            name="gender"
            value={userInfo.gender}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`mt-1 block w-full rounded-md border ${
              isEditing ? 'border-gray-300' : 'border-transparent'
            } p-2`}
          >
            <option value="Select">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Degree */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Degree</label>
          <input
            type="text"
            name="degree"
            value={userInfo.degree}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`mt-1 block w-full rounded-md border ${
              isEditing ? 'border-gray-300' : 'border-transparent'
            } p-2`}
          />
        </div>

        {/* Branch */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Branch</label>
          <input
            type="text"
            name="branch"
            value={userInfo.branch}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`mt-1 block w-full rounded-md border ${
              isEditing ? 'border-gray-300' : 'border-transparent'
            } p-2`}
          />
        </div>

        {/* 10th Percentage */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">10th Percentage</label>
          <input
            type="text"
            name="tenthPercentage"
            value={userInfo.tenthPercentage}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`mt-1 block w-full rounded-md border ${
              isEditing ? 'border-gray-300' : 'border-transparent'
            } p-2`}
          />
        </div>

        {/* 12th Percentage */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">12th Percentage</label>
          <input
            type="text"
            name="twelfthPercentage"
            value={userInfo.twelfthPercentage}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`mt-1 block w-full rounded-md border ${
              isEditing ? 'border-gray-300' : 'border-transparent'
            } p-2`}
          />
        </div>

        {/* Current CGPA */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Current CGPA</label>
          <input
            type="text"
            name="currentCGPA"
            value={userInfo.currentCGPA}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`mt-1 block w-full rounded-md border ${
              isEditing ? 'border-gray-300' : 'border-transparent'
            } p-2`}
          />
        </div>

        {/* Resume */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Resume</label>
          {isEditing ? (
            <input
              type="url"
              name="resumeLink"
              value={userInfo.resumeLink}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 p-2"
            />
          ) : (
            <a
              href={userInfo.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View Resume
            </a>
          )}
        </div>

        {/* Edit and Save Button */}
        <div className="mt-4">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}


export default Profile
