const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const port = 5000;

app.use(cors());
app.use(express.json());
const userRoutes = require("./routes/routes");
const itemRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
app.use("/api/users", userRoutes);
app.use("/api/items",itemRoutes);
app.use("/api/orders",orderRoutes);
mongoose.connect("mongodb://localhost:27017/scheduler")
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.error(err);
    });
app.listen(port, () => {
    console.log(`SERVER ON PORT: ${port}`);
});