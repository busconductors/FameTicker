import { posts } from "../src/data/posts";

const BASE_URL = process.env.TURSO_DATABASE_URL!.replace(/^libsql:/, "https:");
const AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN!;

function toArg(val: string | number | null): { type: string; value: string } {
  if (val === null) return { type: "null", value: "null" };
  if (typeof val === "number") return { type: "integer", value: String(val) };
  return { type: "text", value: val };
}

async function execute(sql: string, args: (string | number | null)[] = []) {
  const res = await fetch(`${BASE_URL}/v2/pipeline`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${AUTH_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      requests: [{ type: "execute", stmt: { sql, args: args.map(toArg) } }],
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Turso API error: ${res.status} ${text}`);
  }
  return res.json();
}

async function seed() {
  console.log(`Seeding ${posts.length} articles...`);

  for (const post of posts) {
    await execute(
      `INSERT OR REPLACE INTO posts
        (slug, title, subheadline, excerpt, author, date, read_time, category, tags,
         image_src, image_alt, image_width, image_height, content,
         is_breaking, featured, trending, popular)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        post.slug,
        post.title,
        post.subheadline ?? null,
        post.excerpt,
        post.author,
        post.date,
        post.readTime,
        post.category,
        JSON.stringify(post.tags),
        post.image.src,
        post.image.alt,
        post.image.width ?? null,
        post.image.height ?? null,
        post.content,
        post.isBreaking ? "1" : "0",
        post.featured ? "1" : "0",
        post.trending ? "1" : "0",
        post.popular ? "1" : "0",
      ]
    );
    console.log(`  ✓ ${post.slug}`);
  }

  console.log("Done.");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
