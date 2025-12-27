import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ViewBookDetails = () => {
  const { id } = useParams();
  const [Data, setData] = useState(null);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fetchBook = async () => {
      const response = await axios.get(
        `http://localhost:3000/book/get-book-detail/${id}`
      );
      setData(response.data.data);
    };
    fetchBook();
  }, [id]);

  if (!Data) {
    return (
      <div className="h-screen bg-zinc-900 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id
  };

  const handlefavourite = async()=>{
    const response = await axios.put("http://localhost:3000/book/add-book-to-favourite",{},{headers})
    alert(response.data.message)
  }

 const handleCart = async()=>{
  const response = await axios.put("http://localhost:3000/book/add-to-cart",{}, {headers})
   alert(response.data.message)
 }

  return (
    <div className="p-5 md:p-10 bg-zinc-900 flex flex-col lg:flex-row gap-16">
      <div className="w-full lg:w-1/2">
        <div className="flex flex-col justify-center lg:flex-row bg-zinc-800 p-6 lg:p-8 gap-4 rounded-md lg:gap-10">
          <img
            src={Data.url}
            alt={Data.title}
            className="h-[30vh] lg:h-[65vh] w-full lg:w-[30vw] rounded-md object-fit"
          />
          {isLoggedIn && role === "user" && (
            <div className="flex flex-row lg:flex-col items-start gap-3 mt-4 lg:mt-0">
              
              <button className="bg-white text-red-600 text-xl lg:text-3xl p-2 rounded-md lg:rounded-full flex items-center gap-2" onClick={handlefavourite}>
                <FaHeart />
                <span className="lg:hidden">Favourites</span>
              </button>

              <button className="bg-white text-blue-500 text-xl lg:text-3xl p-2 rounded-md lg:rounded-full flex items-center gap-2" onClick={handleCart}>
                <FaShoppingCart />
                <span className="lg:hidden">Add Cart</span>
              </button>
            </div>
          )}

           {isLoggedIn && role === "admin" && (
            <div className="flex flex-row lg:flex-col items-start gap-3 mt-4 lg:mt-0">
              
              <button className="bg-white text-black text-xl lg:text-3xl p-2 rounded-md lg:rounded-full flex items-center gap-2">
                <FaEdit />
                <span className="lg:hidden">Edit</span>
              </button>

              <button className="bg-white text-red-500 text-xl lg:text-3xl p-2 rounded-md lg:rounded-full flex items-center gap-2">
                <MdDelete />
                <span className="lg:hidden">Delete Book</span>
              </button>

            </div>
          )}
        </div>
      </div>

      <div className="w-full lg:w-1/2 text-white">
        <h1 className="text-4xl text-zinc-300 font-semibold">
          {Data.title}
        </h1>

        <p className="text-zinc-400 mt-2">by {Data.author}</p>

        <p className="text-zinc-500 mt-4 text-lg">
          {Data.desc}
        </p>

        <p className="mt-3 flex items-center gap-2 text-lg text-zinc-500">
          <GrLanguage /> {Data.language}
        </p>

        <p className="mt-6 text-zinc-100 font-semibold text-3xl">
          Price: ${Data.price}
        </p>
      </div>
    </div>
  );
};

export default ViewBookDetails;
