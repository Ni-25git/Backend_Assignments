const express = require("express");
const { connection } = require("./db")
const {userRouter} = require("./routes/userRoutes")
const {postRouter} = require("./routes/postRoutes")
const {auth} = require("./middlewares/auth.middleware")
const dotenv = require("dotenv").config();
const app = express();

const PORT= process.env.PORT

app.use(express.json())
app.use("/users",userRouter)
app.use("/post",auth, postRouter)

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