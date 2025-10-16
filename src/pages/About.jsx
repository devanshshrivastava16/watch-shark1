import React from "react";
import { FaUsers, FaBullseye, FaLightbulb } from "react-icons/fa";

export default function About() {
  return (
    <div className="static-page-container container">
      <div className="static-page-header">
        <h1>About WatchShark</h1>
        <p className="subtitle">
          Your ultimate guide to the world of movies and TV shows.
        </p>
      </div>

      <div className="static-page-content">
        <div className="info-card">
          <FaBullseye className="info-icon" />
          <h2>Our Mission</h2>
          <p>
            At WatchShark, our mission is to provide a seamless and enjoyable
            experience for discovering, tracking, and watching your favorite
            movies and TV series. We aim to be the go-to platform for cinephiles
            and casual viewers alike, offering a comprehensive database and a
            user-friendly interface.
          </p>
        </div>

        <div className="info-card">
          <FaUsers className="info-icon" />
          <h2>Who We Are</h2>
          <p>
            I am a passionate developer and movie lover based in Jhansi, India.
            I believe that entertainment is a powerful way to connect people and
            ideas. WatchShark was born from my desire to create a simple,
            elegant, and powerful tool to explore the vast universe of cinema.
          </p>
        </div>

        <div className="info-card">
          <FaLightbulb className="info-icon" />
          <h2>What We Offer</h2>
          <p>
            WatchShark provides detailed information on thousands of titles,
            powered by The Movie Database (TMDB). We offer a clean, ad-free
            interface where you can search for content, manage a personal
            watchlist, and find where to stream your next binge-watch. Please
            note, WatchShark is an index and does not host any content on its
            own servers.
          </p>
        </div>
      </div>
    </div>
  );
}
