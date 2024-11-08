import React, { useEffect, useState } from 'react';

const AddDriveModal = ({ isOpen, onClose, onAddDrive }) => {
  const [driveData, setDriveData] = useState({
    companyName: '',
    role: '',
    description: '',
    location: '',
    ctc: '',
    minCGPA: '',
    gender: '',
    eligibleBranches: [],
    selectionProcess: '',
    deadline: '',
    instructions: '',
    status: 'available',
    appliedUsers: [],
    updates: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'eligibleBranches') {
      setDriveData((prevData) => ({
        ...prevData,
        eligibleBranches: Array.isArray(value) ? value : [value],
      }));
    } else {
      setDriveData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddDrive(driveData);
    // setDriveData({
    //   companyName: '',
    //   role: '',
    //   description: '',
    //   location: '',
    //   ctc: '',
    //   minCGPA: '',
    //   gender: '',
    //   eligibleBranches: [],
    //   selectionProcess: '',
    //   deadline: '',
    //   instructions: '',
    //   status: 'accepting',
    //   appliedUsers: [],
    //   updates: [],
    // });
    onClose(); // Close the modal after submission
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Add New Drive</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={driveData.companyName}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Role</label>
            <input
              type="text"
              name="role"
              value={driveData.role}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={driveData.description}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Job Location</label>
            <input
              type="text"
              name="location"
              value={driveData.location}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">CTC</label>
            <input
              type="text"
              name="ctc"
              value={driveData.ctc}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Minimum CGPA</label>
            <input
              type="number"
              name="minCGPA"
              value={driveData.minCGPA || ''}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
              placeholder="Enter minimum CGPA"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Gender</label>
            <select
              name="gender"
              value={driveData.gender || ''}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
              required
            >
              <option value="">Select gender</option>
              <option value="All">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Eligible Branches</label>
            <div className="border rounded w-full py-2 px-3">
              {["CS", "IT", "ECE", "EE", "ME", "CE", "PIE"].map((branch) => (
                <div key={branch} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={branch}
                    name="eligibilityBranches"
                    value={branch}
                    checked={driveData.eligibleBranches.includes(branch)}
                    onChange={(e) => {
                      const selectedBranches = driveData.eligibleBranches.includes(branch)
                        ? driveData.eligibleBranches.filter((b) => b !== branch)
                        : [...driveData.eligibleBranches, branch];
                      setDriveData({ ...driveData, eligibleBranches: selectedBranches });
                    }}
                    className="mr-2"
                  />
                  <label htmlFor={branch} className="text-gray-700">{branch}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Selection Process</label>
            <input
              type="text"
              name="selectionProcess"
              value={driveData.selectionProcess}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Instructions</label>
            <textarea
              name="instructions"
              value={driveData.instructions}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
              placeholder="Enter any special instructions"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Deadline</label>
            <input
              type="date"
              name="deadline"
              value={driveData.deadline}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="flex justify-end">
            <button type="button" className="bg-gray-300 px-4 py-2 rounded mr-2" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Add Drive
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDriveModal;
