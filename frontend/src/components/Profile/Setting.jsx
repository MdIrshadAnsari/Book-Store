import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

const Setting = () => {
  const [Value, setValue] = useState({ address: "" });
  const [Profiledata, setProfiledata] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/get-user-information`,
        { headers }
      );
      setProfiledata(response.data);
      setValue({ address: (await response).data.address });
    };
    fetch();
  }, []);

  const onchange = (e)=>{
    const{name, value} = e.target;
    setValue({...Value,[name]: value})
  }

  const submitAddress = async()=>{
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/user/update-address`,Value, {headers})
    alert(response.data.message)

  }

  return (
    <>
      {!Profiledata && (
        <div className="w-full h-screen bg-zinc-900 flex items-center justify-center text-white">
          <Loader />{" "}
        </div>
      )}
      {Profiledata &&(
        <div>
          <div className="h-[100%] p-0 md:p-4 text-zinc-100">
            <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">Settings</h1>
            <div className="flex gap-12">
              <div>
                <label htmlFor="">Username</label>
                <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">{Profiledata.username}</p>
              </div>
              <div>
                <label htmlFor="">Email</label>
                <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">{Profiledata.email}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-col">
              <label htmlFor="">Address</label>
              <textarea name="address" id="" className="p-2 rounded bg-zinc-800 mt-2 font-semibold" rows="5" placeholder="Address" value={Value.address} onChange={onchange}></textarea>
            </div>
            <div className="mt-4 flex justify-end">
              <button className="bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400 transition-all duration-300" onClick={submitAddress}>Update</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Setting;
