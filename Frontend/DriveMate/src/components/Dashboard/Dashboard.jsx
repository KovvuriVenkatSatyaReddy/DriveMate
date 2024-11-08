// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux'; // Add dispatch for updating drives
// import DriveCard from './DriveCard';
// import AddDriveModal from './AddDriveModal'; // Import the modal
// import { addDrive } from '../../store/driveSlice';

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch(); // Add dispatch for updating drives
//   const currentUser = useSelector((state) => state.auth.user);
//   const availableDrives = useSelector((state) => state.drives.availableDrives);
//   const completedDrives = useSelector((state) => state.drives.completedDrives);
//   console.log(currentUser);
  
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleDriveClick = (drive, action) => {
//     const driveName = drive.role.replace(/\s+/g, '-').toLowerCase();
//     navigate(`/drive/${driveName}`, { state: { drive, action } });
//   };

//   const handleAddDrive = (newDrive) => {
//     // You can dispatch an action to add the new drive to the Redux store
//     dispatch(addDrive(newDrive));
//     // Optionally, you can also update the availableDrives in the local state
//   };

//   const canAddDrives = currentUser.role === 'admin' || currentUser.role === 'coordinator';

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <section>
//         <h2 className="text-2xl font-bold mb-4">Available Drives</h2>
//         {canAddDrives && (
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
//             onClick={() => setIsModalOpen(true)} // Open the modal
//           >
//             Add New Drive
//           </button>
//         )}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {availableDrives.map((drive) => (
//             <DriveCard
//               key={drive.id}
//               companyName={drive.companyName}
//               role={drive.role}
//               location={drive.location}
//               ctc={drive.ctc}
//               description={drive.description}
//               deadline={drive.deadline}
//               actionText="Apply"
//               onClick={() => handleDriveClick(drive, 'apply')}
//             />
//           ))}
//         </div>
//       </section>

//       <section className="mt-10">
//         <h2 className="text-2xl font-bold mb-4">Ongoing Drives</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {completedDrives.map((drive) => (
//             <DriveCard
//               key={drive.id}
//               companyName={drive.companyName}
//               role={drive.role}
//               location={drive.location}
//               ctc={drive.ctc}
//               description={drive.description}
//               deadline={drive.deadline}
//               actionText="View Details"
//               onClick={() => handleDriveClick(drive, 'view')}
//             />
//           ))}
//         </div>
//       </section>

//       <section className="mt-10">
//         <h2 className="text-2xl font-bold mb-4">Completed Drives</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {completedDrives.map((drive) => (
//             <DriveCard
//               key={drive.id}
//               companyName={drive.companyName}
//               role={drive.role}
//               location={drive.location}
//               ctc={drive.ctc}
//               description={drive.description}
//               deadline={drive.deadline}
//               actionText="View Details"
//               onClick={() => handleDriveClick(drive, 'view')}
//             />
//           ))}
//         </div>
//       </section>

//       <AddDriveModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onAddDrive={handleAddDrive}
//       />
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // Add dispatch for updating drives
import DriveCard from './DriveCard';
import AddDriveModal from './AddDriveModal';
import { addDrive, fetchAllDrives } from '../../api/driveAPI.js';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Add dispatch for updating drives
  const currentUser = useSelector((state) => state.auth.user);
  const availableDrives = useSelector((state) => state.drives.availableDrives);
  const completedDrives = useSelector((state) => state.drives.completedDrives);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(()=>{
    fetchAllDrives(dispatch);
  },[]) 

  const handleDriveClick = (drive, action) => {
    const driveName = drive.role.replace(/\s+/g, '-').toLowerCase();
    navigate(`/drive/${driveName}`, { state: { drive, action } });
  };

  const handleAddDrive = (newDrive) => {
    // You can dispatch an action to add the new drive to the Redux store
    addDrive(newDrive,dispatch);
  };

  const canAddDrives = currentUser.role === 'admin' || currentUser.role === 'coordinator';

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <section>
        {canAddDrives && (
          <button
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          onClick={() => setIsModalOpen(true)} // Open the modal
          >
            Add New Drive
          </button>
        )}           
        <h2 className="text-2xl font-bold mb-4">Available Drives</h2>
        <div key={"available"} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableDrives.length === 0 ? ( // Check if there are no available drives
            <div key={availableDrives._id} className="col-span-1 md:col-span-2 flex flex-col items-center justify-center py-10 border rounded-lg bg-white shadow-md">
              <p className="text-red-500 text-xl font-semibold">No Available Drives</p>
              <p className="text-gray-600 mt-2">Please check back later or contact an admin.</p>
            </div>
          ) : (
            availableDrives.map((drive) => (
              <DriveCard
                key={drive.id}
                companyName={drive.companyName}
                role={drive.role}
                location={drive.location}
                ctc={drive.ctc}
                description={drive.description}
                deadline={drive.deadline}
                minCGPA={drive.minCGPA}
                actionText="Apply"
                onClick={() => handleDriveClick(drive, 'apply')}
              />
            ))
          )}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Ongoing Drives</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {completedDrives.length === 0 ? ( // Check if there are no ongoing drives
            <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center py-10 border rounded-lg bg-white shadow-md">
            <p className="text-red-500 text-xl font-semibold">No Ongoing Drives</p>
            <p className="text-gray-600 mt-2">Please check back later or contact an admin.</p>
          </div>
          ) : (
            completedDrives.map((drive) => (
              <DriveCard
                key={drive.id}
                companyName={drive.companyName}
                role={drive.role}
                location={drive.location}
                ctc={drive.ctc}
                description={drive.description}
                deadline={drive.deadline}
                minCGPA={drive.minCGPA}
                actionText="View Details"
                onClick={() => handleDriveClick(drive, 'view')}
              />
            ))
          )}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Completed Drives</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {completedDrives.length === 0 ? ( // Check if there are no completed drives
            <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center py-10 border rounded-lg bg-white shadow-md">
              <p className="text-red-500 text-xl font-semibold">No Completed Drives</p>
              <p className="text-gray-600 mt-2">Please check back later or contact an admin.</p>
            </div>
          ) : (
            completedDrives.map((drive) => (
              <DriveCard
                key={drive.id}
                companyName={drive.companyName}
                role={drive.role}
                location={drive.location}
                ctc={drive.ctc}
                description={drive.description}
                deadline={drive.deadline}
                minCGPA={drive.minCGPA}
                actionText="View Details"
                onClick={() => handleDriveClick(drive, 'view')}
              />
            ))
          )}
        </div>
      </section>

      <AddDriveModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddDrive={handleAddDrive}
      />
    </div>
  );
};

export default Dashboard;
