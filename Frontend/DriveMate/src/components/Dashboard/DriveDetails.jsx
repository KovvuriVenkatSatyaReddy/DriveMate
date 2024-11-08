// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { applyToDrive } from '../../api/driveAPI';

// const DriveDetails = () => {
//   const dispatch = useDispatch();
//   const { driveName } = useParams();
//   const availableDrives = useSelector((state) => state.drives.availableDrives);
//   const completedDrives = useSelector((state) => state.drives.completedDrives);

//   const drive = availableDrives.find((d) => d.role.toLowerCase().replace(/\s+/g, '-') === driveName) ||
//                 completedDrives.find((d) => d.role.toLowerCase().replace(/\s+/g, '-') === driveName);

//   const action = drive ? (drive.status === 'available' ? 'apply' : 'view') : null;

//   if (!drive) {
//     return <p className="text-center text-red-500 text-xl font-semibold">Drive details not found!</p>;
//   }

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
//       <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-8 mb-6">
//         <h1 className="text-3xl font-bold mb-2 text-gray-800">{drive.companyName}</h1>
//         <h2 className="text-xl font-semibold text-gray-700 mb-4">{drive.role}</h2>
//         <p className="text-gray-600 mb-4">{drive.description}</p>

//         <div className="border-t border-gray-200 pt-4">
//           <h3 className="text-2xl font-semibold text-gray-800 mb-4">Job Details</h3>
//           <ul className="space-y-3">
//             <li><strong>Location:</strong> <span className="text-gray-600">{drive.location}</span></li>
//             <li><strong>CTC:</strong> <span className="text-gray-600">{drive.ctc} LPA</span></li>
//             <li><strong>Minimum CGPA:</strong> <span className="text-gray-600">{drive.minCGPA}</span></li>
//             <li><strong>Gender Criteria:</strong> <span className="text-gray-600">{drive.gender}</span></li>
//             <li><strong>Eligible Branches:</strong> <span className="text-gray-600">{drive.eligibleBranches.join(', ')}</span></li>
//             <li><strong>Selection Process:</strong> <span className="text-gray-600">{drive.selectionProcess}</span></li>
//             <li><strong>Deadline:</strong> <span className="text-gray-600">{new Date(drive.deadline).toLocaleDateString()}</span></li>
//             <li><strong>Status:</strong> <span className={`text-${drive.status === 'available' ? 'green' : 'gray'}-500 capitalize`}>{drive.status}</span></li>
//           </ul>
//         </div>

//         <div className="border-t border-gray-200 pt-4 mt-4">
//           <h3 className="text-2xl font-semibold text-gray-800 mb-4">Instructions</h3>
//           <p className="text-gray-600">{drive.instructions || 'No specific instructions provided.'}</p>
//         </div>

//         <div className="border-t border-gray-200 pt-4 mt-4">
//           <h3 className="text-2xl font-semibold text-gray-800 mb-4">Recent Updates</h3>
//           <ul className="space-y-3">
//             {drive.updates.length > 0 ? (
//               drive.updates.map((update, index) => (
//                 <li key={index} className="text-gray-600">
//                   <span className="block font-semibold">{new Date(update.timestamp).toLocaleDateString()}:</span>
//                   <p>{update.content}</p>
//                 </li>
//               ))
//             ) : (
//               <p className="text-gray-600">No updates available.</p>
//             )}
//           </ul>
//         </div>

//         <div className="border-t border-gray-200 pt-4 mt-4">
//           <h3 className="text-2xl font-semibold text-gray-800 mb-4">Applicants</h3>
//           <ul className="space-y-3">
//             {drive.appliedUsers.length > 0 ? (
//               drive.appliedUsers.map((user, index) => (
//                 <li key={index} className="text-gray-600">
//                   <span className="font-semibold">User ID:</span> {user.userId} - <span className="font-semibold">Status:</span> {user.status}
//                 </li>
//               ))
//             ) : (
//               <p className="text-gray-600">No applicants yet.</p>
//             )}
//           </ul>
//         </div>
//       </div>

