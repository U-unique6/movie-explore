import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieLoading from "./movie-loading";
import MovieEmpty from "./empty-state";
import { X } from "lucide-react";

const TopMovies = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("latest");
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/movies");
        setMovies(response.data);
        setFilteredMovies(response.data);
      } catch (err) {
        setError("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filtered = movies.filter((movie) =>
      movie.primaryTitle.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  const handleSortChange = (e) => {
    const option = e.target.value;
    setSortOption(option);

    let sortedMovies;
    if (option === "latest") {
      sortedMovies = [...filteredMovies].sort(
        (a, b) => b.startYear - a.startYear
      );
    } else if (option === "rating") {
      sortedMovies = [...filteredMovies].sort(
        (a, b) => b.averageRating - a.averageRating
      );
    }
    setFilteredMovies(sortedMovies);
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  if (loading) return <MovieLoading />;
  if (error) return <MovieEmpty />;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Movie Explore</h1>

      {/* Search Bar */}
      <div className="mb-6 flex justify-center items-center gap-3 align-middle">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search movies by title"
          className="px-4 py-2 border rounded-md w-1/2"
        />

        {/* Sort Dropdown */}
        <div className="flex justify-center">
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="latest">Sort by Latest</option>
            <option value="rating">Sort by Rating</option>
          </select>
        </div>
      </div>

      {/* Movie List or Empty State */}
      {filteredMovies.length === 0 ? (
        <MovieEmpty />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
              onClick={() => handleMovieClick(movie)}
            >
              <img
                src={movie.primaryImage}
                alt={movie.primaryTitle}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{movie.primaryTitle}</h3>
                <p className="text-gray-600 mt-2">
                  Rating: {movie.averageRating}
                </p>
                <p className="text-gray-600 mt-1">Year: {movie.startYear}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedMovie && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full relative">
            <button
              className="absolute top-0 right-1 text-lg font-bold"
              onClick={closeModal}
            >
              <X />
            </button>
            <div className="text-center">
              <img
                src={selectedMovie.primaryImage}
                alt={selectedMovie.primaryTitle}
                className="w-full h-64 object-cover mb-4"
              />
              <div className="p-4 flex flex-col items-center text-center">
                <h3 className="text-lg font-semibold min-h-[40px]">
                  {selectedMovie.primaryTitle}
                </h3>
                <p className="text-gray-600 mt-2 min-h-[24px]">
                  Rating: {selectedMovie.averageRating}
                </p>
                <p className="text-gray-600 mt-1 min-h-[24px]">
                  Year: {selectedMovie.startYear}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopMovies;
