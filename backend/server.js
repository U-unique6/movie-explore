// backend/app.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

// CORS configuration
const corsOptions = {
  origin: "https://movie-explore-theta.vercel.app", // Replace with your frontend's deployed URL
  methods: ["GET"],
};
app.use(cors(corsOptions));

// Fetch movies from RapidAPI
app.get("/movies", async (req, res) => {
  const options = {
    method: "GET",
    url: `https://${process.env.RAPIDAPI_HOST}/imdb/top250-movies`, // API endpoint for movies
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY, // Set your RapidAPI key
      "x-rapidapi-host": process.env.RAPIDAPI_HOST, // Set your RapidAPI host
    },
  };

  try {
    const response = await axios.request(options);
    res.json(response.data); // Send the fetched data as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch movies" }); // Handle errors
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});

module.exports = app;
