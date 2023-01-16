const express = require("express");
const { connection } = require("./config/db");
require("dotenv").config()
const {userroute} = require("./router/user_router")
const {postroute} = require("./router/post_router");
const { json } = require("express");
const {validate} = require("./middleware/validate")
const jwt = require("jsonwebtoken")

const app = express()
app.use(express.json())

app.use("/users",userroute)

app.use(validate)
app.use("/post",postroute)


app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("server is running")
    } catch (error) {
        console.log("something went wrong in server");
        console.log(error)
    }
})
