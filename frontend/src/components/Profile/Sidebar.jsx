import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../store/auth";

const Sidebar = ({ data }) => {
  const dispatch = useDispatch()
  const history = useNavigate()
  const role = useSelector((state)=> state.auth.role)
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
        {role === "user" && (
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
        )}
                {role === "admin" && (
                 <div className="w-full mt-20 flex flex-col gap-2">
          <Link
            to="/profile"
            className="py-3 px-2 rounded-md text-center font-semibold hover:bg-zinc-900 transition"
          >
            All Order
          </Link>
          <Link
            to="/profile/add-book"
            className="py-3 px-2 rounded-md text-center font-semibold hover:bg-zinc-900 transition"
          >
           Add book
          </Link>
        </div>
        )}
      </div>

      

      {/* Logout */}
      <button className="bg-zinc-900 w-full mt-6 text-white font-semibold flex items-center justify-center py-2 rounded-md hover:bg-white hover:text-zinc-900 transition gap-3" onClick={()=>{
        dispatch(authAction.logout())
        dispatch(authAction.changeRole("user"))
        localStorage.clear("id")
        localStorage.clear("token")
        localStorage.clear("role")
        history("/")
      }}>
        Log Out <FaArrowRightFromBracket />
      </button>
    </div>
  );
};

export default Sidebar;
