const mongoose = require("mongoose")

const bookSchema = mongoose.Schema({
    title: {type:String,required:true},
    author: {type:String,required:true},
    ISBN : {type:Number,required:true},
},{
    versionKey:false
})

const BookModel = mongoose.model("book",bookSchema)

module.exports={BookModel}