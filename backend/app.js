const express = require('express')
const app = express()
require('dotenv').config()
require("./connection/connection")

app.listen(process.env.PORT, ()=>{
    console.log(`server started ${process.env.PORT}`)
})