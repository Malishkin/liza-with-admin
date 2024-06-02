const express = require("express");
const multer = require("multer");
const About = require("../models/About");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Получение данных страницы About (без авторизации)
router.get("/", async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Обновление данных страницы About (требуется авторизация)
router.post("/", [auth, upload.single("image")], async (req, res) => {
  const { text } = req.body;
  const image = req.file ? `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}` : null;

  try {
    let about = await About.findOne();
    if (!about) {
      about = new About({ text, image });
    } else {
      about.text = text;
      if (image) {
        about.image = image;
      }
    }
    await about.save();
    res.json(about);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
