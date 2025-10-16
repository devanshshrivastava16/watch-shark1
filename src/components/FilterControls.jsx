import React from "react";

export default function FilterControls({
  genres,
  selectedGenres,
  onGenreToggle,
}) {
  return (
    <div className="filter-controls-container">
      <div className="filter-group">
        <label className="filter-label">Select Genres:</label>
        <div className="genre-list">
          {genres.map((genre) => (
            <button
              key={genre}
              className={`genre-button ${
                selectedGenres.includes(genre) ? "active-genre" : ""
              }`}
              onClick={() => onGenreToggle(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
