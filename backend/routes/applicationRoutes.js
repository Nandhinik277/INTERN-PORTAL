const express = require("express");
const router = express.Router();
const Application = require("../models/Application");
const Internship = require("../models/Internship");
const { protect, authorize } = require("../middleware/authMiddleware");


// ===============================
// APPLY INTERNSHIP (Student Only)
// ===============================
router.post("/:internshipId", protect, authorize("student"), async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.internshipId);

    if (!internship) {
      return res.status(404).json({ message: "Internship not found" });
    }

    // Check duplicate application
    const existingApplication = await Application.findOne({
      internship: req.params.internshipId,
      student: req.user._id,
    });

    if (existingApplication) {
      return res.status(400).json({ message: "Already applied!" });
    }

    const application = await Application.create({
      internship: req.params.internshipId,
      student: req.user._id,
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// =======================================
// COMPANY VIEW APPLICATIONS (Company Only)
// =======================================
router.get("/company", protect, authorize("company"), async (req, res) => {
  try {
    // Find internships posted by this company
    const internships = await Internship.find({ postedBy: req.user._id });

    const internshipIds = internships.map((i) => i._id);

    const applications = await Application.find({
      internship: { $in: internshipIds },
    })
      .populate("internship", "title company")
      .populate("student", "name email");

    res.json(applications);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// =======================================
// UPDATE APPLICATION STATUS (Company Only)
// =======================================
router.put("/:applicationId", protect, authorize("company"), async (req, res) => {
  try {
    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const application = await Application.findById(req.params.applicationId)
      .populate("internship");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Check if this internship belongs to this company
    if (application.internship.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    application.status = status;
    await application.save();

    res.json(application);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;