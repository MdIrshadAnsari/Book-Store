import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AllBooks from "./pages/AllBooks";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import ViewBookDetails from "./components/ViewBookDetails/ViewBookDetails";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "./store/auth";
import { useEffect } from "react";
import Favourites from "./components/Profile/Favourites"
import UserorderHistory from "./components/Profile/UserorderHistory"
import Setting from "./components/Profile/Setting";
import AllOrders from "./pages/AllOrders";
import AddBooks from "./pages/AddBooks";
import UpdateBook from "../src/pages/UpdateBook"

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state)=> state.auth.role)
  useEffect(()=>{
    if(
      localStorage.getItem("id") &&
      localStorage.getItem("token") && 
      localStorage.getItem("role")
    ){
      dispatch(authAction.login())
      dispatch(authAction.changeRole(localStorage.getItem("role")))
    }
  }, [])
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/Login" element={<Login />} />
         <Route path="/updatebook/:id" element={<UpdateBook />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />}>
        {role === "user" ? (<Route index element={<Favourites/>}/>) : (<Route index element={<AllOrders/>}/>)}
        {role === "admin" && <Route path="/profile/add-book" element={<AddBooks/>}/>}
        <Route path="/profile/orderHistory" element={<UserorderHistory/>}/>
          <Route path="/profile/settings" element={<Setting/>}/>
        </Route>
        <Route path="/view-book-detail/:id" element={<ViewBookDetails />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
