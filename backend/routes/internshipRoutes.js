const express = require("express");
const router = express.Router();
const Internship = require("../models/Internship");

/* =========================================
   GET all internships (with filter support)
   Example:
   /api/internships?category=Marketing
   /api/internships?category=Work from Home
========================================= */
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;

    let filter = {};

    if (category) {
      if (category === "Work from Home") {
        filter.location = "Remote";
      } else {
        filter.category = category;
      }
    }

    const internships = await Internship.find(filter);
    res.json(internships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* =========================================
   ADD new internship
========================================= */
router.post("/", async (req, res) => {
  try {
    const newInternship = new Internship(req.body);
    await newInternship.save();
    res.status(201).json(newInternship);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/* =========================================
   DELETE internship
========================================= */
router.delete("/:id", async (req, res) => {
  try {
    await Internship.findByIdAndDelete(req.params.id);
    res.json({ message: "Internship deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* =========================================
   SEED DATA (RUN ONCE)
   /api/internships/seed
========================================= */
router.get("/seed", async (req, res) => {
  try {
    await Internship.deleteMany();

    const sampleData = [
      {
        title: "Frontend Developer Intern",
        company: "Tech Solutions",
        location: "Remote",
        duration: "3 Months",
        stipend: 8000,
        category: "Engineering",
        type: "Full Time",
      },
      {
        title: "Backend Developer Intern",
        company: "CodeCraft",
        location: "Bangalore",
        duration: "6 Months",
        stipend: 10000,
        category: "Engineering",
        type: "Full Time",
      },
      {
        title: "Data Science Intern",
        company: "Data Minds",
        location: "Remote",
        duration: "4 Months",
        stipend: 12000,
        category: "Data Science",
        type: "Full Time",
      },
      {
        title: "Marketing Intern",
        company: "BrandBoost",
        location: "Onsite",
        duration: "3 Months",
        stipend: 7000,
        category: "Marketing",
        type: "Part Time",
      },
      {
        title: "UI/UX Designer Intern",
        company: "Creative Studio",
        location: "Chennai",
        duration: "3 Months",
        stipend: 6000,
        category: "Design",
        type: "Part Time",
      },
      {
        title: "HR Intern",
        company: "PeopleFirst",
        location: "Chennai",
        duration: "2 Months",
        stipend: 5000,
        category: "Human Resources",
        type: "Part Time",
      },
      {
        title: "Software Engineer Intern",
        company: "NextGen Tech",
        location: "Hyderabad",
        duration: "6 Months",
        stipend: 15000,
        category: "Engineering",
        type: "Full Time",
      },
      {
        title: "Business Analyst Intern",
        company: "Insight Corp",
        location: "Mumbai",
        duration: "4 Months",
        stipend: 11000,
        category: "Business",
        type: "Full Time",
      }
    ];

    await Internship.insertMany(sampleData);

    res.json({ message: "Internships seeded successfully ✅" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


/* =========================================
   GET single internship by ID
========================================= */
router.get("/:id", async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);

    if (!internship) {
      return res.status(404).json({ message: "Internship not found" });
    }

    res.json(internship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;