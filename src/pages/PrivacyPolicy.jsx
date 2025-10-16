import React from "react";
import { FaBalanceScale } from "react-icons/fa";

export default function PrivacyPolicy() {
  return (
    <div className="static-page-container container">
      <div className="static-page-header">
        <h1>Privacy Policy for WatchShark</h1>
        <p className="subtitle">Last updated: October 15, 2025</p>
      </div>

      <div className="static-page-content text-content">
        <p>
          Welcome to WatchShark. We are committed to protecting your privacy.
          This Privacy Policy explains how we handle information on our website.
        </p>

        <h2>1. Information We Collect</h2>
        <p>
          WatchShark is designed to be a privacy-focused application. We do not
          require user accounts, and therefore, we do not collect any personally
          identifiable information (PII) such as your name, email address, or
          phone number.
        </p>
        <p>
          The only data we store is your "Watchlist." This information is saved
          directly in your browser's <strong>Local Storage</strong>. It is not
          transmitted to our servers and is accessible only by you on your own
          device. Clearing your browser's cache or data will permanently delete
          your watchlist.
        </p>

        <h2>2. How We Use Information</h2>
        <p>
          Since we do not collect personal data, we do not use it for any
          purpose. The watchlist data stored in your browser is used solely to
          provide the core functionality of the app—displaying your saved movies
          and TV shows.
        </p>

        <h2>3. Third-Party Services</h2>
        <p>
          Our service utilizes The Movie Database (TMDB) API to fetch movie and
          TV show information. We do not share any data with TMDB. For video
          playback, we embed content from third-party services like VidSrc and
          2Embed. We are not responsible for the privacy practices of these
          external sites. We encourage you to review their privacy policies if
          you have concerns.
        </p>

        {/* --- NEW LEGAL DISCLAIMER SECTION --- */}
        <div className="disclaimer-section">
          <FaBalanceScale className="info-icon" />
          <h2>Legal Disclaimer</h2>
          <p>
            <strong>Important Notice:</strong> This project is created solely
            for educational purposes and to demonstrate web development skills
            using React.js and various APIs.
          </p>
          <ul>
            <li>
              All movie data is sourced from publicly available APIs (TMDB).
            </li>
            <li>
              Streaming sources utilize publicly accessible embedding services.
            </li>
            <li>
              This project does not host, store, or distribute any copyrighted
              content.
            </li>
            <li>
              The owner/developer does not promote or encourage piracy in any
              form.
            </li>
            <li>
              Users are responsible for ensuring they comply with their local
              laws regarding content consumption.
            </li>
            <li>
              All content sources are already available on the internet through
              their respective platforms.
            </li>
          </ul>
          <p className="disclaimer-footer">
            This application serves as a portfolio project showcasing modern web
            development techniques and API integration capabilities.
          </p>
        </div>

        <h2>4. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page with an updated revision date.
        </p>
      </div>
    </div>
  );
}
