const Complaint = require("../models/complaint");

exports.saveComplaint = async (req,res) => {
   try
    { const {complaint,title} = req.body;
    const newComplaint = new Complaint({
        complaint,
        user: req.user.id,
        title
    });
    console.log(newComplaint);
    await newComplaint.save();
    return res.status(201).json({
        success: "Complaint created",
        newComplaint
    })
    } catch(e) {
        console.error(e);
        return res.status(500).json({
            error: "Server error while creating complaint"
        });
    }
}

exports.getComplaint = async (req,res) => {
    try {
        const {compID} = req.params;
        const findComplaint = await Complaint.findById(compID).populate("user");
        return res.status(200).json({
            success: "Complaint retrieved from DB/Backend",
            findComplaint 
        })
    } catch(e) {
        console.error(e);
        return res.status(500).json({
            error:"Server error retrieving complaint"
        })
    }
}

exports.getAllComps = async (req,res) => {
    try {
        const complaints = await Complaint.find({}).populate("user");
        return res.status(200).json({
            complaints,
            success: "Complaints retrieved"
        })
    } catch(e) {
        console.error(e);
        return res.json({
            error: "Server error from complaints"
        })
    }
}
exports.getSelfComplaints = async(req,res) => {
    try {
        const complaints = await Complaint.find({user: req.user.id}).populate("user");
        return res.status(200).json({
            complaints,
        })
    } catch(e) {
        console.error(e);
         return res.json({
            error: "Server error from complaints"
        })
    }
}