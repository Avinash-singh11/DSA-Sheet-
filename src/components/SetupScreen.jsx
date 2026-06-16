import React from "react";

export default function SetupScreen({ isAdminRoute }) {
  return (
    <div className="setup-shell">
      <div className="setup-card">
        <p className="eyebrow">{isAdminRoute ? "Admin Setup" : "App Setup"}</p>
        <h1>Supabase keys still need to be added</h1>
        <p>
          Fill the placeholders in `.env` with your Supabase project URL and anon key, then restart Vite.
        </p>
        <div className="setup-code">
          <code>VITE_SUPABASE_URL=</code>
          <code>VITE_SUPABASE_ANON_KEY=</code>
        </div>
        <p className="setup-note">
          Keep email confirmation disabled in Supabase Auth settings if you want instant signup without verification.
        </p>
      </div>
    </div>
  );
}
