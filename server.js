
require("dotenv").config({path: "./.env"})
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { time } = require("console");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

app.post("/save-message", (req, res) => {
  const {message, date, time } = req.body;

  console.log("Message received:");
  console.log("Message:", message);
  console.log("Date:", date);
  console.log("Time:", time);

  res.status(200).json({ status: "message-sent" });
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
