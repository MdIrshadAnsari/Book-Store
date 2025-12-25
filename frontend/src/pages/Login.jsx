import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {authAction} from "../store/auth"
import { useDispatch } from "react-redux";

const Login = () => {
  const [values, setvalues] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setvalues({ ...values, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      if (values.username === "" || values.password === "") {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          "http://localhost:3000/user/sign-in",
          values
        );
        dispatch(authAction.login())
         dispatch(authAction.changeRole(response.data.role))
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        navigate('/profile')
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className="h-screen bg-zinc-900 items-center justify-center flex flex-col">
      <div className=" p-15 md:w-[25vw] bg-zinc-800 rounded-md md:p-5">
        <div>
          <form>
            <h1 className="text-white text-2xl">Login</h1>
            <label className="mt-3 block text-zinc-500">Username</label>
            <input
              className="px-3 py-2 rounded-md mt-2 w-full bg-zinc-900 text-zinc-200"
              id="username"
              name="username"
              placeholder="Enter username"
              type="text"
              required
              value={values.username}
              onChange={change}
            />

            <label className="mt-3 block text-zinc-500">Password</label>
            <input
              className="px-3 py-2 rounded-md mt-2 w-full bg-zinc-900 text-zinc-200"
              id="password"
              name="password"
              placeholder="Enter Password"
              type="password"
              required
              value={values.password}
              onChange={change}
            />
            <button
              className="px-3 py-2 bg-blue-500 w-full rounded-md mt-2"
              onClick={submit}
            >
              Login
            </button>
          </form>
        </div>
        <div className="flex flex-col items-center justify-center mt-3 text-white">
          <p className="mt-2">Or</p>
          <p className="text-zinc-400 mt-2">
            Don't have an account? <a href="/SignUp">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
