const chatController = require("../controllers/chatController");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/sendM",auth.verifyTok,chatController.sendMessage);
router.get("/getM/:complaintId",auth.verifyTok,chatController.getMessages);

module.exports = router;