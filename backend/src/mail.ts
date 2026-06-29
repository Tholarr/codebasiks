import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function formatInactivity(minutes: number): string {
  if (minutes < 60)
    return `${minutes} minute${minutes > 1 ? "s" : ""}`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24)
    return `${hours} hour${hours > 1 ? "s" : ""}`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? "s" : ""}`;
}

export async function sendInactivityEmail(to: string, username: string, minutesSinceLastActive: number) {
  const duration = formatInactivity(minutesSinceLastActive);

  await transporter.sendMail({
    from: `"CodeBasiks" <${process.env.MAIL_USER}>`,
    to,
    subject: "We miss you on CodeBasiks! 👋",
    html: `
      <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 2rem;">
        <h1 style="color: #2e7d32;">Hey ${username}! 👋</h1>
        <p>It's been <strong>${duration}</strong> since you last visited CodeBasiks.</p>
        <p>You were making great progress, don't let it stop now!</p>
        <p>Every challenge you complete brings you one step closer to thinking like a programmer.</p>
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
