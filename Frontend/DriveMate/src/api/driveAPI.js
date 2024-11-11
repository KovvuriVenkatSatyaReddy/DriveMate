import axios from './axiosConfig';
import { addDrive as addNewDrive, initialiseDrives } from '../store/driveSlice';
const addDrive = async (drive,dispatch) => {
    try {
        const response = await axios.post('http://localhost:8000/api/v1/drives/add-drive',{drive},{withCredentials:true,});
        console.log(response);
        dispatch(addNewDrive({newDrive:response.data.newDrive}));
        return response.data;
    } catch (error) {
        console.error("There was an error when adding drive", error);
        throw new Error(error.response?.data?.message || 'Adding drive failed');
    }
} 

const fetchAllDrives = async (dispatch) => {
    try {
        const response = await axios.get('http://localhost:8000/api/v1/drives/drives',);
        // console.log(resp....onse);
        dispatch(initialiseDrives(response.data));
        return response.data;
    } catch (error) {
        console.error("There was an error when adding drives", error);
        throw new Error(error.response?.data?.message || 'Adding drives failed');
    }
}

const applyToDrive = async (dispatch, driveId) => {
    try {

        const response = await axios.post(`http://localhost:8000/api/v1/drives/${driveId}/apply`, {}, {
            withCredentials: true,
        });
        console.log(response);
        // dispatch(updateAppliedDrives(response.data)); // Dispatch an action to update applied drives if needed
        return response.data;
    } catch (error) {
        console.error("There was an error applying to the drive", error);
        throw new Error(error.response?.data?.message || 'Applying to the drive failed');
    }
}

export {addDrive, fetchAllDrives, applyToDrive}