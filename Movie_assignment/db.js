const mongoose = require("mongoose")

const connection = mongoose.connect("mongodb+srv://nipunsehrawat25:nipun123@nipuncluster.liqt9xz.mongodb.net/movies?retryWrites=true&w=majority&appName=nipuncluster")

module.exports={
    connection
}