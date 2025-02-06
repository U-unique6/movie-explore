const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors()); // Allow cross-origin requests

const PORT = process.env.PORT || 3000; 


app.get("/api/movies", async (req, res) => {
  console.log("hello");
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
    console.error(error);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
