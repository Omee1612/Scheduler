const Order = require("../models/order");
const Item = require("../models/item");
const SSLCommerzPayment = require("sslcommerz-lts");
const { default: mongoose } = require("mongoose");
exports.sendOrder = async(req,res) => {
    try {
        const { name, address, phone, itemId, paymentmthd } = req.body;
        const item = await Item.findById(itemId);
        if (!item || !paymentmthd) 
        {
             console.log("req.body: ", req.body);
            return res.status(400).json({error: "One of the fields is empty"});
        }
        const newOrder = new Order({
            userId:req.user.id,
            name,
            address,
            phone,
            itemName: item.name,
            itemPrice: item.price,
            paymentmthd,
            itemId
        });
        await newOrder.save();
        console.log("saved order: ", newOrder.toObject());
        console.log("req.body: ", req.body);
        return res.status(200).json({message:"Order recorded" , newOrder});
    } catch(error) {
        console.error(error); 
        return res.status(500).json({error: "Server error from orders"});
    }
}
const {STORE_ID,STORE_PASS} = process.env
const isLive=false

exports.paymentBkash = async(req,res) => {
    try {
        const { name, address, phone, itemId, paymentmthd } = req.body;
        const item = await Item.findById(itemId);
        if (!item || !paymentmthd) 
        {
             console.log("req.body: ", req.body);
            return res.status(400).json({error: "One of the fields is empty"});
        }
        const newOrder = new Order({
            userId:req.user.id,
            name,
            address,
            phone,
            itemName: item.name,
            itemPrice: item.price,
            paymentmthd,
            itemId
        });
        await newOrder.save();
        console.log("saved order: ", newOrder.toObject());
        console.log("req.body: ", req.body);
        const data = {
        total_amount: item.price,
        currency: 'BDT',
        tran_id: itemId, // use unique tran_id for each api call
        success_url: `http://localhost:5000/api/orders/success/${itemId}`,
        fail_url: `http://localhost:5000/api/orders/failed/${itemId}`,
        cancel_url: 'http://localhost:5000/cancel',
        ipn_url: 'http://localhost:5000/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh'
        }
        const sslcz = new SSLCommerzPayment(STORE_ID, STORE_PASS, isLive)
        sslcz.init(data).then(apiResponse => {
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL
        res.json({success: true , url:GatewayPageURL});
        console.log('Redirecting to: ', GatewayPageURL)
    });
    } catch(err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" })
    }
}

exports.getOrders = async(req,res) => {
   try
    { 
    const orders = await Order.find({});
    return res.status(201).json({message: "Retrieved orders" , orders});
    } catch(e) {
        console.error(e);
        return res.status(400).json({e});
    }
    
}

exports.successOrder = async (req,res) => {
    try
    {   
    const {itemId} = req.params;
    const updatedItem = await Item.findByIdAndUpdate(itemId,{
        purchased: true
    })
    res.redirect("http://localhost:5173/cat");
    } catch (e)
    {
        console.error(e);
        return res.status(500).json({error: "server error"});
    }
}

exports.failOrder = async (req,res) => {
    try {
        const {itemId} = req.params;
        const deletion = await Order.deleteOne({itemId});
        return res.redirect("http://localhost:5173/payfail?from=sslcommerz");
    } catch (e) {
        console.error(e);
        return res.status(500).json(e);
    }
}

exports.selfOrder = async (req,res) => {
    try {
        const userId = req.user.id;
        const specificOrders = await Order.find({userId});
        return res.json({message:"Retrieving orders for the user," , specificOrders});
    } catch(e) {
        console.error(e);
        return res.status(500).json({message: "Server error"});
    }
}

exports.deleteOrder = async (req,res) => {
    try {
        const {orderId} = req.params;
        const deletedOrder = await Order.findByIdAndDelete(orderId);
        return res.json({message: "Successfully deleted", deletedOrder});
    } catch(e)  {
        console.error(e);
        return res.json({error: "Server error"});
    }
}