const express = require('express');
const connectDb = require('./db');
const courseRouter = require('./routes/courseRouter');
const userRouter = require('./routes/userRouter');
const app = express();
const PORT = 4500;

app.use("/user",userRouter)
app.use("/course",courseRouter)
app.use(express.json())



app.get("/", (req,res)=>{
    res.send("welcome to server")
})






app.listen(PORT, async()=>{
    try {
        await connectDb()
        console.log(`server is listening on ${PORT}`)
    } catch (error) {
        console.log(error)
    }
    
})