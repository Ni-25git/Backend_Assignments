const mongoose = require('mongoose')

const courseSchema = mongoose.Schema({
    id:{type:String, required:true},
    title:{type:String, required:true},
    category:{type:String, required:true},
    difficulty:{type:String, required:true},
    description:{type:String, required:true}
},{
    versionKey : false
})

const CourseModel = mongoose.model("course",courseSchema)

module.exports=CourseModel