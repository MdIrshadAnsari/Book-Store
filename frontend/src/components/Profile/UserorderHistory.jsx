import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

const UserorderHistory = () => {
  const [orderHistory, setOrderhistory] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/book/get-order-history",
          { headers }
        );
        setOrderhistory(response.data.data);
      } catch (error) {
        console.error(error);
        setOrderhistory([]);
      }
    };
    fetch();
  }, []);

  if (!orderHistory) {
    return (
      <div className="w-full h-screen bg-zinc-900 flex items-center justify-center text-white">
        <Loader />
      </div>
    );
  }

  if (orderHistory.length === 0) {
    return (
      <div className="h-[80vh] p-4 text-zinc-100 flex items-center justify-center">
        <h1 className="text-5xl font-semibold text-zinc-500">
          No Order History
        </h1>
      </div>
    );
  }

  return (
    <div className="h-[100%] p-0 md:p-4 text-zinc-100">
      <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
        Your Order History
      </h1>

      <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 mb-2">
        <div className="w-[3%] text-center">Sr.</div>
        <div className="w-[22%]">Books</div>
        <div className="w-[45%]">Description</div>
        <div className="w-[9%]">Price</div>
        <div className="w-[16%]">Status</div>
        <div className="hidden md:block w-[5%]">Mode</div>
      </div>

      {orderHistory.map((item, index) => (
        <div
          key={item._id}
          className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 mb-2"
        >
          <div className="w-[3%] text-center">{index + 1}</div>

          <div className="w-[22%]">
            {item.book ? (
              <Link
                to={`/view-book-detail/${item.book._id}`}
                className="hover:underline"
              >
                {item.book.title}
              </Link>
            ) : (
              <span className="text-zinc-400 italic">
                Book removed
              </span>
            )}
          </div>

          <div className="w-[45%]">
            {item.book?.desc
              ? item.book.desc.slice(0, 50) + "..."
              : "No Description"}
          </div>

          <div className="w-[9%]">
            {item.book?.price ?? "--"}
          </div>

          <div className="w-[16%] font-semibold">
            {item.status === "Order Placed" ? (
              <span className="text-green-500">{item.status}</span>
            ) : item.status === "Cancelled" ? (
              <span className="text-red-500">{item.status}</span>
            ) : (
              <span className="text-yellow-500">{item.status}</span>
            )}
          </div>

          <div className="hidden md:block w-[5%] text-sm text-zinc-400">
            COD
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserorderHistory;
