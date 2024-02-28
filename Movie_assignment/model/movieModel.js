const mongoose = require("mongoose")


const movieSchema = mongoose.Schema({
    title:{type:String, required:true},
    rating:{type:Number, required:true}
},{
    versionKey:false
})


const MovieModel = mongoose.model("movie",movieSchema)


module.exports={
    MovieModel
}