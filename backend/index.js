const axios = require("axios");

// CORS handling
const allowCors = (fn) => async (req, res) => {
  // Set CORS headers to allow cross-origin requests
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allows all origins, or set to a specific domain if needed
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS"); // Allow GET and OPTIONS methods
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, x-rapidapi-key, x-rapidapi-host"
  ); // Allow custom headers

  // Handle pre-flight request (OPTIONS request)
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // Call the original function
  return fn(req, res);
};

const fetchMovies = async (req, res) => {
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
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
};

// Wrap the movie fetch function with CORS
module.exports = allowCors(fetchMovies);
