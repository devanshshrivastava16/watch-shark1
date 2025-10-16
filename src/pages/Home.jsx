import { useEffect, useState } from "react";
import { api } from "../services/tmdb.js";
import MovieCard from "../components/MovieCard.jsx";
import Hero from "../components/Hero.jsx";

// Reusable Row Component for carousels
function Row({ title, items }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="content-row">
      <h2 className="row-title">{title}</h2>
      <div className="scroller">
        {items.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>
    </div>
  );
}

// Main Homepage Component
export default function Home() {
  const [heroMovie, setHeroMovie] = useState(null);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  // Configuration for all the carousels to be displayed
  const rowConfig = [
    { title: "Trending Movies", endpoint: "/trending/movie/week" },
    { title: "Trending Shows", endpoint: "/trending/tv/week" },
    { title: "Top Rated Movies", endpoint: "/movie/top_rated" },
    { title: "Top Rated Shows", endpoint: "/tv/top_rated" },
    {
      title: "Trending on Netflix",
      endpoint: "/discover/tv",
      params: { with_networks: 213 },
    },
    {
      title: "Trending on Amazon Prime",
      endpoint: "/discover/tv",
      params: { with_networks: 1024 },
    },
    {
      title: "Trending on Disney+",
      endpoint: "/discover/tv",
      params: { with_networks: 2739 },
    },
    {
      title: "Trending on Hulu",
      endpoint: "/discover/tv",
      params: { with_networks: 453 },
    },
    {
      title: "Trending on HBO Max",
      endpoint: "/discover/tv",
      params: { with_networks: 3186 },
    },
  ];

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        // 1. Fetch trending movies to find a candidate for the hero banner
        const trendingMoviesResponse = await api.get(rowConfig[0].endpoint);
        const trendingMovies = trendingMoviesResponse.data.results;

        if (trendingMovies.length > 0) {
          const randomHeroBase =
            trendingMovies[Math.floor(Math.random() * trendingMovies.length)];
          // 2. Fetch the full details for that random movie to get all info
          const { data: heroDetails } = await api.get(
            `/movie/${randomHeroBase.id}`
          );
          setHeroMovie(heroDetails);
        }

        // 3. Fetch data for all the carousels concurrently
        const rowPromises = rowConfig.map((config) =>
          api.get(config.endpoint, { params: config.params })
        );
        const allRowData = await Promise.all(rowPromises);
        const populatedRows = allRowData.map((response, index) => ({
          title: rowConfig[index].title,
          items: response.data.results,
        }));
        setRows(populatedRows);
      } catch (error) {
        console.error("Failed to fetch data for homepage:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Display a loading message while data is being fetched
  if (loading) {
    return (
      <div
        className="container"
        style={{ textAlign: "center", paddingTop: "100px" }}
      >
        <p>Loading dashboard...</p>
      </div>
    );
  }

  // Render the final page layout
  return (
    <div>
      <Hero movie={heroMovie} />
      <div className="container">
        {rows.map((row) => (
          <Row key={row.title} title={row.title} items={row.items} />
        ))}
      </div>
    </div>
  );
}
