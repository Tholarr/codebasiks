import cron from "node-cron";
import { pool } from "../db";
import { sendInactivityEmail } from "../mail";

// Runs every day at 9am
export function startInactivityJob() {
  cron.schedule("0 9 * * *", async () => {
    console.log(">> Running inactivity check...");

    try {
      // Find users inactive for 3+ days who have an email
      const result = await pool.query(`
        SELECT id, username, email, last_active
        FROM users
        WHERE email IS NOT NULL
        AND last_active < NOW() - INTERVAL '24 hours'
      `);

      for (const user of result.rows) {
        const daysSince = Math.floor(
          (Date.now() - new Date(user.last_active).getTime()) / (1000 * 60 * 60 * 24)
        );

        await sendInactivityEmail(user.email, user.username, daysSince);
        console.log(`📧 Reminder sent to ${user.username}`);
      }

      console.log(`>> Inactivity check done - ${result.rows.length} email(s) sent`);
    } catch (error) {
      console.error("Inactivity job error:", error);
    }
  });
}
