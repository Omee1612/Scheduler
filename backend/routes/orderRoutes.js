const express = require("express");
const router = express.Router();
const middleware = require("../middleware/auth");
const orderController = require("../controllers/orderController");

router.post("/orderlist",middleware.verifyTok,orderController.sendOrder);
router.post("/payment",middleware.verifyTok,orderController.paymentBkash);
router.get("/orderget",middleware.verifyTok,middleware.verifyTokAdmin,orderController.getOrders);
module.exports = router;