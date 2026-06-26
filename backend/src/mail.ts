import nodemailer from "nodemailer";

// Transporter configured with Gmail
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Send an inactivity reminder email
export async function sendInactivityEmail(to: string, username: string, daysSinceLastActive: number) {
  await transporter.sendMail({
    from: `"CodeBasiks" <${process.env.MAIL_USER}>`,
    to,
    subject: "We miss you on CodeBasiks! 👋",
    html: `
      <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 2rem;">
        <h1 style="color: #2e7d32;">Hey ${username}! 👋</h1>
        <p>It's been <strong>${daysSinceLastActive} days</strong> since you last visited CodeBasiks.</p>
        <p>You were making great progress, don't let it stop now!</p>
        <p>Every line of code you write brings you closer to mastering programming fundamentals. Your future self will thank you.</p>
        <a href="https://codebasiks.vercel.app" style="
          display: inline-block;
          margin-top: 1rem;
          padding: 0.75rem 1.5rem;
          background-color: #2e7d32;
          color: white;
          text-decoration: none;
          border-radius: 6px;
          font-size: 1rem;
        ">
          🚀 Continue learning →
        </a>
        <p style="margin-top: 2rem; color: #888; font-size: 0.85rem;">
          You're receiving this email because you registered on CodeBasiks.
        </p>
      </div>
    `,
  });
}