//       {action === 'apply' && (
//         <button
//           className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg"
//           onClick={() => applyToDrive(dispatch, drive._id)}
//         >
//           Apply Now
//         </button>
//       )}

//       {action === 'view' && (
//         <button
//           className="bg-bloue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg"
          
//         >
//           View Details
//         </button>
//       )}
//     </div>
//   );
// };

// export default DriveDetails;
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { applyToDrive } from '../../api/driveAPI';

const DriveDetails = () => {
  const dispatch = useDispatch();
  const { driveName } = useParams();

  // Access state for drives and user information
  const availableDrives = useSelector((state) => state.drives.availableDrives);
  const completedDrives = useSelector((state) => state.drives.completedDrives);
  const user = useSelector((state) => state.auth.user); // Assume user data is available in state.user
  
  const drive = availableDrives.find((d) => d.role.toLowerCase().replace(/\s+/g, '-') === driveName) ||
                completedDrives.find((d) => d.role.toLowerCase().replace(/\s+/g, '-') === driveName);

  const action = drive ? (drive.status === 'available' ? 'apply' : 'view') : null;

  // Check if the user has already applied to this drive by checking user.appliedDrives
  const hasApplied = user.appliedDrives && user.appliedDrives.some((appliedDrive) => appliedDrive.driveId === drive._id);

  console.log(user.appliedDrives);
  
  if (!drive) {
    return <p className="text-center text-red-500 text-xl font-semibold">Drive details not found!</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-8 mb-6">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">{drive.companyName}</h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">{drive.role}</h2>
        <p className="text-gray-600 mb-4">{drive.description}</p>

        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Job Details</h3>
          <ul className="space-y-3">
            <li><strong>Location:</strong> <span className="text-gray-600">{drive.location}</span></li>
            <li><strong>CTC:</strong> <span className="text-gray-600">{drive.ctc} LPA</span></li>
            <li><strong>Minimum CGPA:</strong> <span className="text-gray-600">{drive.minCGPA}</span></li>
            <li><strong>Gender Criteria:</strong> <span className="text-gray-600">{drive.gender}</span></li>
            <li><strong>Eligible Branches:</strong> <span className="text-gray-600">{drive.eligibleBranches.join(', ')}</span></li>
            <li><strong>Selection Process:</strong> <span className="text-gray-600">{drive.selectionProcess}</span></li>
            <li><strong>Deadline:</strong> <span className="text-gray-600">{new Date(drive.deadline).toLocaleDateString()}</span></li>
            <li><strong>Status:</strong> <span className={`text-${drive.status === 'available' ? 'green' : 'gray'}-500 capitalize`}>{drive.status}</span></li>
          </ul>
        </div>

        <div className="border-t border-gray-200 pt-4 mt-4">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Instructions</h3>
          <p className="text-gray-600">{drive.instructions || 'No specific instructions provided.'}</p>
        </div>

        {/* Applicants Section - Only for Admin and Coordinator */}
        {(user.role === 'admin' || user.role === 'coordinator') && (
          <div className="border-t border-gray-200 pt-4 mt-4">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Applicants</h3>
            <ul className="space-y-3">
              {drive.appliedUsers.length > 0 ? (
                drive.appliedUsers.map((applicant, index) => (
                  <li key={index} className="text-gray-600">
                    <span className="font-semibold">User ID:</span> {applicant.userId} - <span className="font-semibold">Status:</span> {applicant.status}
                  </li>
                ))
              ) : (
                <p className="text-gray-600">No applicants yet.</p>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Conditional "Apply Now" button for Student with Applied Status Check */}
      {action === 'apply' && user.role === 'student' && (
        <button
          className={`font-semibold py-2 px-6 rounded-lg shadow-lg ${hasApplied ? 'bg-gray-500' : 'bg-green-500 hover:bg-green-600'} text-white`}
          onClick={() => !hasApplied && applyToDrive(dispatch, drive._id)}
          disabled={hasApplied}
        >
          {hasApplied ? 'Already Applied' : 'Apply Now'}
        </button>
      )}

      {action === 'view' && (
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg"
        >
          View Details
        </button>
      )}
    </div>
  );
};

export default DriveDetails;
