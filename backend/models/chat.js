const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    complaint: { type: mongoose.Schema.Types.ObjectId, ref: "Complaint", required: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    messages: [{
        text: { type: String, required: true },
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        senderName: String,
        sentAt: { type: Date, default: Date.now }
    }]
}, { timestamps: true })

module.exports = mongoose.model("chat",chatSchema);