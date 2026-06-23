import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import socket from "../socket";

const ChatBox = () => {
    const {user} = useAuth();
    const {complaintId} = useParams();
    const [messages,setMessages] = useState([]);
    const [input, setInput] = useState("")
    const bottomRef = useRef(null);
    const handleSend = async () => {
    if (!input.trim()) return
    try {
        await axios.post("/api/chat/sendM", {
            complaintId,
            message: input
        }, {
            headers: { Authorization: `Bearer ${user?.token}` }
        })
        console.log(` Complaint: ${input}`,

        )
        setInput("")
    } catch(e) {
        console.error(e)
    }
}
    useEffect(() => {
        
        const retrieveTexts = async () => {
            try {
            const res = await axios.get(`/api/chat/getM/${complaintId}`,{
                headers: {
                    Authorization: `Bearer ${user?.token}`
                }
            })
        setMessages(res.data.messages);
            } catch(e) {
                console.error(e);
            }
        };
        retrieveTexts();
        socket.emit("joinRoom", complaintId);
        console.log("joined room:", complaintId);
         socket.on("receiveMessage", (newMessage) => {
             console.log("received message:", newMessage)
        setMessages(prev => [...prev, newMessage])
    })

    // cleanup
    return () => {
        socket.off("receiveMessage")
    }
    },[complaintId]
)
useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
}, [messages])

   return (
    <div className="w-screen h-screen flex flex-col bg-gray-100">
        
        {/* Header */}
        <div className="bg-white shadow px-6 py-4">
            <h2 className="font-bold text-lg">Support Chat</h2>
            <p className="text-xs text-gray-400">Complaint #{complaintId}</p>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {messages.map((msg, i) => {
                const senderId = msg.sender?._id?.toString() || msg.sender?.toString()
                const isMine = senderId === user.id
                return (
                    <div key={i} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                        <div className={`px-4 py-2 rounded-2xl max-w-xs text-sm ${isMine ? "bg-blue-500 text-white" : "bg-white text-black shadow"}`}>
                            <p className="text-xs font-semibold mb-1 opacity-70">{msg.sender?.name}</p>
                            <p>{msg.text}</p>
                        </div>
                    </div>
                )
            })}
            <div ref={bottomRef}/>
        </div>

        {/* Input area */}
        <div className="bg-white px-4 py-3 flex gap-3 shadow-inner">
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button onClick={handleSend} className="bg-blue-500 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-600">
                Send
            </button>
        </div>
    </div>
)
}

export default ChatBox;