const express = require("express");
const multer = require("multer");
const Content = require("../models/Content");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    const content = await Content.find();
    res.json(content);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/", [auth, upload.array("images")], async (req, res) => {
  const { category, description } = req.body;
  const images = req.files.map(
    (file) => `data:${file.mimetype};base64,${file.buffer.toString("base64")}`
  );

  try {
    const content = new Content({ category, description, images });
    await content.save();
    res.json(content);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await Content.findByIdAndDelete(req.params.id);
    res.json({ msg: "Content deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
