import { Link } from "react-router-dom";
import { img } from "../services/tmdb.js";
import { FaPlay } from "react-icons/fa6";

export default function Hero({ movie }) {
  // If no movie data is available, render a placeholder
  if (!movie) {
    return <div className="hero-placeholder"></div>;
  }

  // Find the primary production company to display (like 'Netflix')
  const mainProvider = movie.production_companies?.[0]?.name;

  return (
    <div
      className="hero"
      style={{ backgroundImage: `url(${img.original(movie.backdrop_path)})` }}
    >
      {/* Gradient overlay for text readability */}
      <div className="hero-gradient"></div>

      {/* Hero content */}
      <div className="hero-content container">
        <h1 className="hero-title">{movie.title || movie.name}</h1>

        {/* NEW Metadata section (Rating, Date, Provider) */}
        <div className="hero-meta">
          {movie.vote_average > 0 && (
            <span className="rating">{movie.vote_average.toFixed(1)}/10</span>
          )}
          <span className="date">
            {movie.release_date || movie.first_air_date}
          </span>
          {mainProvider && <span className="provider">{mainProvider}</span>}
        </div>

        <p className="hero-overview">{movie.overview}</p>

        {/* NEW Watch Now button */}
        <Link to={`/watch/movie/${movie.id}`} className="watch-now-btn">
          <FaPlay />
          <span>Watch Now</span>
        </Link>
      </div>
    </div>
  );
}
