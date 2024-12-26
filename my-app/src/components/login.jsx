import React, { useState } from "react";
import { Link, redirect } from "react-router-dom";
import axios from "axios";

const Login = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill in all required fields (Email, Password).");
      return;
    }

    try {
      console.log(formData);
      const response = await axios.post("http://localhost:5000/api/user/login", formData,{
        withCredentials: true, // Include cookies and credentials
      });
      console.log(response);
      // alert("User logged in successfully"); // Notify user of success
      setFormData({
        email: "",
        password: "",
      });
      setError("");
      redirect: window.location.replace("http://localhost:3000/mycontacts");
    }
    catch (err) {
      setError(err.response.data.message);
      console.error(err);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }


  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-4 flex flex-col items-center bg-[#2d2a2a] shadow-2xl w-full h-full">
        <form className="flex flex-col items-center gap-4 p-4 bg-[#171717] rounded-2xl w-full">
          <div>
            {error && (
              <div className="bg-red-500 text-white p-4 rounded-lg text-center mt-4">
                {error}
              </div>
            )}
          </div>
          <p className="text-center text-[#64ffda] text-4xl">Login</p>

          <div className="flex items-center justify-center gap-2 p-4 bg-[#1b1b1b] rounded-xl shadow-inner w-full max-w-md">
            <i className="fas fa-user text-[#64ffda]"></i>
            <input
              required
              placeholder="Email"
              className="bg-transparent border-none outline-none w-full text-[#ccd6f6] pl-4"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-center gap-2 p-4 bg-[#1b1b1b] rounded-xl shadow-inner w-full max-w-md">
            <i className="fas fa-lock text-[#64ffda]"></i>
            <input
              required
              placeholder="Password"
              className="bg-transparent border-none outline-none w-full text-[#ccd6f6] pl-4"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-evenly w-full max-w-md">
            <button 
              onClick={handleSubmit}
              type="submit"
             className="cursor-pointer py-3 px-6 rounded-xl border border-[#64ffda] text-[#64ffda] font-bold transition-all duration-300 hover:bg-[#64ffda] hover:text-black hover:shadow-inner">
              Login
            </button>
            <div className="flex flex-col">
              <p className="text-white">Don't have an account?</p>
              <Link to="/register" className="text-[#64ffda] hover:text-neutral-200">
                Register
              </Link>
            </div>
          </div>
            <Link to="/" className="text-zinc-500">Forgot Password</Link>
        </form>
        <Link to="/" className="text-zinc-400 m-4 border p-2 rounded-lg bg-slate-800">Home</Link>
      </div>
    </div>
  );
};

export default Login;