import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
if (!API_KEY) {
  // eslint-disable-next-line no-console
  console.warn("VITE_TMDB_API_KEY is not set. Create a .env with your key.");
}

export const img = {
  poster: (path, size = 342) =>
    path ? `https://image.tmdb.org/t/p/w${size}${path}` : "",
  backdrop: (path, size = 780) =>
    path ? `https://image.tmdb.org/t/p/w${size}${path}` : "",
  original: (path) =>
    path ? `https://image.tmdb.org/t/p/original${path}` : "",
};

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: { api_key: API_KEY, language: "en-US" },
});

// Helpers
export const paginate = (arr, limit = 20) => arr.slice(0, limit);
