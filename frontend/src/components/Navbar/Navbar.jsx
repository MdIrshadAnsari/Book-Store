import React from 'react'

const Navbar = () => {
  const links = [
    {
      title: "Home",
      link: "/"
    },
     {
      title: "About Us",
      link: "/about-us"
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
  return (
    <div className='bg-zinc-800 p-5 text-white'>
      <div className='flex items-center justify-between'>
        <div className='left-div'>
          <h1 className='text-2xl font-semibold'>BookHeaven</h1>
        </div>
        <div className='right-div flex gap-4 items-center'>
          <div className='flex items-center gap-4'>
          { links.map((item, index)=>(
              <div className='hover:text-blue-500 transition-all duration-300' key={index}>{item.title}</div>
            ))}
          </div>
          <div className='flex items-center gap-4'>
          <button className='px-4 py-1 border-1 rounded-md border-blue-500 hover:bg-white hover:text-zinc-800 transition-all duration-300'>Login</button>
          <button className='px-4 py-1 border-1 rounded-md border-blue-500 hover:bg-white hover:text-zinc-800 transition-all duration-300 bg-blue-500'>SignUp</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar