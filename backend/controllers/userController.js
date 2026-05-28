const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const regUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ error: "Missing fields" });
        }

        const existingUser = await User.findOne({ email });
        const existingName = await User.findOne({name});
        if(existingName) {
            return res.status(400).json({error: "Username already exists"});
        }
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }

        const hashedPass = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPass,
            isAdmin: false
        });

        await newUser.save();
        console.log("new user:", newUser);
        const isAdmin = newUser.isAdmin ?? false;
        const token = jwt.sign({id : newUser._id , isAdmin}, "yoursecretkey", {expiresIn: "7d"});
        return res.status(201).json({ message: "User created successfully", token, name: newUser.name, isAdmin });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
};

const logUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = jwt.sign(
            { id: user._id , isAdmin: user.isAdmin},
            process.env.JWT_SECRET || "yoursecretkey",
            { expiresIn: "7d" }
        );
        console.log(user);
        return res.json({ token , name: user.name , isAdmin: user.isAdmin});

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
};

module.exports = { regUser, logUser };