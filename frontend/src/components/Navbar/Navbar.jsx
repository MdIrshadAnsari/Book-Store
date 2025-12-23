import React from 'react'
import { Link } from 'react-router-dom'
import { FaGripLines } from "react-icons/fa6";
import { useState } from 'react';

const Navbar = () => {
  const links = [
    {
      title: "Home",
      link: "/"
    },
     {
      title: "All Books",
      link: "/all-books"
    },
     {
      title: "Cart",
      link: "/cart"
    },
     {
      title: "Profile",
      link: "/profile"
    },
  ]
  const [Mobilenav, setMobilenav] = useState("hidden")
  return (
    <>
    <div className='bg-zinc-800 p-5 text-white'>
      <nav className='z-50 relative flex items-center justify-between'>
        <div className='left-div'>
          <h1 className='text-2xl font-semibold'>BookHeaven</h1>
        </div>
        <div className='right-div md:flex gap-4 items-center'>
          <div className='hidden md:flex items-center gap-4'>
          { links.map((item, index)=>(
              <Link to={item.link} className='hover:text-blue-500 transition-all duration-300' key={index}>{item.title}</Link>
            ))}
          </div>
          <div className='hidden md:flex items-center gap-4'>
          <Link to={"/login"} className='px-4 py-1 border-1 rounded-md border-blue-500 hover:bg-white hover:text-zinc-800 transition-all duration-300'>Login</Link>
          <Link to={"/SignUp"} className='px-4 py-1 border-1 rounded-md border-blue-500 hover:bg-white hover:text-zinc-800 transition-all duration-300 bg-blue-500'>SignUp</Link>
          </div>
          <button className='text-white text-2xl md:hidden' onClick={()=> Mobilenav === "hidden" ? setMobilenav("block") : setMobilenav("hidden") }>
            <FaGripLines />
          </button>
        </div>
      </nav>

    <div className={`${Mobilenav} mobile-div bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
       { links.map((item, index)=>(
              <Link to={item.link} className='hover:text-blue-500 transition-all duration-300 mb-8 text-2xl font-semibold' key={index}>{item.title}</Link>
            ))}
            <Link to={"/login"} className='text-2xl font-semibold px-6 py-2 border-1 rounded-md border-blue-500 hover:bg-white hover:text-zinc-800 transition-all duration-300 mb-8'>Login</Link>
          <Link to={"/SignUp"} className='text-2xl font-semibold px-6 py-2 border-1 rounded-md border-blue-500 hover:bg-white hover:text-zinc-800 transition-all duration-300 bg-blue-500 mb-8'>SignUp</Link>
    </div>
    </div>
    </>
  )
}

export default Navbar