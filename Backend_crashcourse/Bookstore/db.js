const mongoose = require('mongoose')
const url =  "mongodb://127.0.0.1:27017/movieassignment"

const connectDb=async()=>{
try {
    await mongoose.connect(url)
    console.log("Connected to Db")
} catch (error) {
    console.log("failed to connect to db",error)
}
}

module.exports=connectDb