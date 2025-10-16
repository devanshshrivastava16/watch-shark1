import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api, img } from "../services/tmdb.js";
import { useWatchlist } from "../hooks/useWatchlist.js"; // Use the reusable hook
import MovieCard from "../components/MovieCard.jsx";

// Import icons for buttons
import { FaPlay } from "react-icons/fa";
import { BsBookmarkPlus, BsBookmarkCheckFill } from "react-icons/bs";

export default function TvDetails() {
  const { id } = useParams();
  const [tvShow, setTvShow] = useState(null);
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
        const [tvRes, videosRes, recsRes, creditsRes] = await Promise.all([
          api.get(`/tv/${id}`),
          api.get(`/tv/${id}/videos`),
          api.get(`/tv/${id}/recommendations`),
          api.get(`/tv/${id}/credits`),
        ]);
        setTvShow(tvRes.data);
        setVideos(videosRes.data.results || []);
        setRecommendations(recsRes.data.results || []);
        setCredits(creditsRes.data);
      } catch (error) {
        console.error("Failed to fetch TV show details:", error);
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
  const creators = useMemo(
    () => tvShow?.created_by?.map((c) => c.name).join(", "),
    [tvShow]
  );
  const stars = useMemo(
    () =>
      credits?.cast
        .slice(0, 5)
        .map((p) => p.name)
        .join(", "),
    [credits]
  );
  const inWatchlist = has(tvShow?.id);

  if (loading)
    return <div className="loading-message">Loading TV show details...</div>;
  if (!tvShow) return <div className="error-message">TV Show not found.</div>;

  return (
    <div className="movie-details-page">
      {/* --- HERO BANNER SECTION --- */}
      <div
        className="detail-hero"
        style={{
          backgroundImage: `url(${img.original(tvShow.backdrop_path)})`,
        }}
      >
        <div className="detail-hero-overlay" />
        <div className="detail-content container">
          <div className="detail-poster">
            <img src={img.poster(tvShow.poster_path)} alt={tvShow.name} />
          </div>
          <div className="detail-info">
            <h1 className="detail-title">{tvShow.name}</h1>
            <div className="meta-info">
              <span>{tvShow.first_air_date?.slice(0, 4)}</span>
              <span>•</span>
              <span>
                {tvShow.number_of_seasons} Season
                {tvShow.number_of_seasons !== 1 ? "s" : ""}
              </span>
              <span>•</span>
              <span>{tvShow.genres?.map((g) => g.name).join(", ")}</span>
            </div>
            <p className="director-stars">
              <strong>Created by:</strong> {creators || "N/A"}
            </p>
            <p className="director-stars">
              <strong>Stars:</strong> {stars || "N/A"}
            </p>
            <p className="detail-overview">{tvShow.overview}</p>

            <div className="action-buttons">
              <Link
                to={`/watch/tv/${tvShow.id}`}
                className="action-btn watch-btn"
              >
                <FaPlay /> Watch Now
              </Link>
              <button
                className="action-btn add-btn"
                onClick={() =>
                  inWatchlist
                    ? remove(tvShow.id)
                    : add({ id: tvShow.id, type: "tv" })
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
