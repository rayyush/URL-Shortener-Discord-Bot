import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Url from "./models/Url.js";

dotenv.config();

const app = express();
const PORT = 7003;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/:shortId", async (req, res) => {
  const { shortId } = req.params;

  try {
    const foundUrl = await Url.findOne({ shortId });

    if (foundUrl) {
      return res.redirect(foundUrl.originalUrl);
    } else {
      return res.status(404).send("❌ Short URL not found.");
    }
  } catch (error) {
    console.error("Error fetching URL:", error);
    return res.status(500).send("❌ Internal Server Error.");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
