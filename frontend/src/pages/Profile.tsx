import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import Navbar from "../components/Navbar";
import PageWrapper from "../components/PageWrapper";
import { secondaryButtonStyle } from "../styles/common";

type UserInfo = {
  id: number;
  username: string;
  created_at: string;
};

export default function Profile() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [info, setInfo] = useState<UserInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

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
  }, [token]);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
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

            <hr style={{ margin: "0.5rem 0", borderColor: "#eee" }} />

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
