import { useEffect, useState } from "react";
import { api } from "../services/tmdb.js";
import { useWatchlist } from "../hooks/useWatchlist.js";
import MovieCard from "../components/MovieCard.jsx";
import { BsCollectionPlay } from "react-icons/bs";

export default function Watchlist() {
  const { items } = useWatchlist(); // Now gets an array of {id, type} objects
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only run if there are items in the watchlist
    if (items.length === 0) {
      setLoading(false);
      setContent([]);
      return;
    }

    const loadContent = async () => {
      setLoading(true);
      // Fetch each item using its specific type ('movie' or 'tv')
      const promises = items.map(
        (item) =>
          api
            .get(`/${item.type}/${item.id}`)
            .then((res) => res.data)
            .catch(() => null) // Return null if an item fails to load
      );

      const loadedItems = await Promise.all(promises);
      setContent(loadedItems.filter(Boolean)); // Filter out any nulls
      setLoading(false);
    };

    loadContent();
  }, [items]);

  if (loading) {
    return <div className="loading-message">Loading your watchlist...</div>;
  }

  if (content.length === 0) {
    return (
      <div className="empty-watchlist">
        <BsCollectionPlay size={80} />
        <h2>Your Watchlist is Empty</h2>
        <p>Add movies and shows to your watchlist to see them here.</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: "40px" }}>
      <h2 className="row-title">My Watchlist</h2>
      <div className="results-grid">
        {content.map((item) => (
          <MovieCard
            key={`${item.id}-${item.title || item.name}`}
            movie={item}
          />
        ))}
      </div>
    </div>
  );
}
