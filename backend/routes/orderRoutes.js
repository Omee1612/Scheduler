const express = require("express");
const router = express.Router();
const middleware = require("../middleware/auth");
const orderController = require("../controllers/orderController");

router.post("/orderlist",middleware.verifyTok,orderController.sendOrder);
router.post("/payment",middleware.verifyTok,orderController.paymentBkash);
router.post("/success/:itemId",orderController.successOrder);
router.post("/failed/:itemId",orderController.failOrder);
router.get("/orderget",middleware.verifyTok,middleware.verifyTokAdmin,orderController.getOrders);
router.get("/selforder",middleware.verifyTok,orderController.selfOrder);
module.exports = router;