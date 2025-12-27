import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import axios from "axios";
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const [Cart, setCart] = useState([]);
  const [Total, setTotal] = useState(0);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  }
   
  const deleteItem = async(bookid)=>{
    const response  = await axios.put(`http://localhost:3000/book/remove-from-cart/${bookid}`, {}, {headers})
    alert(response.data.message)
  }

  useEffect(()=>{
    const fetch = async()=>{
      const response = await axios.get("http://localhost:3000/book/get-user-cart", {headers})
      setCart(response.data.data)
      //console.log(response)
    }
    fetch()
  }, [Cart])

  return (
    <div className="bg-zinc-900 px-12 h-screen py-8">
      {!Cart && <Loader />}
      {Cart && Cart.length === 0 && (
        <div className="h-screen">
          <div className="h-[100%] flex items-center justify-center flex-col">
            <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">
              Empty Cart
            </h1>
          </div>
        </div>
      )}
      {Cart && Cart.length > 0 && (
        <>
          <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
            {" "}
            Your Cart
          </h1>
          {Cart.map((item, index) => (
            <div
              className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center "
              key={index}
            >
              <img
                src={item.url}
                alt=""
                className="h-[20vh] md:h-[10vh] object-cover rounded-md"
              />
              <div className="w-full md:w-auto">
                <h1 className="text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0">
                  {item.title}
                </h1>
                <p className="text-normal text-zinc-300 mt-2 hidden lg:block">
                  {item.desc?.slice(0, 100)}...
                </p>
                <p className="text-normal text-zinc-300 mt-2 hidden md:block lg:hidden">
                  {item.desc?.slice(0, 65)}...
                </p>
                <p className="text-normal text-zinc-300 mt-2 hidden md:hidden">
                  {item.desc?.slice(0, 100)}...
                </p>
              </div>
              <div className="flex mt-4 w-full md:w-auto items-center justify-between">
                <h2 className="text-zinc-100 text-3xl font-semibold flex">
                  ${item.price}
                </h2>
                <button
                  className="bg-red-100 text-red700 border-red-700 rounded p-2 ms-12 text-2xl"
                  onClick={() => deleteItem(item._id)}
                ><MdDelete /></button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Cart;
