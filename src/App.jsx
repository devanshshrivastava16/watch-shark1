import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import TvDetails from "./pages/TvDetails";
import Watchlist from "./pages/Watchlist";
import Player from "./pages/Player";
import Discover from "./pages/Discover";
import Search from "./pages/Search";
import SearchBar from "./components/SearchBar";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Contact from "./pages/Contact";

// Import icons
import { HiHome } from "react-icons/hi";
import { MdMovie } from "react-icons/md";
import { BsViewList } from "react-icons/bs";

export default function App() {
  return (
    <div>
      <header className="header">
        <nav className="nav container">
          <NavLink to="/" className="logo">
            <img src="/favicon.png" alt="Logo" style={{ width: "40px" }} />
            <span>WatchShark</span>
          </NavLink>

          <div className="nav-links">
            <NavLink to="/" end>
              <HiHome /> Home
            </NavLink>
            <NavLink to="/discover">
              <MdMovie /> Discover
            </NavLink>
            <NavLink to="/watchlist">
              <BsViewList /> Your Lists
            </NavLink>
          </div>

          <SearchBar />
        </nav>
      </header>

      <main style={{ paddingTop: "80px" }}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/tv/:id" element={<TvDetails />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/watch/:type/:id" element={<Player />} />
          <Route
            path="/watch/:type/:id/:season/:episode"
            element={<Player />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="*" element={<p>Not Found</p>} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-logo">
            <img src="/favicon.png" alt="Logo" style={{ width: "60px" }} />
            <div>
              <h3>WatchShark</h3>
              <p className="disclaimer">
                Disclaimer: This site does not store any files on our server, we
                only link to the media which is hosted on 3rd party services.
              </p>
            </div>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <NavLink to="/about">About us</NavLink>
            <NavLink to="/privacy-policy">Privacy Policy</NavLink>
            <NavLink to="/contact">Contact Us</NavLink>
          </div>
        </div>
      </footer>
    </div>
  );
}
