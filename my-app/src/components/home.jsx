import React, { useState } from "react";
import { Link, redirect } from "react-router-dom";

const Home = () => {

  return(
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-slate-900">
        <div className="text-3xl text-zinc-400">Welcome to Contact Manager</div>
      <div className="p-4 flex justify-center items-center">
        <Link to="/login" className="text-zinc-400 m-4 border p-2 rounded-lg bg-slate-800">Login</Link>
        <Link to="/register" className="text-zinc-400 m-4 border p-2 rounded-lg bg-slate-800">Register</Link>
      </div>
    </div>
  );
};

export default Home;
