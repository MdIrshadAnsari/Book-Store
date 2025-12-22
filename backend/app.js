const express = require('express')
const app = express()
require('dotenv').config()
require("./connection/connection")
const userRoutes = require('./routes/user')
const bookRoutes = require('./routes/book')
const favouriteRouter = require('./routes/favourite')
const cartRouter = require('./routes/cart')
const orderRouter = require('./routes/order')

app.use(express.json())

//routes
app.use('/user', userRoutes)
app.use('/book', bookRoutes)
app.use('/book', favouriteRouter)
app.use('/book', cartRouter)
app.use('/book', orderRouter)

app.listen(process.env.PORT, ()=>{
    console.log(`server started ${process.env.PORT}`)
})