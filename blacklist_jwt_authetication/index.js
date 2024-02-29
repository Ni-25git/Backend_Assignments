const express = require("express");
const dotenv= require("dotenv").config()
const {connection} = require("./db")
const {userRouter} = require("./routes/userRouter")
const {auth} = require("./middlewares/auth.middleware")
const jwt = require("jsonwebtoken");
const { blacklist } = require("./blacklist");


const app= express();
const PORT = process.env.PORT;
app.use(express.json())
app.use("/users",userRouter)



app.get("/",(req,res)=>{
    res.send("Welcome Home Page")
})
app.get("/about",(req,res)=>{
    res.send("Welcome About Page")
})
app.get("/movies",auth,(req,res)=>{
    res.status(200).send({msg:"Movies Data"})
})

app.get("/series",auth,(req,res)=>{
    res.status(200).send({msg:"Seeries Data"})
})

app.get("/logout",auth,(req,res)=>{
    const token = req.headers.authorization
    try {
        blacklist.push(token)
        res.send({msg:"User has been logout"})
    } catch (error) {
    res.send({msg: "error"})    
    }
    
})







app.listen(PORT,async()=>{

    try {
        await connection
        console.log(`server is running on port ${PORT} and db is also connected`)
    } catch (error) {
     console.log(error)   
    }
})