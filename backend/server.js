const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const http = require("node:http");
const { Server } = require("socket.io");
require("dotenv").config();
const port = 5000;

app.use(cors());
app.use(express.json());

// create server and io FIRST
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

// attach io to req BEFORE routes
app.use((req, res, next) => {
    req.io = io
    next()
})

// routes AFTER
const userRoutes = require("./routes/routes");
const itemRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const chatRoutes = require("./routes/chatRoutes");
app.use("/api/users", userRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cmps", complaintRoutes);
app.use("/api/chat", chatRoutes);

io.on("connection", (socket) => {
    console.log("User connected: ", socket.id);
    socket.on("joinRoom", (complaintId) => {
        socket.join(complaintId)
        console.log(`Socket ${socket.id} joined room ${complaintId}`)
    })
    socket.on("disconnect", () => {
        console.log("User disconnected: ", socket.id);
    });
})

mongoose.connect("mongodb://localhost:27017/scheduler")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));

server.listen(port, () => {
    console.log(`SERVER ON PORT: ${port}`);
});