// src/api/authAPI.js
import axios from './axiosConfig';
import { login as authLogin } from '../store/authSlice';
import { logout as authLogout } from '../store/authSlice';
import { updateUser as authUpdateUser } from '../store/authSlice';
import { promoteToCoordinator as studentToCoordinator } from '../store/userSlice';
import { demoteToUser as coordinatorToStudent } from '../store/userSlice';
import { banUser as banUserId} from '../store/userSlice';
import { unbanUser as unBanUserId} from '../store/userSlice';
import { initialiseUsers } from '../store/userSlice';

// User login
const login = async (email, password, dispatch) => {
  try {
    const response = await axios.post('http://localhost:8000/api/v1/users/login', {
      email,
      password,
    });
    console.log(response);

    // Dispatch login action with the returned user and tokens
    dispatch(
      authLogin({
        user: response.data.user,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      })
    );

    return response.data; // Return data if login is successful
  } catch (error) {
    console.error("Login error:", error.message);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

// User logout
const logout = async (dispatch, userId) => {
  console.log(userId);
  console.log("In logout");

  if (!userId) {
    console.error('User ID not found. Cannot logout.');
    return; // Exit if user ID is not found
  }

  try {
    // Call backend logout API
    await axios.post('http://localhost:8000/api/v1/users/logout', {
      user: {
        _id: userId,
      }
    }, { withCredentials: true });

    // Dispatch Redux logout action
    dispatch(authLogout());

    return true; // Indicate logout was successful
  } catch (error) {
    console.error('Error logging out:', error);
    throw new Error(error.response?.data?.message || 'Logout failed');
  }
};

// User registration
const register = async (name,email,password,rollNo,dispatch) => {
  console.log(name,email,password,rollNo);
  try {
    const response = await axios.post('http://localhost:8000/api/v1/users/register', {
      name,
      email,
      password,
      rollNo,
    });
    dispatch(
      authLogin({
        user: response.data.user,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      })
    );
  } catch (error) {
    console.error("Registration error:", error);
  }
};

const updateUser = async (user, file, newUserData, accessToken, dispatch) => {
  try {
    // console.log(file);
    let resumeLink = user.resumeLink;

    // Handle file upload if a new file is provided
    if (file) {
      const formData = new FormData();
      formData.append("resume", file);
      console.log(file);
      
      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
      
      const uploadResponse = await axios.post(
        "http://localhost:8000/api/v1/users/upload-resume",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (uploadResponse.data.success) {
        resumeLink = uploadResponse.data.url; // Get the uploaded file's URL
      } else {
        throw new Error("Failed to upload resume. Please try again.");
      }
    }

    // Prepare updated user data
    const updatedUserData = { ...newUserData, resumeLink };

    // Update user profile
    console.log(updatedUserData);
    
    const updateResponse = await axios.post(
      "http://localhost:8000/api/v1/users/update",
      updatedUserData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // Dispatch updated user data to Redux store
    dispatch(
      authUpdateUser({
        user: updateResponse,
      })
    );

    // Return the updated user data
    return updateResponse.data;
  } catch (error) {
    console.error("Update user error:", error);

    // Throw detailed error message if available
    throw new Error(
      error.response?.data?.message || "Failed to update user. Please try again."
    );
  }
};


const promoteToCoordinator = async (userId,accessToken, dispatch) => {
  try {
    const response = await axios.post("http://localhost:8000/api/v1/users/promote", { "_id": userId }, {
      // headers: {
      //   Authorization: `Bearer ${accessToken}`
      // }
      withCredentials:true,
    });
    console.log(response);
    dispatch(studentToCoordinator({ _id: userId }));
    return response;
  } catch (error) {
    console.error("Error promoting user:", error);
    throw new Error(error || "Failed to promote user");
  }
}

const demoteToUser = async (userId,accessToken, dispatch) => {
  try {
    const response = await axios.post("http://localhost:8000/api/v1/users/demote", { "_id": userId }, {
      // headers: {
      //   Authorization: `Bearer ${accessToken}`
      // }
      withCredentials:true,
    });
    console.log(response);
    dispatch(coordinatorToStudent({ _id: userId }));
    return response;
  } catch (error) {
    console.error("Error demoting user:", error);
    throw new Error(error || "Failed to demote user");
  }
}

const banUser = async (userId,accessToken,dispatch) => {
  try {
    const response = await axios.post("http://localhost:8000/api/v1/users/ban", { "_id": userId }, {
      // headers: {
      //   Authorization: `Bearer ${accessToken}`
      // }
      withCredentials:true,
    });
    console.log(response);
    dispatch(banUserId({_id:userId}));
    return response;
  } catch (error) {
    console.error("Error banning user:", error);
    throw new Error(error || "Failed to ban user");
  }
}

const unBanUser = async (userId,accessToken,dispatch) => {
  try {
    const response = await axios.post("http://localhost:8000/api/v1/users/unban", { "_id": userId }, {
      // headers: {
      //   Authorization: `Bearer ${accessToken}`
      // }
      withCredentials:true,
    });
    console.log(response);
    dispatch(unBanUserId({_id:userId}));
    return response;
  } catch (error) {
    console.error("Error banning user:", error);
    throw new Error(error || "Failed to ban user");
  }
}

// Fetch the current authenticated user
const fetchCurrentUser = async () => {
  try {
    const response = await axios.get('/users/me');
    return response.data; // Return user data if fetch is successful
  } catch (error) {
    console.error("Fetch current user error:", error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch user');
  }
};

const fetchAllUsers = async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:8000/api/v1/users/all-users');
    dispatch(initialiseUsers(response.data.users));
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Fetch users error:", error);
    throw new Error(error || 'Failed to fetch users');
  }
}

// Update user profile

// Refresh access token
const refreshToken = async () => {
  try {
    const response = await axios.post('/users/refresh-token');
    return response.data; // Return new token data if successful
  } catch (error) {
    console.error("Refresh token error:", error.message);
    throw new Error(error.response?.data?.message || 'Token refresh failed');
  }
};

export { register, login, logout, updateUser, fetchCurrentUser ,fetchAllUsers, promoteToCoordinator, demoteToUser ,banUser ,unBanUser};
