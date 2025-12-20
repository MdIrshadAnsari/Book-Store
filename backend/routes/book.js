const router = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const {authenticateToken} = require('./userAuth')
const Book = require('../models/book')

router.post('/add-book', authenticateToken, async(req, res)=>{
   try {
    const {id} = req.headers;
    await User.find
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




module.exports = router;
