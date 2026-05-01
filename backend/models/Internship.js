const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  company: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  duration: {
    type: String,
    required: true,
  },

  stipend: {
    type: Number,   // IMPORTANT → Number
    default: 0,
  },

  start: {
    type: String,
  },

  category: {
    type: String,
    required: true,
  },

  type: {
    type: String,   // "Full Time" or "Part Time"
    required: true,
  },

  postedAt: {
    type: Date,
    default: Date.now,
  },
postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Internship", internshipSchema);