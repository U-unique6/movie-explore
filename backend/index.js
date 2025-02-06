// index.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Updated CORS configuration
app.use(
  cors({
    origin: "*",
    methods: ["GET"],
  })
);

// API Route to fetch movies
app.get("/api/movies", async (req, res) => {
  const options = {
    method: "GET",
    url: `https://${process.env.RAPIDAPI_HOST}/imdb/top250-movies`,
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      "x-rapidapi-host": process.env.RAPIDAPI_HOST,
    },
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error("API Error:", error.message);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});

// Development server (will only run locally)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

// Export for Vercel
module.exports = app;
