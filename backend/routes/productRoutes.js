const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const itemMiddleware = require("../middleware/auth");
const {upload} = require("../config/cloudinary");
router.post("/addp",itemMiddleware.verifyTok,itemMiddleware.verifyTokAdmin,upload.single("image"),itemController.addItem);
router.get("/getp",itemMiddleware.verifyTok,itemController.getItem);

module.exports = router;