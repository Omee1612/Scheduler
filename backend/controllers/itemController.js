const Item = require("../models/item");

const addItem = async (req,res) => {
    try
    { 
    const name = req.body.name;
    const price =req.body.price;
    const imgURL = req.file.path;
    const newItem = new Item({name,price,imgURL});
    await newItem.save();
    return res.status(201).json({message: "Item added", newItem});
    } catch(e) {
        console.error(e);
        return res.status(400).json({e});
    }
}

const getItem = async(req,res) => {
    try {
    const items = await Item.find({});
    return res.status(200).json({message: "Retrieving products", items});
    } catch(e) {
        console.error(e);
        return res.status(401).json({e});
    }
}
module.exports = {addItem,getItem};