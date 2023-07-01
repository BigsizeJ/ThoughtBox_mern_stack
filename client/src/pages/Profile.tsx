import React from "react";
import ProfileNav from "../components/ProfileNav";
import { Outlet } from "react-router-dom";

const Profile = () => {
  return (
    <section className="app lg:px-20 lg:mx-10 py-10 px-5">
      <div className="w-full h-full flex items-center justify-between">
        <h1
          className="text-xl font-bold bg-clip-text text-transparent 
      bg-gradient-to-r from-blue-200 to-blue-500 md:text-3xl py-2"
        >
          My Profile
        </h1>        
        {/* // Nav */}
        <ProfileNav />
      </div>
      <section>
        <Outlet />
      </section>
    </section>
  );
};

export default Profile;
