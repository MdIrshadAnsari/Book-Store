import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="h-[80vh] flex flex-col md:flex-row items-center justify-center">
      <div className="left-div mb-8 mb:mb-0 w-full lg:w-[50%] flex flex-col items-center lg:items-start justify-center">
        <h1 className="text-4xl lg:text-6xl font-semibold text-yellow-100 text-center lg-text-left">Discover Your Next Great Read</h1>
        <p className="mt-4 text-xl text-zinc-300 text-center lg:text-left">Uncover captivating stories, enriching knowledge, and endless inspiration in our curated collection of books</p>
        <div className="mt-8">
        <Link to={"/all-books"} className="text-yellow-100 text-xl lg:text-2xl font-semibold border-1 border-yellow-100 rounded-full px-10 py-3 hover:bg-zinc-800">Discover Books</Link>
        </div>
      </div>
      <div className="right-div w-full lg:w-[50%] h-auto lg:h-[100%] flex items-center justify-center">
           <img className="w-[70%] flex items-center justify-center" src="./Hero.png" alt="" />
      </div>
    </div>
  );
};

export default Hero;
