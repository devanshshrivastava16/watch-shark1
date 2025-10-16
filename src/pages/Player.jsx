import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/tmdb";
import CastMember from "../components/CastMember.jsx";

export default function Player() {
  const { type, id, season: seasonParam, episode: episodeParam } = useParams();
  const navigate = useNavigate();

  const [details, setDetails] = useState(null);
  const [credits, setCredits] = useState(null);
  const [selectedServer, setSelectedServer] = useState("vidsrc"); // Default server
  const [embedUrl, setEmbedUrl] = useState("");

  const [selectedSeason, setSelectedSeason] = useState(
    Number(seasonParam) || 1
  );
  const [selectedEpisode, setSelectedEpisode] = useState(
    Number(episodeParam) || 1
  );

  // Fetch all media details and credits when the component loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [detailsRes, creditsRes] = await Promise.all([
          api.get(`/${type}/${id}`),
          api.get(`/${type}/${id}/credits`),
        ]);
        setDetails(detailsRes.data);
        setCredits(creditsRes.data);
      } catch (error) {
        console.error("Failed to fetch media details:", error);
        setDetails(null); // Clear details on error
      }
    };
    fetchData();
  }, [type, id]);

  // This useEffect now correctly constructs the URL based on the selected server
  useEffect(() => {
    let url = "";
    if (selectedServer === "vidsrc2") {
      if (type === "movie") {
        url = `https://vidsrc.xyz/embed/movie?tmdb=${id}`;
      } else {
        url = `https://vidsrc.xyz/embed/tv?tmdb=${id}&season=${selectedSeason}&episode=${selectedEpisode}`;
      }
    } else if (selectedServer === "2embed") {
      if (type === "movie") {
        url = `https://www.2embed.cc/embed/${id}`;
      } else {
        url = `https://www.2embed.cc/embedtv/${id}&s=${selectedSeason}&e=${selectedEpisode}`;
      }
    } else if (selectedServer === "vidsrc") {
      // New Vidsrc Server
      if (type === "movie") {
        url = `https://vidsrc.cc/v2/embed/movie/${id}`;
      } else {
        url = `https://vidsrc.cc/v2/embed/tv/${id}/${selectedSeason}/${selectedEpisode}`;
      }
    } else if (selectedServer === "autoembed") {
      // New AutoEmbed Server
      if (type === "movie") {
        url = `https://player.autoembed.cc/embed/movie/${id}`;
      } else {
        url = `https://player.autoembed.cc/embed/tv/${id}/${selectedSeason}/${selectedEpisode}`;
      }
    }
    setEmbedUrl(url);

    // Update the browser URL without reloading the page
    if (type === "tv") {
      navigate(`/watch/${type}/${id}/${selectedSeason}/${selectedEpisode}`, {
        replace: true,
      });
    }
  }, [type, id, selectedServer, selectedSeason, selectedEpisode, navigate]);

  if (!details) {
    return <div className="loading-message">Loading player...</div>;
  }

  const regularSeasons = details?.seasons?.filter((s) => s.season_number > 0);
  const currentSeasonData = regularSeasons?.find(
    (s) => s.season_number === selectedSeason
  );

  return (
    <div className="player-page-container container">
      {/* --- LEFT COLUMN: DETAILS --- */}
      <div className="player-details">
        <h1 className="player-title">{details.title || details.name}</h1>
        <div className="player-meta">
          <span>★ {(details.vote_average || 0).toFixed(1)}</span>
          <span>
            {details.release_date?.slice(0, 4) ||
              details.first_air_date?.slice(0, 4)}
          </span>
          <span>
            {details.runtime
              ? `${details.runtime} min`
              : `${details.number_of_seasons} Seasons`}
          </span>
        </div>
        <div className="player-genres">
          {details.genres.map((g) => (
            <span key={g.id} className="genre-chip">
              {g.name}
            </span>
          ))}
        </div>
        <p className="player-overview">{details.overview}</p>

        <h3 className="cast-heading">Cast</h3>
        <div className="cast-list">
          {credits?.cast.slice(0, 8).map((actor) => (
            <CastMember key={actor.id} actor={actor} />
          ))}
        </div>
      </div>

      {/* --- RIGHT COLUMN: PLAYER AND CONTROLS --- */}
      <div className="player-main">
        <div className="player-controls">
          <div className="custom-select-wrapper">
            <select
              value={selectedServer}
              onChange={(e) => setSelectedServer(e.target.value)}
              className="player-select"
            >
              <option value="vidsrc">Server: VidSrc</option>
              <option value="vidsrc2">Server: VidSrc 2</option>
              <option value="2embed">Server: 2Embed</option>
              <option value="autoembed">Server: AutoEmbed</option>
            </select>
          </div>

          {type === "tv" && regularSeasons && (
            <>
              <div className="custom-select-wrapper">
                <select
                  value={selectedSeason}
                  onChange={(e) => {
                    setSelectedSeason(Number(e.target.value));
                    setSelectedEpisode(1); // Reset to episode 1 when season changes
                  }}
                  className="player-select"
                >
                  {regularSeasons.map((s) => (
                    <option key={s.id} value={s.season_number}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="custom-select-wrapper">
                <select
                  value={selectedEpisode}
                  onChange={(e) => setSelectedEpisode(Number(e.target.value))}
                  className="player-select"
                >
                  {Array.from(
                    { length: currentSeasonData?.episode_count || 0 },
                    (_, i) => i + 1
                  ).map((epNum) => (
                    <option key={epNum} value={epNum}>
                      Episode {epNum}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
        </div>

        <div className="player-iframe-container">
          {embedUrl ? (
            <iframe
              key={embedUrl} // Re-mounts iframe when URL changes
              src={embedUrl}
              className="player-iframe"
              allowFullScreen
              title="Media Player"
            ></iframe>
          ) : (
            <div className="player-loading">Loading player...</div>
          )}
        </div>
      </div>
    </div>
  );
}
