const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

// add book in favourite
router.put("/add-book-to-favourite", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);
    const isfavourite = userData.favourites.includes(bookid);
    if (isfavourite) {
      return res.status(200).json({ message: "Book is Already in favourite" });
    }
    await User.findByIdAndUpdate(id, { $push:{ favourites: bookid } });
    return res.status(200).json({ message: "Book is Added in favourite" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// remove book from favourite
router.put("/remove-book-from-favourite", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);
    const isfavourite = userData.favourites.includes(bookid);
    if (isfavourite) {
        await User.findByIdAndUpdate(id, { $pull:{ favourites: bookid } });
    }
    return res.status(200).json({ message: "Book removed from favourite" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// show all favourite book
router.get('/get-all-favourite-book', authenticateToken, async(req, res)=>{
    try {
        const{id} = req.headers;
        const userdata = await User.findById(id).populate("favourites");
        const favouritebooks = userdata.favourites
        return res.status(200).json({status: "success", data: favouritebooks})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})

module.exports = router;
