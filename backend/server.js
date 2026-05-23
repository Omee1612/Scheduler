const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const port = 5000;
app.use(cors());
app.use(express.json());
app.listen(port, () => {
    console.log(`SERVER ON PORT: ${port}`);
});
mongoose.connect("mongodb://localhost:27017/scheduler").then(() => {
    console.log("MongoDB connected");
})
