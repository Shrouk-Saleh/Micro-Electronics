const mongoose = require("mongoose")
const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock:String,

    

}, { timestamps: true })

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;