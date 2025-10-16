import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { api } from "../services/tmdb.js";
import MovieCard from "../components/MovieCard.jsx";

// Import icons for better UI feedback
import { FaSearch } from "react-icons/fa";
import { BiErrorCircle } from "react-icons/bi";

export default function Search() {
  const { search } = useLocation();
  const query = useMemo(
    () => new URLSearchParams(search).get("q") || "",
    [search]
  );

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await api.get("/search/multi", {
          params: { query, include_adult: false },
        });

        // Filter out results that are not movies or TV shows
        const filteredResults =
          data.results?.filter(
            (item) => item.media_type === "movie" || item.media_type === "tv"
          ) || [];
        setResults(filteredResults);
      } catch (err) {
        console.error("Failed to fetch search results:", err);
        setError("Something went wrong. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  // Initial state: No search query entered
  if (!query) {
    return (
      <div className="search-prompt">
        <FaSearch size={80} />
        <h2>Find Your Next Favorite</h2>
        <p>Search for movies and TV shows to get started.</p>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return <div className="loading-message">Searching for "{query}"...</div>;
  }

  // Error state
  if (error) {
    return (
      <div className="search-prompt error">
        <BiErrorCircle size={80} />
        <h2>Oops!</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: "40px" }}>
      <h2 className="row-title">Results for "{query}"</h2>

      {results.length === 0 ? (
        // No results state
        <div className="search-prompt">
          <h3>No results found.</h3>
          <p>Try searching for something else.</p>
        </div>
      ) : (
        // Display results in a grid
        <div className="results-grid">
          {results.map((item) => (
            <MovieCard key={item.id} movie={item} />
          ))}
        </div>
      )}
    </div>
  );
}
