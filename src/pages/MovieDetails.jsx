import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api, img } from "../services/tmdb";
import { useWatchlist } from "../hooks/useWatchlist"; // Import the new hook
import MovieCard from "../components/MovieCard";

// Import icons for buttons
import { FaPlay } from "react-icons/fa";
import { BsBookmarkPlus, BsBookmarkCheckFill } from "react-icons/bs";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [videos, setVideos] = useState([]);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const { has, add, remove } = useWatchlist();

  useEffect(() => {
    // Scroll to top when the page loads
    window.scrollTo(0, 0);

    const loadData = async () => {
      setLoading(true);
      try {
        const [movieRes, videosRes, recsRes, creditsRes] = await Promise.all([
          api.get(`/movie/${id}`),
          api.get(`/movie/${id}/videos`),
          api.get(`/movie/${id}/recommendations`),
          api.get(`/movie/${id}/credits`),
        ]);
        setMovie(movieRes.data);
        setVideos(videosRes.data.results || []);
        setRecommendations(recsRes.data.results || []);
        setCredits(creditsRes.data);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const trailer = useMemo(
    () => videos.find((v) => v.type === "Trailer" && v.site === "YouTube"),
    [videos]
  );
  const director = useMemo(
    () => credits?.crew.find((p) => p.job === "Director")?.name,
    [credits]
  );
  const stars = useMemo(
    () =>
      credits?.cast
        .slice(0, 5)
        .map((p) => p.name)
        .join(", "),
    [credits]
  );
  const inWatchlist = has(movie?.id);

  if (loading)
    return <div className="loading-message">Loading movie details...</div>;
  if (!movie) return <div className="error-message">Movie not found.</div>;

  return (
    <div className="movie-details-page">
      {/* --- HERO BANNER SECTION --- */}
      <div
        className="detail-hero"
        style={{ backgroundImage: `url(${img.original(movie.backdrop_path)})` }}
      >
        <div className="detail-hero-overlay" />
        <div className="detail-content container">
          <div className="detail-poster">
            <img src={img.poster(movie.poster_path)} alt={movie.title} />
          </div>
          <div className="detail-info">
            <h1 className="detail-title">{movie.title}</h1>
            <div className="meta-info">
              <span>{movie.release_date?.slice(0, 4)}</span>
              <span>•</span>
              <span>{movie.runtime} min</span>
              <span>•</span>
              <span>{movie.genres?.map((g) => g.name).join(", ")}</span>
            </div>
            <p className="director-stars">
              <strong>Director:</strong> {director || "N/A"}
            </p>
            <p className="director-stars">
              <strong>Stars:</strong> {stars || "N/A"}
            </p>
            <p className="detail-overview">{movie.overview}</p>

            <div className="action-buttons">
              <Link
                to={`/watch/movie/${movie.id}`}
                className="action-btn watch-btn"
              >
                <FaPlay /> Watch Now
              </Link>
              <button
                className="action-btn add-btn"
                onClick={() =>
                  inWatchlist
                    ? remove(movie.id)
                    : add({ id: movie.id, type: "movie" })
                }
              >
                {inWatchlist ? <BsBookmarkCheckFill /> : <BsBookmarkPlus />}
                {inWatchlist ? "In Watchlist" : "Add to Watchlist"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- TRAILER SECTION --- */}
      {trailer && (
        <div className="detail-section container">
          <h2>Trailer</h2>
          <div className="trailer-container">
            <iframe
              className="trailer-iframe"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* --- RECOMMENDATIONS SECTION --- */}
      {recommendations.length > 0 && (
        <div className="detail-section container">
          <h2>You Might Also Like</h2>
          <div className="recommendations-grid">
            {recommendations.slice(0, 12).map((rec) => (
              <MovieCard key={rec.id} movie={rec} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
