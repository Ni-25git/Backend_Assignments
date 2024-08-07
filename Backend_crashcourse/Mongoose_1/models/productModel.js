const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {type: String , required: true},
    price: {type: Number , required: true},
    brand: {type: String , required: true},
    stock: {type: String , required: true},
},{versionKey: false})

const ProductModel = mongoose.model("product",productSchema)

module.exports = ProductModel