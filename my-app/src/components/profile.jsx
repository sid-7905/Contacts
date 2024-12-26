import React, { useState } from "react";
import { Link, redirect } from "react-router-dom";
import axios from "axios";

const Profile = () => {

  return(
    <div className="flex items-center justify-center h-screen">
      <div className="p-4 flex flex-col items-center bg-[#2d2a2a] shadow-2xl w-full h-full">
        <Link to="/" className="text-zinc-400 m-4 border p-2 rounded-lg bg-slate-800">Home</Link>
      </div>
    </div>
  );
};

export default Profile;
