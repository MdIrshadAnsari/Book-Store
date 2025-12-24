import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";

const ViewBookDetails = () => {
  const { id } = useParams();
  const [Data, setData] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:3000/book/get-book-detail/${id}`
      );
      setData(response.data.data);
    };
    fetch();
  }, [id]);
  //  console.log(Data)
  if (!Data) {
    return <div className=" h-screen bg-zinc-900 flex items-center justify-center text-white">
      <Loader />
    </div>
  }
  return (
    <div className="p-5 md:p-10 bg-zinc-900 flex flex-col md:flex-row gap-20">
      <div className="bg-zinc-800 rounded-md p-10 h-[44vh] lg:h-[88vh] w-full lg:w-3/6 flex items-center justify-center overflow-hidden">
        <img
          className=" h-[30vh] lg:h-[65vh] lg:w-[30vw] rounded-md object-fit"
          src={Data.url}
          alt=""
        />
      </div>
      <div className="p-4 w-3/6 text-white w-full">
        <h1 className="text-4xl text-zinc-300 font-semibold">{Data.title}</h1>
        <p className="text-zinc-400 mt-2">by {Data.author}</p>
        <p className="text-zinc-500 mt-4 text-xl">{Data.desc}</p>
        <p className="mt-3 flex items-center gap-2 text-xl text-zinc-500"> <GrLanguage />{Data.language}</p>
        <p className="mt-4 text-zinc-100 font-semibold text-3xl">Price: $ {Data.price}</p>
      </div>
    </div>
  );
};

export default ViewBookDetails;
