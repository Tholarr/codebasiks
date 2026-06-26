import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import Navbar from "../components/Navbar";
import PageWrapper from "../components/PageWrapper";
import { secondaryButtonStyle, navTabStyle } from "../styles/common";

type UserInfo = {
  id: number;
  username: string;
  created_at: string;
};

type UserStats = {
  lessonsCompleted: number;
  totalLessons: number;
  globalPct: number;
};

export default function Profile() {
  const { token, logout } = useAuth();
  const [info, setInfo] = useState<UserInfo | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [mailSent, setMailSent] = useState(false);
  const [mailError, setMailError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/user/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) setError(data.error);
        else setInfo(data);
      })
      .catch(() => setError("Could not reach the server."));

    fetch("/api/user/stats", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (!data.error) setStats(data);
      })
      .catch(console.error);
  }, [token]);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const sendTestEmail = async () => {
    setSending(true);
    setMailSent(false);
    setMailError(null);
    try {
      const res = await fetch("/api/user/test-email", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) setMailError(data.error);
      else setMailSent(true);
    } catch {
      setMailError("Could not reach the server.");
    } finally {
      setSending(false);
    }
  };

  return (
    <PageWrapper>
      <Navbar />
      <div style={{
        maxWidth: 500,
        margin: "3rem auto",
        padding: "2rem",
        fontFamily: "sans-serif",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
      }}>
        <h1 style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>My Profile</h1>

        {error && <p style={{ color: "#c62828" }}>{error}</p>}

        {info && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

            {/* Account info */}
            <div style={rowStyle}>
              <span style={labelStyle}>Username</span>
              <span style={valueStyle}>👤 {info.username}</span>
            </div>
            <div style={rowStyle}>
              <span style={labelStyle}>Member since</span>
              <span style={valueStyle}>
                {new Date(info.created_at).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <div style={rowStyle}>
              <span style={labelStyle}>User ID</span>
              <span style={{ ...valueStyle, color: "#aaa", fontSize: "0.85rem" }}>#{info.id}</span>
            </div>

            {/* Stats */}
            {stats && (
              <>
                <hr style={{ margin: "0.25rem 0", borderColor: "#eee" }} />
                <h2 style={{ fontSize: "1rem", margin: "0.25rem 0", color: "#555" }}>Progress</h2>

                <div style={rowStyle}>
                  <span style={labelStyle}>Lessons completed</span>
                  <span style={valueStyle}>{stats.lessonsCompleted} / {stats.totalLessons}</span>
                </div>

                <div style={rowStyle}>
                  <span style={labelStyle}>Overall progress</span>
                  <span style={valueStyle}>{stats.globalPct}%</span>
                </div>

                {/* Progress bar */}
                <div style={{ height: 8, backgroundColor: "#eee", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{
                    height: "100%",
                    width: `${stats.globalPct}%`,
                    backgroundColor: "#2e7d32",
                    borderRadius: 4,
                    transition: "width 0.5s ease",
                  }} />
                </div>
              </>
            )}

            <hr style={{ margin: "0.25rem 0", borderColor: "#eee" }} />

            <button
              onClick={sendTestEmail}
              disabled={sending}
              style={{ ...navTabStyle, opacity: sending ? 0.7 : 1 }}
            >
              {sending ? "Sending..." : "Send test email"}
            </button>

            {mailSent && <p style={{ color: "#2e7d32", fontSize: "0.875rem" }}>✅ Email sent!</p>}
            {mailError && <p style={{ color: "#c62828", fontSize: "0.875rem" }}>❌ {mailError}</p>}

            <button onClick={handleLogout} style={secondaryButtonStyle}>
              Logout
            </button>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}

const rowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0.75rem 0",
  borderBottom: "1px solid #f0f0f0",
};

const labelStyle: React.CSSProperties = {
  fontSize: "0.875rem",
  color: "#888",
};

const valueStyle: React.CSSProperties = {
  fontSize: "0.95rem",
  fontWeight: "500",
  color: "#333",
};
