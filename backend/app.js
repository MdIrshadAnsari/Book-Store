const express = require('express')
const app = express()
require('dotenv').config()
require("./connection/connection")
const userRoutes = require('./routes/user')


app.use(express.json())

//routes
app.use('/user', userRoutes)

app.listen(process.env.PORT, ()=>{
    console.log(`server started ${process.env.PORT}`)
})