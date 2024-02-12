const express = require("express");
const { connection } = require("./db")
const {userRouter} = require("./routes/userRoutes")
const {noteRouter} = require("./routes/noteRoutes")
const dotenv = require("dotenv").config();
const app = express();

const PORT= process.env.PORT

app.use(express.json())
app.use("/users",userRouter)
app.use("/note", noteRouter)

app.get("/",(req,res)=>{
    res.send("home page");
})





app.listen(PORT,async()=>{
    try {
        await connection
        console.log(`server is running on port ${PORT} and db is also connected`)
    } catch (error) {
        console.log(error)
    }
})