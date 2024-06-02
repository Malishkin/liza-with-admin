const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  category: { type: String, required: true },
  images: [{ type: String }],
  description: { type: String },
});

module.exports = mongoose.model("Content", contentSchema);
