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
        const token = jwt.sign({id : newUser._id , name: user.name, isAdmin}, "yoursecretkey", {expiresIn: "7d"});
        return res.status(201).json({ id: newUser._id , message: "User created successfully", token, name: newUser.name, isAdmin,email: newUser.email });

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
            { id: user._id , name: user.name , isAdmin: user.isAdmin},
            process.env.JWT_SECRET || "yoursecretkey",
            { expiresIn: "7d" }
        );
        console.log(user);
        return res.json({ id: user._id, token , name: user.name , isAdmin: user.isAdmin , email: user.email});

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
};

const editUser = async (req,res) => {
 try {   
    const {toChange} = req.body;
    if(toChange.password) {
        toChange.password = await bcrypt.hash(toChange.password,10);
    }
    const updatedUser = await User.findByIdAndUpdate(req.user.id,toChange,{
        new:true,
        runValidators:true
    })
    res.status(200).json({message:"Successful edit", updatedUser});
    } catch(e) {
        console.error(e);
        res.status(500).json({error: "Server error"});
    }
}; 

module.exports = { regUser, logUser, editUser };