import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import PageWrapper from "../components/PageWrapper";
import Navbar from "../components/Navbar";
import { useModuleProgress } from "../hooks/useModuleProgress";
import { primaryButtonStyle } from "../styles/common";

const modules = [
  {
    name: "Variables, Loops and Conditions",
    description: "Learn the building blocks of C programming: how to store data, repeat actions, and make decisions.",
    path: "/module/01",
    icon: "🔤",
    moduleId: "module01",
    totalPerLesson: [4, 4],
  },
  {
    name: "Pointers",
    description: "Understand how memory works in C and how pointers let you directly manipulate it.",
    path: "/module/02",
    icon: "📍",
    moduleId: "module02",
    totalPerLesson: [2, 3, 4],
  },
];

const tags = [
  "Variables", "char", "while loops", "if / else", "Pointers",
  "Strings", "Arrays", "Nested loops", "write()", "Memory addresses",
  "Sorting algorithms", "Parameters", "int", "Arithmetic operators",
];

const faqs = [
  {
    question: "Do I need prior programming experience?",
    answer: "Not at all. CodeBasiks is designed for complete beginners. Each lesson starts from scratch and builds up gradually.",
  },
  {
    question: "How long does it take to complete a module?",
    answer: "It depends on your pace, but most students complete a module in a few hours spread across several sessions. There's no time limit.",
  },
  {
    question: "Is CodeBasiks really free?",
    answer: "Yes, completely. No credit card, no subscription, no hidden fees. Just create an account and start learning.",
  },
  {
    question: "Why am I writing code directly in the browser?",
    answer: "Your code is compiled and executed on our server in real time. You get instant feedback without having to install anything on your machine.",
  },
];

function ModuleCard({ mod }: { mod: typeof modules[0] }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { stars, loaded } = useModuleProgress(mod.moduleId);
  const starsCount = loaded ? stars(mod.totalPerLesson) : 0;
  const starsDisplay = "★".repeat(starsCount) + "☆".repeat(3 - starsCount);

  return (
    <div
      onClick={() => { window.scrollTo(0, 0); navigate(mod.path); }}
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        overflow: "hidden",
        cursor: "pointer",
        transition: "box-shadow 0.2s",
      }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.12)")}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
    >
      <div style={{
        backgroundColor: "#1b3a2f",
        height: "80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 1.25rem",
        fontSize: "2rem",
      }}>
        <span>{mod.icon}</span>
        {user && loaded && <span style={{ fontSize: "1.1rem", color: "#f5a623" }}>{starsDisplay}</span>}
      </div>
      <div style={{ padding: "1rem" }}>
        <h3 style={{ margin: "0 0 0.5rem", fontSize: "1rem", color: "#2e7d32" }}>{mod.name}</h3>
        <p style={{ margin: 0, fontSize: "0.875rem", color: "#555", lineHeight: 1.5 }}>{mod.description}</p>
      </div>
    </div>
  );
}

