const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
    complaint: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    time: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Complaint",complaintSchema);