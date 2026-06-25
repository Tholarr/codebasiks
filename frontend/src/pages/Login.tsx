import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useSearchParams } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  // const [mode, setMode]       = useState<"login" | "register">("login");
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState<"login" | "register">(
    searchParams.get("mode") === "register" ? "register" : "login"
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm]   = useState("");
  const [error, setError]       = useState<string | null>(null);
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async () => {
    setError(null);

    if (!username.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    if (mode === "register" && password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }

      login(data.username, data.token);
      navigate("/");

    } catch {
      setError("Could not reach the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div style={{
        maxWidth: 400,
        margin: "6rem auto",
        padding: "2rem",
        fontFamily: "sans-serif",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
      }}>
        <h1 style={{ textAlign: "center", marginBottom: "0.25rem", fontSize: "1.5rem" }}>
          CodeBasiks
        </h1>
        <p style={{ textAlign: "center", color: "#888", marginBottom: "2rem", fontSize: "0.9rem" }}>
          {mode === "login" ? "Sign in to your account" : "Create an account"}
        </p>

        <div style={{ display: "flex", borderBottom: "1px solid #ddd", marginBottom: "1.5rem" }}>
          {(["login", "register"] as const).map(m => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(null); }}
              style={{
                flex: 1,
                padding: "0.6rem",
                background: "none",
                border: "none",
                borderBottom: mode === m ? "2px solid #2e7d32" : "2px solid transparent",
                color: mode === m ? "#2e7d32" : "#888",
                fontWeight: mode === m ? "bold" : "normal",
                cursor: "pointer",
                fontSize: "0.95rem",
                marginBottom: "-1px",
              }}
            >
              {m === "login" ? "Login" : "Register"}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label style={labelStyle}>Username</label>
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Enter your username"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={inputStyle}
            />
          </div>

          {mode === "register" && (
            <div>
              <label style={labelStyle}>Confirm password</label>
              <input
                type="password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                placeholder="Confirm your password"
                style={inputStyle}
              />
            </div>
          )}

          {error && (
            <p style={{ color: "#c62828", fontSize: "0.875rem", margin: 0 }}>
              {error}
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              padding: "0.75rem",
              backgroundColor: "#2e7d32",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "1rem",
              cursor: loading ? "not-allowed" : "pointer",
              marginTop: "0.5rem",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Please wait..." : mode === "login" ? "Login" : "Register"}
          </button>
        </div>
      </div>
    </PageWrapper>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.875rem",
  color: "#555",
  marginBottom: "0.4rem",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.6rem 0.75rem",
  border: "1px solid #ddd",
  borderRadius: "6px",
  fontSize: "0.95rem",
  boxSizing: "border-box",
};
