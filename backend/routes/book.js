const router = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const {authenticateToken} = require('./userAuth')
const Book = require('../models/book')

// add book
router.post('/add-book', authenticateToken, async(req, res)=>{
   try {
    const {id} = req.headers;
    const user = await User.findById(id);
    if(user.role !== "admin"){
      return res.status(400).json({message : "you are not having access to perform admin work"})
    }
    const{url, title, author, price, desc, language} = req.body;
    const book = new Book({
         url,
         title,
         author,
         price,
         desc,
         language
    })
    await book.save()
    return res.status(200).json({message: "book created successfully"})
   } catch (error) {
     res.status(500).json({message: "Internal server error"})
   }
})


// update book
router.put('/update-book', authenticateToken, async(req, res)=>{
   try {
    const {bookid} = req.headers;
    const{url, title, author, price, desc, language} = req.body;
    await Book.findByIdAndUpdate(bookid, {
      url,
      title,
      author,
      price,
      desc,
      language

    });
    return res.status(200).json({message: "book Updated successfully"})
   } catch (error) {
     res.status(500).json({message: "Internal server error"})
   }
})

//delete book
router.delete('/delete-book', authenticateToken, async(req, res)=>{
  try {
    const {bookid} = req.headers;
    await Book.findByIdAndDelete(bookid)
    return res.status(200).json({message: "Book deleted Successfully"})
  } catch (error) {
    res.status(500).json({message: "An Error Occured"})
  }
})


// get all book
router.get('/get-all-books', async(req, res)=>{
  try {
    const books = await Book.find().sort({createdAt: -1})
    res.status(200).json({
      status: "successs",
      data: books
    })
  } catch (error) {
    res.status(500).json({message: "An error Occured"})
  }
})


// get recently added book
router.get('/get-recent-books', async(req, res)=>{
  try {
    const books = await Book.find().sort({createdAt: -1}).limit(4)
    res.status(200).json({
      status: "successs",
      data: books
    })
  } catch (error) {
    res.status(500).json({message: "An error Occured"})
  }
})


// particular book detail
router.get('/get-book-detail/:bookid', async(req, res)=>{
  try {
    const{bookid} = req.params
    const bookdetail = await Book.findById(bookid)
    res.status(200).json({
      status: "success",
      data: bookdetail
    })
  } catch (error) {
    res.status(500).json({message: "An error Occured"})
  }
})


module.exports = router;
