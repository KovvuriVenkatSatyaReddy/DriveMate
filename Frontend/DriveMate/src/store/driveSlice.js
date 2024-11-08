// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     availableDrives: [
//         {
//             id: 1,
//             companyName: 'Google',
//             role: 'Software Engineer Intern',
//             description: "Apply for a summer internship at Google and gain hands-on experience.",
//             location: 'California, USA',
//             ctc: 45,
//             eligibilityCriteria: "Minimum 8.0 CGPA",
//             eligibilityBranches: ['Computer Engineering', 'IT'],
//             deadline: '2024-11-15',
//             status: 'active',
//             appliedUsers: [1, 3, 4], // Refers to user IDs who have applied
//         },
//         {
//             id: 3,
//             companyName: 'Amazon',
//             role: 'Operations Analyst',
//             description: "Apply for a summer internship at Amazon and gain hands-on experience.",
//             location: 'Bangalore, India',
//             ctc: 45,
//             eligibilityCriteria: "Minimum 8.0 CGPA",
//             eligibilityBranches: ['Computer Engineering', 'IT'],
//             deadline: '2024-12-20',
//             status: 'active',
//             appliedUsers: [3, 6],
//         },
//     ],
//     completedDrives: [
//         {
//             id: 2,
//             companyName: 'Microsoft',
//             role: 'Cloud Engineer Intern',
//             description: "Apply for a summer internship at Microsoft and gain hands-on experience.",
//             location: 'Redmond, USA',
//             ctc: 45,
//             eligibilityCriteria: "Minimum 8.0 CGPA",
//             minGPA: 7.0,
//             requiredSkills: ['Cloud Computing', 'Azure', 'Networking'],
//             eligibilityBranches: ['Computer Engineering', 'IT'],
//             date: '2024-12-01',
//             status: 'completed',
//             appliedUsers: [2, 5],
//         },
//     ],
// };

// const driveSlice = createSlice({
//   name: 'drives',
//   initialState,
//   reducers: {
//     addDrive: (state, action) => {
//       state.availableDrives.push(action.payload);
//     },
//     updateDriveStatus: (state, action) => {
//       const { driveId, newStatus } = action.payload;
//       let driveIndex = state.availableDrives.findIndex(drive => drive.id === driveId);
//       if (driveIndex !== -1 && newStatus === 'completed') {
//         const completedDrive = state.availableDrives.splice(driveIndex, 1)[0];
//         completedDrive.status = newStatus;
//         state.completedDrives.push(completedDrive);
//       }
//     },
//     addUserToDrive: (state, action) => {
//       const { driveId, userId } = action.payload;
//       const drive = state.availableDrives.find(drive => drive.id === driveId);
//       if (drive && !drive.appliedUsers.includes(userId)) {
//         drive.appliedUsers.push(userId);
//       }
//     },
//     removeUserFromDrive: (state, action) => {
//       const { driveId, userId } = action.payload;
//       const drive = state.availableDrives.find(drive => drive.id === driveId);
//       if (drive) {
//         drive.appliedUsers = drive.appliedUsers.filter(id => id !== userId);
//       }
//     },
//   },
// });

// export const { addDrive, updateDriveStatus, addUserToDrive, removeUserFromDrive } = driveSlice.actions;

// export default driveSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  availableDrives: [
  ],
  ongoingDrives: [
  ],
  completedDrives: [
  ],
};

const driveSlice = createSlice({
  name: 'drives',
  initialState,
  reducers: {
    initialiseDrives: (state,action) => {
      state.availableDrives = action.payload.availableDrives;
      state.ongoingDrives = action.payload.ongoingDrives;
      state.completedDrives = action.payload.completedDrives;
    },
    addDrive: (state, action) => {
      console.log(action.payload);
      
      // const newDrive = action.payload;
      // console.log(newDrive);
      
      const {status} = action.payload;
      if (status === 'available') {
        state.availableDrives.push(action.payload);
      } else if (status === 'ongoing') {
        state.ongoingDrives.push(action.payload);
      } else if (status === 'completed') {
        state.completedDrives.push(action.payload);
      }
    },
    updateDriveStatus: (state, action) => {
      const { driveId, newStatus } = action.payload;

      // Helper function to move drive between lists
      const moveDrive = (sourceList, destinationList, driveId, newStatus) => {
        const driveIndex = sourceList.findIndex(drive => drive.id === driveId);
        if (driveIndex !== -1) {
          const [drive] = sourceList.splice(driveIndex, 1);
          drive.status = newStatus;
          destinationList.push(drive);
        }
      };

      // Move the drive based on its current status
      if (newStatus === 'ongoing') {
        moveDrive(state.availableDrives, state.ongoingDrives, driveId, newStatus);
      } else if (newStatus === 'completed') {
        moveDrive(state.ongoingDrives, state.completedDrives, driveId, newStatus);
      }
    },
    addUserToDrive: (state, action) => {
      const { driveId, userId } = action.payload;
      const drive = [...state.availableDrives, ...state.ongoingDrives].find(drive => drive.id === driveId);
      if (drive && !drive.appliedUsers.includes(userId)) {
        drive.appliedUsers.push(userId);
      }
    },
    removeUserFromDrive: (state, action) => {
      const { driveId, userId } = action.payload;
      const drive = [...state.availableDrives, ...state.ongoingDrives, ...state.completedDrives].find(drive => drive.id === driveId);
      if (drive) {
        drive.appliedUsers = drive.appliedUsers.filter(id => id !== userId);
      }
    },
  },
});

export const { initialiseDrives,addDrive, updateDriveStatus, addUserToDrive, removeUserFromDrive } = driveSlice.actions;

export default driveSlice.reducer;
