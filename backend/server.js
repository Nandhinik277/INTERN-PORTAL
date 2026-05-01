/* global require, process */

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const internshipRoutes = require("./routes/internshipRoutes");
const { protect } = require("./middleware/authMiddleware");
const applicationRoutes = require("./routes/applicationRoutes");  

const app = express();

/* ---------------- MIDDLEWARE ---------------- */
app.use(cors());
app.use(express.json());

/* ---------------- ROUTES ---------------- */

// Basic route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Auth routes
app.use("/api/auth", authRoutes);

// Internship routes
app.use("/api/internships", internshipRoutes);
app.use("/api/applications", applicationRoutes);
// Protected test route
app.get("/api/test", protect, (req, res) => {
  res.json({
    message: "Protected route accessed ✅",
    user: req.user,
  });
});

/* ---------------- DATABASE CONNECTION ---------------- */
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));