import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

const Login = () => {
  const navigate = useNavigate();

  const [signInInfo, setsignInInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setsignInInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignIN = async (e) => {
  e.preventDefault();
  const { email, password } = signInInfo;

  if (!email || !password) {
    return handleError('email and password are required');
  }

  try {
    const url = "https://auth-app-backend-hupf.onrender.com/login";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signInInfo),
    });

    // Parse the JSON properly
    const result = await response.json();
    console.log(result); // 👈 This will now show same JSON as Postman

    if (!response.ok) {
      // Handle backend validation or bad requests
      const errorMessage = result?.error?.details?.[0]?.message || result?.message || 'Signin failed';
      return handleError(errorMessage);
    }

    // If success
    const { success, message, jwtToken ,name} = result;
    if (success) {
      handleSuccess(message);
      localStorage.setItem('token', jwtToken);
      localStorage.setItem('loggedInUser', name);
      setTimeout(() => {
        navigate('/home');
      }, 1000);
    }

    else if (!success) {
      handleSuccess(message);
    }

  } catch (err) {
    handleError(err.message || 'Something went wrong');
  }
};


  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] border border-gray-200 w-96">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 text-center">
          Sign In
        </h1>

        <form onSubmit={handleSignIN}>

          <div className="flex flex-col mb-5">
            <label className="font-medium text-gray-800 mb-1">Email</label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              value={signInInfo.email}
              placeholder="Enter your email..."
              className="border-b border-gray-400 focus:outline-none p-2 placeholder-gray-400"
            />
          </div>

          <div className="flex flex-col mb-5">
            <label className="font-medium text-gray-800 mb-1">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              value={signInInfo.password}
              placeholder="Enter your password..."
              className="border-b border-gray-400 focus:outline-none p-2 placeholder-gray-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-800 text-white py-2 rounded-md hover:bg-purple-900 transition-all"
          >
            Sign In
          </button>

          <p className="text-center mt-4 text-gray-700">
            don't have an account?{" "}
            <Link
              to="/signup"
              className="text-purple-800 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
