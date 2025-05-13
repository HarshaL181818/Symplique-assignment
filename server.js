require("dotenv").config({ path: "./.env" });
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Message Schema
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  message: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
}, {
  timestamps: true,
});

const Message = mongoose.model('Message', messageSchema);

// Route to save message
app.post("/save-message", (req, res) => {
  const { message, date, time } = req.body;

  console.log("Message received:");
  console.log("Message:", message);
  console.log("Date:", date);
  console.log("Time:", time);

  const newMessage = new Message({
    message,
    date,
    time,
  });

  newMessage.save()
    .then(() => {
      console.log("✅ Message saved successfully!");
      res.status(200).json({ status: "message-saved" });
    })
    .catch((err) => {
      console.error("❌ Error saving message:", err);
      res.status(500).json({ status: "error", error: "Failed to save message" });
    });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running on port: ${port}`);
});
