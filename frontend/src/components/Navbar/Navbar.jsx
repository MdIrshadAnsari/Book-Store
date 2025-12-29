import React from 'react'
import { Link } from 'react-router-dom'
import { FaGripLines } from "react-icons/fa6";
import { useState } from 'react';
import { useSelector } from 'react-redux';

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
     {
      title: "Admin Profile",
      link: "/profile"
    },
  ]
  const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn)
  const role = useSelector((state)=> state.auth.role)
  // console.log(isLoggedIn)
  if(isLoggedIn === false){
    links.splice(2, 2)
  }
      if(isLoggedIn === true && role === "user"){
    links.splice(4, 1)
  }
    if(isLoggedIn === true && role === "admin"){
    links.splice(3, 1)
  }
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
          {isLoggedIn === false && (
            <>
            <div className='hidden md:flex items-center gap-4'>
          <Link to={"/Login"} className='px-4 py-1 border-1 rounded-md border-blue-500 hover:bg-white hover:text-zinc-800 transition-all duration-300'>Login</Link>
          <Link to={"/SignUp"} className='px-4 py-1 border-1 rounded-md border-blue-500 hover:bg-white hover:text-zinc-800 transition-all duration-300 bg-blue-500'>SignUp</Link>
          </div>
            </>
          )}
          <button className='text-white text-2xl md:hidden block' onClick={()=> Mobilenav === "hidden" ? setMobilenav("block") : setMobilenav("hidden") }>
            <FaGripLines />
          </button>
        </div>
      </nav>

    <div className={`${Mobilenav} mobile-div bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
       { links.map((item, index)=>(
              <Link to={item.link} className='hover:text-blue-500 transition-all duration-300 mb-8 text-2xl font-semibold' key={index}  onClick={()=> Mobilenav === "hidden" ? setMobilenav("block") : setMobilenav("hidden") }>{item.title}</Link>
            ))}
            {isLoggedIn === false &&(
              <>
               <Link to={"/Login"} className='text-2xl font-semibold px-6 py-2 border-1 rounded-md border-blue-500 hover:bg-white hover:text-zinc-800 transition-all duration-300 mb-8' onClick={()=> Mobilenav === "hidden" ? setMobilenav("block") : setMobilenav("hidden") }>Login</Link>
          <Link to={"/SignUp"} className='text-2xl font-semibold px-6 py-2 border-1 rounded-md border-blue-500 hover:bg-white hover:text-zinc-800 transition-all duration-300 bg-blue-500 mb-8' onClick={()=> Mobilenav === "hidden" ? setMobilenav("block") : setMobilenav("hidden") }>SignUp</Link>
              </>
            )}
           
    </div>
    </div>
    </>
  )
}

export default Navbar