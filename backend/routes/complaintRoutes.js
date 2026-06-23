const express = require("express");
const router = express.Router();
const complaintController = require("../controllers/complaintController");
const auth = require("../middleware/auth");
router.post("/complaints",auth.verifyTok,complaintController.saveComplaint);
router.get("/complaints/:compID",auth.verifyTok,complaintController.getComplaint);
router.get("/complaints",auth.verifyTok,auth.verifyTokAdmin,complaintController.getAllComps);
router.get("/selfcomp",auth.verifyTok,complaintController.getSelfComplaints);
module.exports = router;