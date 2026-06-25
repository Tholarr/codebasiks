import { createContext, useContext, useState, ReactNode } from "react";

type AuthContextType = {
  user: string | null;
  token: string | null;
  login: (username: string, token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]   = useState<string | null>(localStorage.getItem("user"));
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  const login = (username: string, token: string) => {
    localStorage.setItem("user", username);
    localStorage.setItem("token", token);
    setUser(username);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
