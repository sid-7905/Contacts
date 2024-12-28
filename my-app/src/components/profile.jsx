import React from "react";
import Navbar from "./navbar";
import { useState, useEffect } from "react";
import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Profile = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    // Fetch data from the backend
    const token = localStorage.getItem("token");
    console.log(token);
    axios
      .get(`${backendUrl}/api/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true, // Include cookies and credentials
      }) // Replace with your backend URL
      .then((response) => {
        // console.log(response.data);
        setUserData(response.data); // Update state with fetched data
      })
      .catch((error) => {
        console.error("Error fetching contacts:", error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center h-full min-h-screen bg-slate-900">
        <div className="p-8 rounded-lg gap-4 flex flex-col items-center bg-[#2d2a2a] shadow-2xl justify-center h-full">
          <img
            src={userData.image ? `${backendUrl}/images/uploads/${userData.image}` : `${backendUrl}/images/uploads/default.jpg`}
            alt="Contact"
            className="w-24 h-24 object-cover rounded-full mx-auto"
          />
          <h3 className="text-lg font-semibold text-white  mx-auto">
            {userData.name}
          </h3>
          <p className="text-gray-300">Phone: {userData.phone}</p>
          <p className="text-gray-400">Email: {userData.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
