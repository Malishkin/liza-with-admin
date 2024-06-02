const express = require("express");
const multer = require("multer");
const Image = require("../models/Image");
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.single("file"), async (req, res) => {
  const img = {
    filename: req.file.originalname,
    contentType: req.file.mimetype,
    imageBase64: req.file.buffer.toString("base64"),
  };

  const image = new Image(img);
  await image.save();
  res.status(201).send({ message: "Image uploaded successfully!" });
});

router.get("/", async (req, res) => {
  const images = await Image.find();
  res.status(200).send(images);
});

module.exports = router;
