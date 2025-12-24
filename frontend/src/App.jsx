import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AllBooks from "./pages/AllBooks"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import ViewBookDetails from "./components/ViewBookDetails/ViewBookDetails";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/all-books" element={<AllBooks />}/>
          <Route path="/Login" element={<Login />}/>
          <Route path="/SignUp" element={<SignUp />}/>
           <Route path="/cart" element={<Cart />}/>
            <Route path="/profile" element={<Profile />}/>
             <Route path="/view-book-detail/:id" element={<ViewBookDetails />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
