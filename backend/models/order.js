const mongoose = require("mongoose");

const Order = new mongoose.Schema({
    userId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId
    },
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
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
    }
})

module.exports = mongoose.model("Order",Order);