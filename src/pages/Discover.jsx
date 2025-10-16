import React, { useState, useEffect, useCallback } from "react";
import { api } from "../services/tmdb.js";
import FilterControls from "../components/FilterControls.jsx";
import ResultsGrid from "../components/ResultsGrid.jsx";

// Static genre list, now only for movies
const allMovieGenres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

export default function Discover() {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDiscoverData = useCallback(async () => {
    setLoading(true);
    setError(null);

    // Get genre IDs from selected genre names
    const genreIds = selectedGenres
      .map((name) => allMovieGenres.find((g) => g.name === name)?.id)
      .filter(Boolean)
      .join(",");

    try {
      // API call is now simplified to only discover movies
      const { data } = await api.get(`/discover/movie`, {
        params: {
          sort_by: "popularity.desc",
          with_genres: genreIds || undefined,
        },
      });
      setResults(data.results);
    } catch (err) {
      console.error("Failed to fetch discover data:", err);
      setError("Failed to load results. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [selectedGenres]);

  // This useEffect now automatically runs whenever genres change
  useEffect(() => {
    fetchDiscoverData();
  }, [fetchDiscoverData]);

  const handleGenreToggle = (genreName) => {
    setSelectedGenres((prev) =>
      prev.includes(genreName)
        ? prev.filter((g) => g !== genreName)
        : [...prev, genreName]
    );
  };

  return (
    <div className="discover-page container">
      <FilterControls
        genres={allMovieGenres.map((g) => g.name)}
        selectedGenres={selectedGenres}
        onGenreToggle={handleGenreToggle}
      />
      {loading && <p className="loading-message">Loading results...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && <ResultsGrid results={results} />}
    </div>
  );
}
