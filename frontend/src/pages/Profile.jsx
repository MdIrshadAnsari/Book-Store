import React, { useEffect, useState } from "react";
import Sidebar from "../components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader/Loader";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await axios.get(
        "http://localhost:3000/user/get-user-information",
        { headers }
      );
      setProfile(response.data);
    };
    fetchProfile();
  }, []);

  if (!profile) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-zinc-900 text-white">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 min-h-screen px-6 py-8">
      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-[260px] h-[80vh]">
          <Sidebar data={profile} />
        </div>

        {/* Content */}
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Profile;
