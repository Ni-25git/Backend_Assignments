const mongoose = require('mongoose')
const url ="mongodb://127.0.0.1:27017/onlinecourse"

const connectDb=async()=>{
    try {
        await mongoose.connect(url)
        console.log("connected to db")
    } catch (error) {
        console.log("failed to connect too db", error)
    }
}

module.exports= connectDb