import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { secondaryButtonStyle } from "../styles/common";
import { navTabStyle } from "../styles/common";

const modules = [
  { name: "Variables, Loops and Conditions", path: "/module/01" },
  { name: "Pointers", path: "/module/02" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav style={{
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0 2rem",
      height: "56px",
      borderBottom: "1px solid #ddd",
      backgroundColor: "#fff",
      position: "sticky",
      top: 0,
      zIndex: 100,
    }}>
      <span
        onClick={() => navigate("/")}
        style={{ fontWeight: "bold", marginRight: "1rem", cursor: "pointer" }}
      >
        CodeBasiks
      </span>

      <div style={{ position: "relative" }}>
        <button style={navTabStyle} onClick={() => setDropdownOpen(o => !o)}>
          Modules ▾
        </button>

        {dropdownOpen && (
          <div style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            left: 0,
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "6px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            minWidth: "260px",
            zIndex: 200,
          }}>
            {modules.map((mod, i) => (
              <button
                key={mod.path}
                onClick={() => { setDropdownOpen(false); window.scrollTo(0, 0); navigate(mod.path); }}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "0.75rem 1rem",
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  borderBottom: i < modules.length - 1 ? "1px solid #eee" : "none",
                  cursor: "pointer",
                  fontSize: "0.95rem",
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                {mod.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <button style={navTabStyle} onClick={() => navigate("/roadmap")}>
        Roadmap
      </button>

      <button style={navTabStyle} onClick={() => navigate("/profile")}>
        Profile
      </button>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Connected User */}
      {user ? (
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ fontSize: "0.9rem", color: "#555" }}>👤 {user}</span>
          <button onClick={handleLogout} style={navTabStyle}>
            Logout
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <button onClick={() => navigate("/login")} style={navTabStyle}>
            Login
          </button>
          <button
            onClick={() => navigate("/login?mode=register")}
            style={secondaryButtonStyle}
          >
            Sign up
          </button>
        </div>
      )}
    </nav>
  );
}
