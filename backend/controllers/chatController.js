const Chat = require("../models/chat");

exports.getMessages = async (req,res) => {
    try {
    const {complaintId} = req.params;
    const chat = await Chat.findOne({
        complaint: complaintId
    }).populate("messages.sender","name");
    return res.status(200).json({
        messages : chat?.messages || []
    });
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            error:"Server error retrieving messages"
        });
    }
}

exports.sendMessage = async (req,res) => {
    try{
        const {complaintId, message} = req.body;
        const sender = req.user.id;
        let chatRoom = await Chat.findOne({
            complaint: complaintId
        });
        if(!chatRoom) {
            chatRoom = new Chat({
                complaint: complaintId, messages: []
            });
        }
        chatRoom.messages.push({
            text: message,
            sender,
            sentAt: new Date()
        });
        await chatRoom.save();
        req.io.to(complaintId).emit("receiveMessage",{
            text: message,
            sender: { _id: sender, name: req.user.name }, 
            sentAt: new Date()
        })
        console.log("emitted to room:", complaintId);
        return res.status(201).json({
            chatRoom
        });
    } catch(e) {
        console.error(e);
        return res.json({error: "Server error while sending text"});
    }
}