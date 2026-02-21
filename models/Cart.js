const mongoose = require("mongoose")
const CartSchema = new mongoose.Schema({

    

}, { timestamps: true })

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;