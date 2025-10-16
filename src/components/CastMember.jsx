import React from "react";
import { img } from "../services/tmdb.js";

// A simple component to display a cast member's circular photo and name.
export default function CastMember({ actor }) {
  const profileImage = img.poster(actor.profile_path, 185);

  return (
    <div className="cast-member">
      <div className="cast-photo-wrapper">
        {profileImage ? (
          <img src={profileImage} alt={actor.name} className="cast-photo" />
        ) : (
          <div className="cast-photo-placeholder" />
        )}
      </div>
      <p className="cast-name">{actor.name}</p>
    </div>
  );
}
