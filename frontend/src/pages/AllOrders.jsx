import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";

const AllOrders = () => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const [Data, setData] = useState([]);
  const [option, setOption] = useState(-1);
  const [statusValue, setStatusValue] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/book/get-all-order",
          { headers }
        );
        setData(response.data.data || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);

  const change = (e) => {
    setStatusValue(e.target.value);
  };

  const submitChanges = async (index) => {
    try {
      const id = Data[index]._id;

      const response = await axios.put(
        `http://localhost:3000/book/update-status/${id}`,
        { status: statusValue },
        { headers }
      );

      alert(response.data.message);

      // Update UI instantly
      const updatedData = [...Data];
      updatedData[index].status = statusValue;
      setData(updatedData);

      setOption(-1);
      setStatusValue("");
    } catch (error) {
      console.error(error);
      alert("Failed to update order status");
    }
  };

  if (!Data.length) return <Loader />;

  return (
    <div className="h-[100%] p-0 md:p-4 text-zinc-100">
      <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
        All Orders
      </h1>

      <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 mb-2">
        <div className="w-[3%] text-center">Sr.</div>
        <div className="w-[22%]">Books</div>
        <div className="w-[45%]">Description</div>
        <div className="w-[9%]">Price</div>
        <div className="w-[16%]">Status</div>
        <div className="hidden md:block w-[5%]">Mode</div>
      </div>

      {Data.map((item, index) => (
        <div
          key={item._id}
          className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 mb-2"
        >
          <div className="w-[3%] text-center">{index + 1}</div>

          <div className="w-[22%]">{item?.book?.title}</div>

          <div className="w-[45%]">
            {item?.book?.desc?.slice(0, 20)}...
          </div>

          <div className="w-[9%]">{item?.book?.price}</div>

          <div className="w-[16%]">
            <button
              className="font-semibold hover:scale-105 transition-all duration-300"
              onClick={() => setOption(index)}
            >
              {item.status === "Order Placed" ? (
                <span className="text-green-500">{item.status}</span>
              ) : item.status === "Cancelled" ? (
                <span className="text-red-500">{item.status}</span>
              ) : (
                <span className="text-yellow-500">{item.status}</span>
              )}
            </button>

            {option === index && (
              <div className="mt-1 flex gap-2">
                <select
                  value={statusValue}
                  onChange={change}
                  className="bg-gray-800 px-2 py-1 rounded"
                >
                  <option value="">Select</option>
                  {[
                    "Order Placed",
                    "Out for delivery",
                    "Delivered",
                    "Cancelled",
                  ].map((status, i) => (
                    <option key={i} value={status}>
                      {status}
                    </option>
                  ))}
                </select>

                <button
                  className="text-green-500 hover:text-red-500 font-semibold"
                  onClick={() => submitChanges(index)}
                  disabled={!statusValue}
                >
                  Save
                </button>
              </div>
            )}
          </div>

          <div className="hidden md:block w-[5%] font-semibold">
            COD
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllOrders;
