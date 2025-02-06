// api/movies.js
const axios = require("axios");
import Cors from "cors";

// Initialize CORS middleware
const cors = Cors({
  methods: ["GET", "HEAD"],
  // Set origin to your frontend domain
  origin: `${process.env}.https://movie-explore-app.vercel.app` || "*", // e.g., "https://your-frontend-domain.com"
  credentials: true,
});

// Helper function to run middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  // Run the CORS middleware
  await runMiddleware(req, res, cors);

  // Set additional CORS headers for safety
  res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_URL || "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

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
    return res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch movies" });
  }
}
