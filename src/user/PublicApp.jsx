import React, { useEffect, useMemo, useState } from "react";
import { Icon } from "../icons.jsx";
import { supabase } from "../lib/supabase.js";
import {
  buildQuestionFallbackUrl,
  formatTopicLabel,
  levelOrder,
  questions,
  topicBlueprints,
} from "../questions.js";

const CORE_QUESTION_COUNT = 400;

function formatDate(value) {
  if (!value) return "Not available";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function useSessionTracker(userId) {
  useEffect(() => {
    if (!userId) return undefined;

    let disposed = false;
    let sessionRowId = null;

    async function startSession() {
      const now = new Date().toISOString();

      await supabase
        .from("profiles")
        .update({ last_seen_at: now })
        .eq("id", userId);

      const { data } = await supabase
        .from("user_sessions")
        .insert({
          user_id: userId,
          started_at: now,
          last_seen_at: now,
        })
        .select("id")
        .single();

      if (!disposed) {
        sessionRowId = data?.id ?? null;
      }
    }

    async function heartbeat(endSession = false) {
      const now = new Date().toISOString();

      await supabase
        .from("profiles")
        .update({ last_seen_at: now })
        .eq("id", userId);

      if (!sessionRowId) return;

      const payload = endSession
        ? { last_seen_at: now, ended_at: now }
        : { last_seen_at: now };

      await supabase
        .from("user_sessions")
        .update(payload)
        .eq("id", sessionRowId);
    }

    startSession();

    const intervalId = window.setInterval(() => {
      heartbeat();
    }, 60000);

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        heartbeat();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      disposed = true;
      window.clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibility);
      heartbeat(true);
    };
  }, [userId]);
}

