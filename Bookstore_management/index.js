const express = require("express")
const {connection} = require("./db")
const {bookRouter} = require("./routes/bookRouter")
const dotenv = require("dotenv").config()
const app = express()
const PORT = process.env.PORT;

app.use(express.json())
app.use("/",bookRouter)


app.get("/",(req,res)=>{
    res.send("WELCOME TO BOOKSTORE MANAGEMENT SYSTEM")
})





app.listen(PORT,async()=>{

    try {
        await connection
        console.log(`server is running on port ${PORT} and db is also connected`)
    } catch (error) {
     console.log(error)   
    }
})