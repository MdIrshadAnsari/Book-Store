import React from 'react'
import {Link} from 'react-router-dom'
const BookCard = ({data}) => {

  return (
    <>
    <Link to={`/view-book-detail/${data._id}`}>
    <div className='bg-zinc-800 rounded-md p-4 flex flex-col'>
      <div className='bg-zinc-900 h-20vh overflow-hidden'>
       <img className='rounded-md' w-full src={data.url} alt="/" />
      </div>
      <h2 className='text-center mt-5 text-xl font-semibold text-zinc-200'>{data.title}</h2>
       <h2 className='text-center mt-2 font-semibold text-zinc-400'>By {data.author}</h2>
       <h2 className='text-center text-zinc-200 font-semibold text-xl'>${data.price}</h2>
    </div>
    </Link>
    </>
  )
}

export default BookCard