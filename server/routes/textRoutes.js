const express = require('express');
const Text = require('../models/Text');
const router = express.Router();

router.get('/', async (req, res) => {
  const text = await Text.findOne();
  res.status(200).send(text);
});

router.post('/update', async (req, res) => {
  const { content } = req.body;
  let text = await Text.findOne();
  if (text) {
    text.content = content;
  } else {
    text = new Text({ content });
  }
  await text.save();
  res.status(200).send({ message: 'Text updated successfully!' });
});

module.exports = router;
