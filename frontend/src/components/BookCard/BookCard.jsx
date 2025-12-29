import axios from "axios";
import { Link } from "react-router-dom";


const BookCard = ({ data, favourite }) => {
const headers = {
  id: localStorage.getItem("id"),
  authorization: `Bearer ${localStorage.getItem("token")}`,
  bookid: data._id
}

const handleremovebook = async()=>{
  const response = await axios.put("http://localhost:3000/book/remove-book-from-favourite", {}, {headers})
  alert(response.data.message)
}

  return (
    <div className="bg-zinc-800 rounded-md p-4 flex flex-col">
      <Link to={`/view-book-detail/${data._id}`}>
        <div>
          <div className="bg-zinc-900 h-20vh overflow-hidden">
            <img className="rounded-md w-full"  src={data.url} alt="/" />
          </div>
          <h2 className="text-center mt-5 text-xl font-semibold text-zinc-200">
            {data.title}
          </h2>
          <h2 className="text-center mt-2 font-semibold text-zinc-400">
            By {data.author}
          </h2>
          <h2 className="text-center text-zinc-200 font-semibold text-xl">
            ${data.price}
          </h2>
        </div>
      </Link>
      {favourite && (
        <button className="bg-yellow-50 px-4 py-2 rounded-md border border-zinc-900 font-bold text-red-500 mt-4" onClick={handleremovebook}>
          Remove From Favourite
        </button>
      )}
    </div>
  );
};

export default BookCard;