export default function PublicApp({ session, profile, onSignOut }) {
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [syncMessage, setSyncMessage] = useState("");
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("All");
  const [level, setLevel] = useState("All");
  const [onlyPending, setOnlyPending] = useState(false);

  useSessionTracker(session.user.id);

  useEffect(() => {
    let alive = true;

    async function loadProgress() {
      setLoading(true);
      const { data, error } = await supabase
        .from("question_progress")
        .select("question_id, is_completed, completed_at")
        .eq("user_id", session.user.id)
        .eq("is_completed", true);

      if (!alive) return;

      if (error) {
        setSyncMessage(error.message);
        setLoading(false);
        return;
      }

      const nextProgress = Object.fromEntries(
        data.map((row) => [
          row.question_id,
          {
            done: row.is_completed,
            completedAt: row.completed_at,
          },
        ])
      );

      setProgress(nextProgress);
      setLoading(false);
    }

    loadProgress();

    return () => {
      alive = false;
    };
  }, [session.user.id]);

  const completedCount = useMemo(
    () => Object.values(progress).filter((item) => item.done).length,
    [progress]
  );
  const completionPercent = Math.round((completedCount / questions.length) * 100);
  const topics = useMemo(() => ["All", ...topicBlueprints.map((item) => item.topic)], []);
  const levels = useMemo(() => ["All", ...levelOrder], []);

  const filteredQuestions = useMemo(() => {
    const text = query.trim().toLowerCase();
    return questions.filter((question) => {
      const matchesText =
        !text ||
        question.title.toLowerCase().includes(text) ||
        question.topic.toLowerCase().includes(text) ||
        question.level.toLowerCase().includes(text);
      const matchesTopic = topic === "All" || question.topic === topic;
      const matchesLevel = level === "All" || question.level === level;
      const matchesStatus = !onlyPending || !progress[question.id]?.done;
      return matchesText && matchesTopic && matchesLevel && matchesStatus;
    });
  }, [level, onlyPending, progress, query, topic]);

  const topicStats = useMemo(
    () =>
      topicBlueprints.map((item) => {
        const ids = questions
          .filter((question) => question.topic === item.topic)
          .map((question) => question.id);
        const done = ids.filter((id) => progress[id]?.done).length;
        return {
          topic: item.topic,
          total: ids.length,
          done,
          percent: Math.round((done / ids.length) * 100),
        };
      }),
    [progress]
  );

  async function toggleQuestion(question) {
    const done = !progress[question.id]?.done;
    const completedAt = done ? new Date().toISOString() : null;
    const previousState = progress;

    setProgress((current) => ({
      ...current,
      [question.id]: {
        done,
        completedAt,
      },
    }));
    setSyncMessage("");

    const { error } = await supabase.from("question_progress").upsert(
      {
        user_id: session.user.id,
        question_id: question.id,
        is_completed: done,
        completed_at: completedAt,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "user_id,question_id",
      }
    );

    if (error) {
      setProgress(previousState);
      setSyncMessage(error.message);
    }
  }

  async function resetProgress() {
    const ok = window.confirm("Reset all saved progress for this account?");
    if (!ok) return;

    const { error } = await supabase
      .from("question_progress")
      .delete()
      .eq("user_id", session.user.id);

    if (error) {
      setSyncMessage(error.message);
      return;
    }

    setProgress({});
  }

  function openQuestion(url) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function questionFallbackUrl(question) {
    return buildQuestionFallbackUrl(question.title);
  }

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="CFG Sheet navigation">
        <div className="brand">
          <div className="brand-mark">
            <Icon name="ListChecks" size={24} />
          </div>
          <div>
            <p className="eyebrow">CFG Sheet</p>
            <h1>CFG Sheet</h1>
          </div>
        </div>

        <div className="account-panel">
          <div>
            <strong>{profile?.full_name || session.user.email}</strong>
            <p>{session.user.email}</p>
          </div>
          <button className="account-link" onClick={onSignOut} type="button">
            Sign out
          </button>
        </div>

        <div className="progress-panel">
          <div className="progress-ring" style={{ "--progress": `${completionPercent}%` }}>
            <span>{completionPercent}%</span>
          </div>
          <div>
            <strong>{completedCount} completed</strong>
            <p>{questions.length - completedCount} left from the full {questions.length}-question journey.</p>
          </div>
        </div>

        <div className="topic-mini-list">
          {topicStats.map((item) => (
            <button key={item.topic} onClick={() => setTopic(item.topic)} type="button">
              <span>{formatTopicLabel(item.topic)}</span>
              <span>{item.done}/{item.total}</span>
            </button>
          ))}
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div>
            <p className="eyebrow">Practice. Track. Finish.</p>
            <h2>{questions.length} DSA questions for serious prep</h2>
          </div>
          <button className="icon-button danger" onClick={resetProgress} title="Reset saved progress" type="button">
            <Icon name="RotateCcw" size={18} />
          </button>
        </header>

        <section className="stats-grid" aria-label="Progress summary">
          <StatCard label="Questions" value={questions.length} subtext={`${CORE_QUESTION_COUNT} core plus mastery bonus`} />
          <StatCard label="Completed" value={completedCount} subtext={`${completionPercent}% done`} />
          <StatCard label="Visible" value={filteredQuestions.length} subtext="After filters" />
          <StatCard label="Topics" value={topicBlueprints.length} subtext="Beginner to mastery" />
        </section>

        <section className="controls-band">
          <label className="search-field">
            <Icon name="Search" size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search questions, topics, levels"
            />
          </label>

          <label className="select-field">
            <Icon name="Filter" size={18} />
                <select value={topic} onChange={(event) => setTopic(event.target.value)}>
                  {topics.map((item) => (
                    <option key={item} value={item}>
                      {item === "All" ? item : formatTopicLabel(item)}
                    </option>
                  ))}
                </select>
              </label>

          <label className="select-field">
            <Icon name="BarChart3" size={18} />
            <select value={level} onChange={(event) => setLevel(event.target.value)}>
              {levels.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>

          <label className="toggle-field">
            <input
              type="checkbox"
              checked={onlyPending}
              onChange={(event) => setOnlyPending(event.target.checked)}
            />
            Pending only
          </label>
        </section>

        {syncMessage && <p className="status-banner warning">{syncMessage}</p>}
        {loading && <p className="status-banner">Loading saved progress from Supabase...</p>}
        <div className="completion-hint">
          <Icon name="CheckCircle2" size={18} />
          <p>Tap the check button on the left of a question to mark it complete.</p>
        </div>

        <section className="question-list" aria-label="DSA questions">
          {filteredQuestions.map((question) => {
            const done = Boolean(progress[question.id]?.done);
            return (
              <article className={`question-row ${done ? "done" : ""}`} key={question.id}>
                <button
                  className={`check-button ${done ? "done" : ""}`}
                  onClick={() => toggleQuestion(question)}
                  aria-label={done ? `Mark ${question.title} pending` : `Mark ${question.title} complete`}
                  title={done ? "Mark pending" : "Mark complete"}
                  type="button"
                >
                  <Icon name="CheckCircle2" size={21} />
                  <span>{done ? "Done" : "Mark done"}</span>
                </button>

                <div className="question-content">
                  <div className="question-title-line">
                    <span className="question-id">#{String(question.id).padStart(3, "0")}</span>
                    <h3>{question.title}</h3>
                  </div>
                  <div className="meta-line">
                    <span>{formatTopicLabel(question.topic)}</span>
                    <span>{question.level}</span>
                    {done && <span>Done {formatDate(progress[question.id]?.completedAt)}</span>}
                  </div>
                </div>

                <div className="question-actions">
                  <button className="search-link" onClick={() => openQuestion(questionFallbackUrl(question))} type="button">
                    Search
                  </button>
                  <button className="solve-link" onClick={() => openQuestion(question.url)} type="button">
                    <Icon name="ExternalLink" size={18} />
                    Solve
                  </button>
                </div>
              </article>
            );
          })}
        </section>
      </main>
    </div>
  );
}

function StatCard({ label, value, subtext }) {
  return (
    <div className="stat-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{subtext}</p>
    </div>
  );
}
