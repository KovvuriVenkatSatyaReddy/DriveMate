import React from 'react';

function DriveCard({ 
  companyName,
  role,
  description, 
  location, 
  ctc, 
  minCGPA, 
  deadline, 
  infoText, 
  actionText, 
  onClick 
}) {
  return (
    <div className="bg-white p-4 shadow rounded-md">
      <h2 className="text-2xl font-bold mb-2">{companyName}</h2> {/* Company name in larger text */}
      <h2 className="text-xl font-bold mb-2">{role}</h2> {/* Company name in larger text */}
      <h3 className="text-xl font-semibold overflow-hidden line-clamp-3">{description}</h3>
      <p className="text-gray-500"><strong>Location:</strong> {location}</p>
      <p className="text-gray-500"><strong>CTC:</strong> {ctc}</p>
      <p className="text-gray-500"><strong>Minimum CGPA:</strong> {minCGPA}</p>
      <p className="text-gray-500"><strong>Deadline:</strong> {deadline}</p>
      <p className="text-gray-500">{infoText}</p>
      <button
        onClick={onClick}
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {actionText}
      </button>
    </div>
  );
}

export default DriveCard;

