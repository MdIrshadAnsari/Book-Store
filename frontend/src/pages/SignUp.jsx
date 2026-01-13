import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [values, setvalues] = useState({
    username: "",
    email: "",
    password: "",
    address: ""
  });
 const navigate =  useNavigate()

  const change = (e) => {
    const { name, value } = e.target;
    setvalues({ ...values, [name]: value }); 
  };

  const submit = async (e) => {    
    e.preventDefault();                       

    try {
      if (
        values.username === "" ||
        values.email === "" ||
        values.password === "" ||
        values.address === ""
      ) {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/user/sign-up`,
          values
        );
        alert(response.data.message);
        navigate('/Login')
      }
    } catch (error) {
       alert(error.response.data.message);
    }
  };

  return (
    <div className="h-screen bg-zinc-900 items-center justify-center flex flex-col">
      <div className="p-15 md:w-[25vw] bg-zinc-800 rounded-md md:p-5">
        <div>
          <form onSubmit={submit}>           
            <h1 className="text-white text-2xl">Sign Up</h1>

            <label className="mt-3 block text-zinc-500">Username</label>
            <input
              className="px-3 py-2 rounded-md mt-2 w-full bg-zinc-900 text-zinc-200"
              name="username"
              placeholder="Enter username"
              type="text"
              value={values.username}
              onChange={change}
            />

            <label className="mt-3 block text-zinc-500">Email</label>
            <input
              className="px-3 py-2 rounded-md mt-2 w-full bg-zinc-900 text-zinc-200"
              name="email"
              placeholder="Enter email"
              type="email"
              value={values.email}
              onChange={change}
            />

            <label className="mt-3 block text-zinc-500">Password</label>
            <input
              className="px-3 py-2 rounded-md mt-2 w-full bg-zinc-900 text-zinc-200"
              name="password"
              placeholder="Enter Password"
              type="password"
              value={values.password}
              onChange={change}
            />

            <label className="mt-3 block text-zinc-500">Address</label>
            <textarea
              className="w-full bg-zinc-900 resize-none rounded-md text-white p-2"
              name="address"
              value={values.address}
              onChange={change}
            ></textarea>

            <button
              type="submit"          
              className="px-3 py-2 bg-blue-500 w-full rounded-md mt-4 text-white"
            >
              Sign Up
            </button>
          </form>
        </div>

        <div className="flex flex-col items-center justify-center mt-3 text-white">
          <p className="mt-2">Or</p>
          <p className="text-zinc-400 mt-2">
            Already have an account? <a href="/Login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
