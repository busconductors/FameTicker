#!/usr/bin/env npx tsx
// Run: TURSO_DATABASE_URL=... TURSO_AUTH_TOKEN=... npx tsx scripts/migrate-ticker.ts

const BASE_URL = process.env.TURSO_DATABASE_URL!.replace(/^libsql:/, "https:");
const AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN!;

async function execute(sql: string) {
  const res = await fetch(`${BASE_URL}/v2/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      requests: [{ type: "execute", stmt: { sql } }],
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Turso API error: ${res.status} ${text}`);
  }
  return res.json();
}

async function main() {
  console.log("Creating ticker_messages table...");

  await execute(`
    CREATE TABLE IF NOT EXISTS ticker_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      message TEXT NOT NULL,
      priority INTEGER NOT NULL DEFAULT 0,
      is_active INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  console.log("Done.");
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
