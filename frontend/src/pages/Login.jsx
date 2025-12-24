import React from "react";

const Login = () => {
  return (
     <div className="h-screen bg-zinc-900 items-center justify-center flex flex-col">
      <div className=" w-[25vw] bg-zinc-800 rounded-md p-5">
        <div>
          <form className="" action="">
            <h1 className="text-white text-2xl">Login</h1>
            <label className="mt-3 block text-zinc-500">Username</label>
            <input
              className="px-3 py-2 rounded-md mt-2 w-full bg-zinc-900 text-zinc-200"
              id="username"
              name='username'
              placeholder="Enter username"
              type="text" required
            />

            <label className="mt-3 block text-zinc-500">Password</label>
            <input
              className="px-3 py-2 rounded-md mt-2 w-full bg-zinc-900 text-zinc-200"
              id="password"
              name='password'
              placeholder="Enter Password"
              type="password" required
            />

          </form>
        </div>
        <div className='flex flex-col items-center justify-center mt-3 text-white'>
        <button className='px-3 py-2 bg-blue-500 w-full rounded-md mt-2'>Login</button>
        <p className='mt-2'>Or</p>
        <p className='text-zinc-400 mt-2'>Don't have an account? <a href="/">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
