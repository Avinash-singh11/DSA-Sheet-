import React, { useState } from "react";
import { Icon } from "../icons.jsx";
import { supabase } from "../lib/supabase.js";

export default function AuthScreen({ authError, isAdminRoute }) {
  const [mode, setMode] = useState("signin");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(authError || "");

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");

    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });

        if (error) throw error;

        if (!data.session) {
          setMessage(
            "Account created. Disable email confirmation in Supabase Auth settings to sign users in instantly."
          );
        } else {
          setMessage("Account created. Your personal progress space is ready.");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-shell">
      <section className="auth-hero">
        <p className="eyebrow">{isAdminRoute ? "Admin Access" : "CFG Sheet"}</p>
        <h1>{isAdminRoute ? "Sign in to view platform analytics" : "Pick up your DSA Sheet from where you left off"}</h1>
        <p>
          {isAdminRoute
            ? "Only admin accounts can open this dashboard. It shows users, solved questions, and learning time."
            : "Create your account once and your solved questions will stay saved on every visit."}
        </p>
        <div className="auth-feature-list">
          <div>
            <strong>Your progress stays saved</strong>
            <span>Come back anytime and continue from the same question state.</span>
          </div>
          <div>
            <strong>Use one account everywhere</strong>
            <span>Phone, laptop, or desktop, your checklist stays linked to you.</span>
          </div>
          <div>
            <strong>Built for steady practice</strong>
            <span>Track hundreds of questions without losing your place.</span>
          </div>
        </div>
      </section>

      <section className="auth-card">
        <div className="auth-mode-tabs">
          <button className={mode === "signin" ? "active" : ""} onClick={() => setMode("signin")} type="button">
            Sign in
          </button>
          <button className={mode === "signup" ? "active" : ""} onClick={() => setMode("signup")} type="button">
            Create account
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === "signup" && (
            <label>
              <span>Full name</span>
              <input
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="Your name"
                required
              />
            </label>
          )}

          <label>
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Minimum 6 characters"
              minLength={6}
              required
            />
          </label>

          <button className="auth-submit" disabled={submitting} type="submit">
            <Icon name="Shield" size={18} />
            {submitting ? "Working..." : mode === "signup" ? "Create account" : "Sign in"}
          </button>
        </form>

        {message && <p className="auth-message">{message}</p>}
      </section>
    </div>
  );
}
