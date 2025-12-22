const router = require("express").Router();
const User = require("../models/user");
const Book = require('../models/book')
const Order = require('../models/order')
const { authenticateToken } = require("./userAuth");
const user = require("../models/user");

//place order
router.post('/place-order', authenticateToken, async(req, res)=>{
    try {
        const{id} = req.headers;
        const {order} = req.body;
        for(const orderdata of order){
            const newOrder = new Order({user: id, book: orderdata._id})
            const orderDatafromdb = await newOrder.save()
            await User.findByIdAndUpdate(id, {$push:{order: orderDatafromdb._id}})
            await User.findByIdAndUpdate(id, {$pull: {cart: orderdata._id}})
        }
        return res.status(200).json({message: "Order Placed Successfully"})

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})

// get order history of particular user
router.get('/get-order-history', authenticateToken, async(req, res)=>{
    try {
        const{id} = req.headers;
        const userData = await User.findById(id).populate({
            path: "order",
            populate: {path:"book"}
        })
        const OrderData = userData.order.reverse()
        return res.status(200).json({status: "success", data: OrderData})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})

//get all order admin
router.get('/get-all-order', authenticateToken, async(req, res)=>{
    try {
        const userData = await Order.find().populate({path: "book"}).populate({path: "user"}).sort({createdAt: -1})
        return res.status(200).json({status: "success", data: userData})
        
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})

// update order admin
router.put('/update-status/:id', authenticateToken, async(req, res)=>{
    try {
        const{id} = req.params;
        await Order.findByIdAndUpdate(id, {status: req.body.status})
        return res.status(200).json({status: "success", message: "Status Updated Successfully"})

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})


module.exports = router