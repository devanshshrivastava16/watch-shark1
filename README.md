# 🦈 WatchShark - Movie & TV Show Discovery Platform

A modern, responsive movie and TV show discovery website built with React. WatchShark provides an intuitive interface for discovering, searching, managing a personal watchlist, and finding where to watch your favorite content with seamless streaming capabilities.

## 🌐 Live Demo

**Deployed Site**: [https://watchshark.vercel.app/]([https://watchshark.vercel.app](https://watch-shark1.vercel.app/)/)

## 📱 Features

- **Dynamic Homepage**: Features a hero banner and categorized carousels for trending and top-rated content.
- **Movie & TV Show Details**: Comprehensive information including cast, crew, ratings, trailers, and recommendations.
- **Advanced Discovery**: Filter movies and TV shows by genre to find something new.
- **Multi-Search**: A powerful search bar in the navigation for finding movies and TV shows quickly.
- **Personal Watchlist**: Save your favorite movies and TV shows to a personal list, stored locally in your browser.
- **Integrated Video Player**: High-quality video playback with multiple streaming sources and season/episode selection for TV shows.
- **Responsive Design**: Fully optimized for a seamless experience on desktop, tablet, and mobile devices.
- **Static Pages**: Includes "About Us" and "Privacy Policy" pages for completeness.

## 🛠️ Tech Stack

- **Frontend**: React.js (with Hooks)
- **Routing**: React Router
- **Styling**: CSS3 (with global styles)
- **Build Tool**: Vite
- **Deployment**: Vercel
- **APIs**:
  - TMDB API (for all movie and TV show metadata)
  - VidSrc API (primary streaming source)
  - 2Embed (alternative streaming source)

## 📁 Project Structure

The project follows a clean, component-based architecture that is organized for scalability and maintainability.

```
/
├── public/
│   └── favicon.png
├── src/
│   ├── components/
│   │   ├── CastMember.jsx
│   │   ├── FilterControls.jsx
│   │   ├── Hero.jsx
│   │   ├── MovieCard.jsx
│   │   ├── ResultsGrid.jsx
│   │   └── SearchBar.jsx
│   ├── hooks/
│   │   └── useWatchlist.js
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Discover.jsx
│   │   ├── Home.jsx
│   │   ├── Contact.jsx
│   │   ├── MovieDetails.jsx
│   │   ├── Player.jsx
│   │   ├── PrivacyPolicy.jsx
│   │   ├── Search.jsx
│   │   ├── TvDetails.jsx
│   │   └── Watchlist.jsx
│   ├── services/
│   │   └── tmdb.js
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── .env
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A TMDB API key

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/devanshshrivastava16/WatchShark.git
   cd WatchShark
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root of your project and add your TMDB API key:

   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   ```

   _(Note: When using Vite, environment variables must be prefixed with `VITE_`)_

4. **Start the development server:**

   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to `http://localhost:5173` (or the port specified in your terminal).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/NewFeature`)
3. Commit your Changes (`git commit -m 'Add some NewFeature'`)
4. Push to the Branch (`git push origin feature/NewFeature`)
5. Open a Pull Request

## 📜 License

This project is open source and available under the MIT License.

## 🔗 Links

- **GitHub Repository**: [https://github.com/devanshshrivastava16/WatchShark](https://github.com/devanshshrivastava16/WatchShark)
- **Live Application**: [https://watchshark.vercel.app/](https://watchshark.vercel.app/)

## 📞 Contact

**Developer**: Devansh Shrivastava

- GitHub: [@devanshshrivastava16](https://github.com/devanshshrivastava16)

## ⚖️ Legal Disclaimer

**Important Notice**: This project is created solely for educational purposes to demonstrate web development skills using React.js and third-party APIs.

- All movie and TV show data is sourced from the publicly available TMDB API.
- Streaming sources utilize publicly accessible embedding services (VidSrc, 2Embed).
- This project **does not host, store, or distribute any copyrighted content**.
- The developer does not promote or encourage piracy in any form. Users are responsible for complying with their local laws.

This application serves as a portfolio piece showcasing modern web development techniques.
