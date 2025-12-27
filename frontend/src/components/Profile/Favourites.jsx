import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BookCard from "../BookCard/BookCard"

const Favourites = () => {
  const[favourite, setfavourite] = useState("")

    const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(()=>{
    const fetch = async()=>{
      const response = await axios.get("http://localhost:3000/book/get-all-favourite-book", {headers})
      setfavourite(response.data.data)
    }
    fetch()
  }, [favourite])
  return (
    <>
     {favourite.length === 0 && <div className='text-5xl font-semibold w-full items-center justify-center text-zinc-200 h-[100%] flex'>No Favourite Book</div>}
     <div className='grid grid-cols-3 gap-5'>
    
      {favourite && favourite.map((item, index)=>(
        <div key={index}><BookCard data={item} favourite={true}/></div>
      ))}
    </div></>
    
  )
}

export default Favourites