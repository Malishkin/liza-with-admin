const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("About", AboutSchema);
