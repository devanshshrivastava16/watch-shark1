import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // You may need to install react-icons: npm install react-icons

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent the form from reloading the page
    if (query.trim()) {
      // Only search if the query isn't empty
      navigate(`/search?q=${query}`);
      setQuery(""); // Optional: Clear the search bar after searching
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        type="text"
        className="search-input"
        placeholder="Search for movies or shows..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="search-button">
        <FaSearch />
      </button>
    </form>
  );
}
