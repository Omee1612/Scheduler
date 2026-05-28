const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const middleware = require("../middleware/auth");
const {upload} = require("../config/cloudinary");
// public routes
router.post("/register", userController.regUser);
router.post("/login", userController.logUser);

// protected example route
router.get("/profile", middleware.verifyTok, (req, res) => {
    res.json({ userId: req.user.id });
});

module.exports = router;