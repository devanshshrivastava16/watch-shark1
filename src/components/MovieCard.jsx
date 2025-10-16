import { Link } from "react-router-dom";
import { img } from "../services/tmdb";

export default function MovieCard({ movie }) {
  // Construct the poster image URL using the helper from tmdb.js
  const poster = img.poster(movie.poster_path, 342);
  const title = movie.title || movie.name;

  // Dynamically determine if the item is a movie or TV show to create the correct link.
  // This is crucial for the Discover and Search pages.
  const mediaType = movie.media_type || (movie.title ? "movie" : "tv");
  const linkTo = `/${mediaType}/${movie.id}`;

  return (
    <Link to={linkTo} title={title} className="movie-card">
      {poster ? (
        <img src={poster} alt={title} loading="lazy" />
      ) : (
        // Display a styled placeholder if no poster image is available
        <div className="placeholder-card" />
      )}
    </Link>
  );
}
