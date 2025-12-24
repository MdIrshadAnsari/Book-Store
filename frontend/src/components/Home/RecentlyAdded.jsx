import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios"
import BookCard from "../BookCard/BookCard";
import Loader from "../Loader/Loader";

const RecentlyAdded = () => {
  const [Data, setData] = useState();

  useEffect(()=>{
    const fetch = async()=>{
        const response = await axios.get("http://localhost:3000/book/get-recent-books")
        setData(response.data.data)
    }
    fetch()
  },[])
  return (
    <div className="mt-2">
      <h4 className="text-3xl text-yellow-100">Recently Added Books</h4>
      {!Data && <div className="flex items-center justify-center my-20"><Loader/> </div>}
      <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
         {Data && Data.map((item ,index)=>(
            <div key={index}>
              <BookCard data={item}/>
            </div>
         ))}
      </div>
    </div>
  );
};

export default RecentlyAdded;
