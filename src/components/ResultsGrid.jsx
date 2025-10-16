import React from "react";
import MovieCard from "./MovieCard";

export default function ResultsGrid({ results }) {
  if (!results || results.length === 0) {
    return (
      <p className="no-results">
        No results found. Try adjusting your filters.
      </p>
    );
  }

  return (
    <div className="results-grid">
      {results.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
