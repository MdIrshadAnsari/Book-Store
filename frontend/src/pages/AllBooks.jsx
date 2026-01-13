import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios"
import Loader from '../components/Loader/Loader'
import BookCard from '../components/BookCard/BookCard'

const AllBooks = () => {
   const [Data, setData] = useState();

  useEffect(()=>{
    const fetch = async()=>{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/book/get-all-books`)
        console.log(response.data.data)
        setData(response.data.data)
    }
    fetch()
  },[])
  return (
    <div className='bg-zinc-900 px-12 py-8 h-auto min-h-screen'>
       <h4 className="text-3xl text-yellow-100">All Books</h4>
      {!Data && <div className="flex items-center justify-center my-20"><Loader/> </div>}
      <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
         {Data && Data.map((item ,index)=>(
            <div key={index}>
              <BookCard data={item}/>
            </div>
         ))}
      </div>
    </div>
  )
}

export default AllBooks