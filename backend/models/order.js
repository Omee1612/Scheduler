const mongoose = require("mongoose");

const Order = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    address: {
        required: true,
        type: String
    },
    phone: {
        required: true,
        type: String
    },
    itemName: {
        required: true,
        type: String
    },
    itemPrice: {
        required: true,
        type: Number
    },
    currDate: {
        type: Date,
        default: Date.now
    },
    paymentmthd : {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Order",Order);