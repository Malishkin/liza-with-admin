const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const contentRoutes = require("./routes/contentRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/api/auth", authRoutes);
app.use("/api", contentRoutes);
app.use("/api/about", aboutRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
