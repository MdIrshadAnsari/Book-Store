const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

// put book to cart
router.put("/add-to-cart", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);
    const isbookinCart = userData.cart.includes(bookid);
    if (isbookinCart) {
      return res
        .status(200)
        .json({ status: "success", message: "Book is Already in cart" });
    }
    await User.findByIdAndUpdate(id, { $push: { cart: bookid } });
    return res
      .status(200)
      .json({ status: "success", message: "book added to cart" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// remove book from cart
router.put("/remove-from-cart/:bookid", authenticateToken, async (req, res) => {
    try {
      const { bookid } = req.params;
      const { id } = req.headers;
      await User.findByIdAndUpdate(id, { $pull: { cart: bookid } });
      return res
        .status(200)
        .json({ status: "success", message: "Book removed from cart" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

//get all cart book
router.get('/get-user-cart', authenticateToken, async(req, res)=>{
    try {
        const {id} = req.headers;
        const userdata = await User.findById(id).populate("cart");
        const cart = userdata.cart.reverse()
         return res.status(200).json({status: "success", data: cart})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})

module.exports = router;
