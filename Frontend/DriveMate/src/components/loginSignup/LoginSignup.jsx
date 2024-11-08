// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { login as authLogin } from '../../store/authSlice';
// import axios from 'axios';
// import { login, register } from '../../api/authApi';

// const LoginSignup = () => {
//   const dispatch = useDispatch();
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({ email: '', password: '', name: '' ,rollNo: ''});
//   const navigate = useNavigate();

//   const toggleForm = () => {
//     setIsLogin(!isLogin);
//     setFormData({ email: '', password: '', name: '' });
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) =>  {
//     const email = formData.email;
//     const password = formData.password;
//     const name = formData.name;
//     const rollNo = 122;
//     e.preventDefault();
//     try {
//       if(isLogin){
//         login(email,password,dispatch);
//       }
//       else{
//         register(name,email,password,rollNo,dispatch);
//       }
//       navigate('/dashboard');
//     } catch (error) {
      
//     }
//     // const userData = {
//     //   email: formData.email ?? '',
//     //   password: formData.password,
//     //   name: formData.name || '',
//     //   role: 'admin',
//     // };

//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">{isLogin ? 'Login' : 'Signup'}</h2>
//         <form onSubmit={handleSubmit}>
//           {!isLogin && (
//             <>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">Roll No</label>
//               <input
//                 type="text"
//                 name="Roll No"
//                 value={formData.rollNo}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
//                 required
//               />
//             </div>
//             </>
//           )}
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
//           >
//             {isLogin ? 'Login' : 'Signup'}
//           </button>
//         </form>
//         <div className="mt-4 text-center">
//           <p>
//             {isLogin ? "Don't have an account?" : 'Already have an account?'}
//             <button onClick={toggleForm} className="text-blue-500 ml-1 hover:underline">
//               {isLogin ? 'Signup' : 'Login'}
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginSignup;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login as authLogin } from '../../store/authSlice';
import axios from 'axios';
import { login, register } from '../../api/authApi';

const LoginSignup = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', name: '', rollNo: '' });
  const navigate = useNavigate();
  const [error, setError] = useState("")

  // Check if cookies are available to auto-login the user
  useEffect(() => {
    const autoLogin = async () => {
      try {
        // Attempt to fetch user info using accessToken cookie
        const response = await axios.get('http://localhost:8000/api/v1/users/user-info', { withCredentials: true });
        const user = response.data;
        console.log(user);        
        setError("")
        dispatch(authLogin(user)); // Set user in Redux store
        navigate('/dashboard'); // Redirect to dashboard
      } catch (error) {
        if (error.response?.status === 401) {
          // If access token expired, attempt to refresh
          try {
            const refreshResponse = await axios.post('http://localhost:8000/api/v1/users/refresh', {}, { withCredentials: true });
            const newUser = refreshResponse.data;
            if(newUser){
              setError("")
              dispatch(authLogin({user:newUser}));
              navigate('/dashboard');
            }
          } catch (refreshError) {
            console.error('Auto-login failed:', refreshError);
            // setError("An unexpected error occurred during auto-login.");
          }
        }
      }
    };
    autoLogin();
  }, [dispatch, navigate]);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ email: '', password: '', name: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, name, rollNo } = formData;
    try {
      if (isLogin) {
        await login(email, password, dispatch); // Login function
      } else {
        await register(name, email, password, rollNo, dispatch); // Register function
      }
      navigate('/dashboard');
    } catch (error) {
      console.error('Login/Signup failed:', error);
      setError('Login or registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">{isLogin ? 'Login' : 'Signup'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Roll No</label>
                <input
                  type="text"
                  name="rollNo"
                  value={formData.rollNo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            </>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            {isLogin ? 'Login' : 'Signup'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button onClick={toggleForm} className="text-blue-500 ml-1 hover:underline">
              {isLogin ? 'Signup' : 'Login'}
            </button>
          </p>
        </div>
      {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default LoginSignup;
