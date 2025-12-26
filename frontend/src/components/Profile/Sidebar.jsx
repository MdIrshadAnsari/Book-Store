import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRightFromBracket } from "react-icons/fa6";

const Sidebar = ({data}) => {
  return (
    <div className='bg-zinc-800 rounded-md p-5 flex flex-col items-center justify-between h-[60%]'>
     <div className='flex items-center jusify-center flex-col'>
       <img className='rounded-full h-[10vh]' src="./default.webp" alt="" />
      <p className='mt-3 text-xl text-zinc-100 font-semibold'>{data.username}</p>
      <p className='mt-1 text-normal text-zinc-300'>{data.email}</p>
      <div className='w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block'>
      </div>
     </div>
        <div className='w-full flex-col items-center jusify-center hidden lg:flex'>
           <Link to={"/profile"} className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'>Favourite</Link>
           <Link to={"/profile/orderHistory"} className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'>Order History</Link>
           <Link to={"/profile/settings"} className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'>Setting</Link>
        </div>
        <button className='bg-zinc-900 w-3/6 lg:w-full mt-4 lg:mt-0 text-white font-semibold flex items-center justify-center py-2 rounded-md hover:bg-white hover:text-zinc-900 transition-all duration-300 gap-5'>Log Out <FaArrowRightFromBracket /></button>
    </div>
  )
}

export default Sidebar