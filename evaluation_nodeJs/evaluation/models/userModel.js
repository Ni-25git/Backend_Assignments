const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    id:{type:String, required:true},
    username:{type:String, required:true},
    password:{type:String, required:true},
    enrolledcourse:{type:String, required:true},
},{
    versionKey: false
})

const UserModel = mongoose.model("user",userSchema)

module.exports=UserModel