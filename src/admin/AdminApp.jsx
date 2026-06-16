import React, { useEffect, useMemo, useState } from "react";
import { Icon } from "../icons.jsx";
import { supabase } from "../lib/supabase.js";
import { questions } from "../questions.js";

function formatDate(value) {
  if (!value) return "Not available";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatDuration(seconds) {
  const totalSeconds = Math.max(0, Math.round(seconds || 0));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  return `${minutes}m`;
}

function sessionSeconds(sessionRow) {
  const start = new Date(sessionRow.started_at).getTime();
  const end = new Date(sessionRow.ended_at || sessionRow.last_seen_at).getTime();
  return Math.max(0, (end - start) / 1000);
}

export default function AdminApp({ session, profile, onSignOut, refreshProfile }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [progressRows, setProgressRows] = useState([]);
  const [sessionRows, setSessionRows] = useState([]);

  useEffect(() => {
    if (!profile) {
      refreshProfile().catch(() => {});
    }
  }, [profile, refreshProfile]);

  useEffect(() => {
    if (!profile?.is_admin) {
      setLoading(false);
      return;
    }

    let alive = true;

    async function loadAdminData() {
      setLoading(true);
      setError("");

      const [profilesResult, progressResult, sessionsResult] = await Promise.all([
        supabase
          .from("profiles")
          .select("id, email, full_name, is_admin, created_at, last_seen_at")
          .order("created_at", { ascending: false }),
        supabase
          .from("question_progress")
          .select("user_id, question_id, is_completed, completed_at"),
        supabase
          .from("user_sessions")
          .select("id, user_id, started_at, last_seen_at, ended_at")
          .order("started_at", { ascending: false }),
      ]);

      if (!alive) return;

      const nextError =
        profilesResult.error?.message ||
        progressResult.error?.message ||
        sessionsResult.error?.message ||
        "";

      if (nextError) {
        setError(nextError);
      } else {
        setProfiles(profilesResult.data || []);
        setProgressRows(progressResult.data || []);
        setSessionRows(sessionsResult.data || []);
      }

      setLoading(false);
    }

    loadAdminData();

    return () => {
      alive = false;
    };
  }, [profile?.is_admin]);

  const analytics = useMemo(() => {
    const solvedByUser = new Map();
    const timeByUser = new Map();
    const now = Date.now();
    const activeUsers = new Set();
    let totalSolved = 0;

    for (const row of progressRows) {
      if (!row.is_completed) continue;
      totalSolved += 1;
      solvedByUser.set(row.user_id, (solvedByUser.get(row.user_id) || 0) + 1);
    }

    for (const row of sessionRows) {
      timeByUser.set(row.user_id, (timeByUser.get(row.user_id) || 0) + sessionSeconds(row));
      if (row.last_seen_at && now - new Date(row.last_seen_at).getTime() <= 15 * 60 * 1000) {
        activeUsers.add(row.user_id);
      }
    }

    const userRows = profiles.map((userRow) => ({
      ...userRow,
      solvedCount: solvedByUser.get(userRow.id) || 0,
      totalSeconds: timeByUser.get(userRow.id) || 0,
    }));

    userRows.sort((left, right) => {
      if (right.solvedCount !== left.solvedCount) {
        return right.solvedCount - left.solvedCount;
      }

      return new Date(right.last_seen_at || right.created_at).getTime() - new Date(left.last_seen_at || left.created_at).getTime();
    });

    const totalHours = sessionRows.reduce((sum, row) => sum + sessionSeconds(row), 0) / 3600;

    return {
      totalUsers: profiles.length,
      totalSolved,
      activeNow: activeUsers.size,
      totalHours,
      userRows,
    };
  }, [profiles, progressRows, sessionRows]);

  if (!profile?.is_admin) {
    return (
      <div className="setup-shell">
        <div className="setup-card">
          <p className="eyebrow">Admin Locked</p>
          <h1>{session.user.email} is not marked as admin yet</h1>
          <p>
            Open the SQL file and run the admin update query after this account exists in Supabase, then refresh `/admin`.
          </p>
          <button className="auth-submit" onClick={onSignOut} type="button">
            <Icon name="Shield" size={18} />
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <header className="admin-topbar">
        <div>
          <p className="eyebrow">Separate Admin Frontend</p>
          <h1>DSA usage analytics</h1>
          <p>{session.user.email}</p>
        </div>
        <button className="account-link" onClick={onSignOut} type="button">
          Sign out
        </button>
      </header>

      {error && <p className="status-banner warning">{error}</p>}
      {loading && <p className="status-banner">Loading analytics from Supabase...</p>}

      <section className="stats-grid">
        <MetricCard label="Users" value={analytics.totalUsers} subtext="Accounts in profiles table" />
        <MetricCard label="Solved" value={analytics.totalSolved} subtext={`Across ${questions.length} total questions`} />
        <MetricCard label="Active now" value={analytics.activeNow} subtext="Seen in the last 15 minutes" />
        <MetricCard label="Time spent" value={formatDuration(analytics.totalHours * 3600)} subtext="Summed from tracked sessions" />
      </section>

      <section className="admin-note">
        <Icon name="Shield" size={24} />
        <div>
          <h3>Admin data source</h3>
          <p>
            This screen reads `profiles`, `question_progress`, and `user_sessions` from Supabase with row-level security.
          </p>
        </div>
      </section>

      <section className="admin-table">
        <div className="admin-table-header">
          <h2>Users</h2>
          <span>{analytics.userRows.length} people tracked</span>
        </div>

        <div className="admin-user-list">
          {analytics.userRows.map((userRow) => (
            <article className="admin-user-row" key={userRow.id}>
              <div>
                <strong>{userRow.full_name || userRow.email}</strong>
                <p>{userRow.email}</p>
              </div>
              <div>
                <span>Solved</span>
                <strong>{userRow.solvedCount}</strong>
              </div>
              <div>
                <span>Time spent</span>
                <strong>{formatDuration(userRow.totalSeconds)}</strong>
              </div>
              <div>
                <span>Last active</span>
                <strong>{formatDate(userRow.last_seen_at)}</strong>
              </div>
              <div>
                <span>Joined</span>
                <strong>{formatDate(userRow.created_at)}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function MetricCard({ label, value, subtext }) {
  return (
    <div className="stat-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{subtext}</p>
    </div>
  );
}
