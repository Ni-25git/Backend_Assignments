const mongoose = require("mongoose")

const movieSchema = mongoose.Schema({
    title:String,
    year:String,
    rating:String,
    userid:String,
    pass:String
},{
    versionKey:false
})

const MovieModel = mongoose.model("movie",movieSchema)

module.exports={
    MovieModel
}