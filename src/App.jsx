import React, { useEffect, useState } from "react";
import AdminApp from "./admin/AdminApp.jsx";
import AuthScreen from "./components/AuthScreen.jsx";
import SetupScreen from "./components/SetupScreen.jsx";
import PublicApp from "./user/PublicApp.jsx";
import { hasSupabaseConfig, supabase } from "./lib/supabase.js";

function routeIsAdmin() {
  return window.location.pathname.startsWith("/admin");
}

async function loadProfile(userId) {
  if (!supabase || !userId) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("id, email, full_name, is_admin, created_at, last_seen_at")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export default function App() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState("");
  const isAdminRoute = routeIsAdmin();

  useEffect(() => {
    if (!supabase || !hasSupabaseConfig) {
      setLoading(false);
      return;
    }

    let alive = true;

    async function bootstrap() {
      const {
        data: { session: nextSession },
        error,
      } = await supabase.auth.getSession();

      if (!alive) return;
      if (error) {
        setAuthError(error.message);
      }

      setSession(nextSession);

      if (nextSession?.user?.id) {
        try {
          const nextProfile = await loadProfile(nextSession.user.id);
          if (alive) {
            setProfile(nextProfile);
          }
        } catch (profileError) {
          if (alive) {
            setAuthError(profileError.message);
          }
        }
      }

      if (alive) {
        setLoading(false);
      }
    }

    bootstrap();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      if (!alive) return;
      setSession(nextSession);

      if (!nextSession?.user?.id) {
        setProfile(null);
        return;
      }

      try {
        const nextProfile = await loadProfile(nextSession.user.id);
        if (alive) {
          setProfile(nextProfile);
        }
      } catch (profileError) {
        if (alive) {
          setAuthError(profileError.message);
        }
      }
    });

    return () => {
      alive = false;
      subscription.unsubscribe();
    };
  }, []);

  async function handleSignOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setProfile(null);
  }

  async function refreshProfile() {
    if (!session?.user?.id) return;
    const nextProfile = await loadProfile(session.user.id);
    setProfile(nextProfile);
  }

  if (!hasSupabaseConfig) {
    return <SetupScreen isAdminRoute={isAdminRoute} />;
  }

  if (loading) {
    return (
      <div className="setup-shell">
        <div className="setup-card">
          <p className="eyebrow">Loading</p>
          <h1>Connecting your CFG Sheet</h1>
          <p>Checking your session and syncing your saved progress.</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <AuthScreen
        authError={authError}
        isAdminRoute={isAdminRoute}
      />
    );
  }

  if (isAdminRoute) {
    return (
      <AdminApp
        session={session}
        profile={profile}
        onSignOut={handleSignOut}
        refreshProfile={refreshProfile}
      />
    );
  }

  return (
    <PublicApp
      session={session}
      profile={profile}
      onSignOut={handleSignOut}
    />
  );
}
