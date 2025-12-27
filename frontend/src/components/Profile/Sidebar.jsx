import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";

const Sidebar = ({ data }) => {
  return (
    <div className="bg-zinc-800 rounded-md p-6 flex flex-col items-center justify-between h-full text-white">
      {/* Profile Info */}
      <div className="flex flex-col items-center">
        <img
          className="rounded-full h-20 w-20 object-cover"
          src="/default.webp"
          alt="profile"
        />
        <p className="mt-3 text-xl font-semibold text-zinc-100">
          {data.username}
        </p>
        <p className="text-sm text-zinc-400">{data.email}</p>

        <div className="w-full mt-4 h-[1px] bg-zinc-600"></div>

        {/* Links */}
        <div className="w-full mt-4 flex flex-col gap-2">
          <Link
            to="/profile"
            className="py-3 px-2 rounded-md text-center font-semibold hover:bg-zinc-900 transition"
          >
            Favourites
          </Link>
          <Link
            to="/profile/orderHistory"
            className="py-3 px-2 rounded-md text-center font-semibold hover:bg-zinc-900 transition"
          >
            Order History
          </Link>
          <Link
            to="/profile/settings"
            className="py-3 px-2 rounded-md text-center font-semibold hover:bg-zinc-900 transition"
          >
            Settings
          </Link>
        </div>
      </div>

      {/* Logout */}
      <button className="bg-zinc-900 w-full mt-6 text-white font-semibold flex items-center justify-center py-2 rounded-md hover:bg-white hover:text-zinc-900 transition gap-3">
        Log Out <FaArrowRightFromBracket />
      </button>
    </div>
  );
};

export default Sidebar;