function InProgressCard({ mod }: { mod: typeof modules[0] }) {
  const navigate = useNavigate();
  const { stars, loaded } = useModuleProgress(mod.moduleId);
  const starsCount = loaded ? stars(mod.totalPerLesson) : 0;

  if (!loaded || starsCount === 0 || starsCount === 3) return null;

  return (
    <div
      onClick={() => { window.scrollTo(0, 0); navigate(mod.path); }}
      style={{
        border: "1px solid #f5a623",
        borderRadius: "8px",
        padding: "1rem 1.25rem",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        cursor: "pointer",
        transition: "box-shadow 0.2s",
      }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)")}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
    >
      <span style={{ fontSize: "1.75rem" }}>{mod.icon}</span>
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontWeight: "bold", fontSize: "0.95rem", color: "#333" }}>{mod.name}</p>
        <p style={{ margin: 0, fontSize: "0.8rem", color: "#888" }}>
          {"★".repeat(starsCount)}{"☆".repeat(3 - starsCount)}
        </p>
      </div>
      <span style={{ fontSize: "0.85rem", color: "#f5a623", fontWeight: "bold" }}>Continue →</span>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #eee" }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%",
          textAlign: "left",
          background: "none",
          border: "none",
          padding: "1rem 0",
          fontSize: "0.95rem",
          fontWeight: "500",
          cursor: "pointer",
          color: "#333",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {question}
        <span style={{ color: "#2e7d32", fontSize: "1.2rem" }}>{open ? "−" : "+"}</span>
      </button>
      {open && (
        <p style={{ margin: "0 0 1rem", color: "#555", fontSize: "0.875rem", lineHeight: 1.7 }}>
          {answer}
        </p>
      )}
    </div>
  );
}

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <div style={{ fontFamily: "sans-serif" }}>
        <Navbar />

        {/* Hero */}
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "3rem 2rem 2rem", lineHeight: 1.7 }}>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>CodeBasiks</h1>
          {user && (
            <p style={{ fontSize: "1.1rem", color: "#2e7d32", marginBottom: "0.25rem" }}>
              Welcome back, {user}!
            </p>
          )}
          <p style={{ color: "#555", marginBottom: "1rem", fontSize: "1.05rem" }}>
            Learn programming fundamentals step by step, through interactive lessons and real coding exercises.
          </p>
          <p style={{ color: "#aaa", fontSize: "0.85rem", marginBottom: "2rem" }}>
            🎓 Join 500+ students already learning
          </p>
          {!user && (
            <button onClick={() => navigate("/login?mode=register")} style={primaryButtonStyle}>
              Get started for free →
            </button>
          )}
        </div>

        <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 2rem" }}>

          {/* Continue learning */}
          {user && (
            <>
              <div style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                <h2 style={{ margin: 0, fontSize: "1.2rem" }}>Continue learning</h2>
                <div style={{ flex: 1, height: "1px", backgroundColor: "#ddd" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "3rem" }}>
                {modules.map(mod => (
                  <InProgressCard key={mod.moduleId} mod={mod} />
                ))}
              </div>
            </>
          )}

        </div>

        {/* How it works */}
        <div style={{ backgroundColor: "#f9f9f9", padding: "1rem 2rem" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: "2rem", textAlign: "center" }}>How it works</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
              {[
                { icon: "📖", title: "Read the lesson", desc: "Each lesson introduces new concepts step by step, with examples and code snippets." },
                { icon: "✅", title: "Answer the quiz", desc: "Test your understanding with a short question before moving on to the exercise." },
                { icon: "💻", title: "Code it yourself", desc: "Write real C code directly in the browser and get instant feedback on your solution." },
              ].map(step => (
                <div key={step.title} style={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  padding: "1.5rem",
                  border: "1px solid #eee",
                  textAlign: "center",
                }}>
                  <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{step.icon}</div>
                  <h3 style={{ margin: "0 0 0.5rem", fontSize: "1rem", color: "#2e7d32" }}>{step.title}</h3>
                  <p style={{ margin: 0, fontSize: "0.875rem", color: "#555", lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 860, margin: "0 auto", padding: "1rem 2rem" }}>

          {/* What you'll learn */}
          <h2 style={{ fontSize: "1.4rem", marginBottom: "1.5rem" }}>What you'll learn</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "3rem" }}>
            {tags.map(tag => (
              <span key={tag} style={{
                backgroundColor: "#e8f5e9",
                color: "#2e7d32",
                padding: "0.3rem 0.75rem",
                borderRadius: "999px",
                fontSize: "0.85rem",
                fontWeight: "500",
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Why C? */}
          <div style={{
            backgroundColor: "#1b3a2f",
            borderRadius: "8px",
            padding: "2rem",
            marginBottom: "3rem",
            color: "white",
          }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem", color: "white" }}>Why C?</h2>
            <p style={{ margin: "0 0 0.75rem", color: "#a5d6a7", lineHeight: 1.7 }}>
              C is one of the oldest and most influential programming languages in existence. Nearly every modern operating system, compiler, and low-level tool is written in C or directly inspired by it.
            </p>
            <p style={{ margin: "0 0 0.75rem", color: "#a5d6a7", lineHeight: 1.7 }}>
              Learning C forces you to understand how computers actually work (memory, pointers, data types) concepts that most high-level languages hide from you. Once you understand C, every other language becomes easier.
            </p>
            <p style={{ margin: 0, color: "#a5d6a7", lineHeight: 1.7 }}>
              It is not the easiest language to start with, but it is the most rewarding. CodeBasiks is designed to make that journey as smooth as possible.
            </p>
          </div>

          {/* FAQ */}
          <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>Frequently asked questions</h2>
          <div style={{ marginBottom: "3rem" }}>
            {faqs.map(faq => (
              <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>

          {/* Modules */}
          <div style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "1rem" }}>
            <h2 style={{ margin: 0, fontSize: "1.2rem" }}>Modules</h2>
            <div style={{ flex: 1, height: "1px", backgroundColor: "#ddd" }} />
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "1.25rem",
          }}>
            {modules.map(mod => (
              <ModuleCard key={mod.path} mod={mod} />
            ))}
          </div>

        </div>
      </div>
    </PageWrapper>
  );
}
