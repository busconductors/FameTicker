import type { Post, TickerMessage } from "@/data/types";

const BASE_URL = process.env.TURSO_DATABASE_URL!.replace(/^libsql:/, "https:");
const AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN!;

interface TursoColumn {
  name: string;
  decltype: string;
}

interface TursoValue {
  type: string;
  value: string;
}

type TursoRow = TursoValue[];

interface TursoResult {
  cols: TursoColumn[];
  rows: TursoRow[];
  rowsAffected?: number;
}

interface TursoResponse {
  baton: string | null;
  base_url: string | null;
  results: Array<{
    type: string;
    response?: {
      type: string;
      result: TursoResult;
    };
  }>;
}

function value(row: TursoRow, col: number): string | null {
  const v = row[col];
  if (!v || v.type === "null") return null;
  return v.value;
}

function rowToPost(row: TursoRow): Post {
  return {
    slug: value(row, 1)!,
    title: value(row, 2)!,
    subheadline: value(row, 3) || undefined,
    excerpt: value(row, 4)!,
    author: value(row, 5)!,
    date: value(row, 6)!,
    readTime: value(row, 7)!,
    category: value(row, 8)! as Post["category"],
    tags: JSON.parse(value(row, 9) || "[]") as string[],
    image: {
      src: value(row, 10)!,
      alt: value(row, 11)!,
      width: value(row, 12) ? Number(value(row, 12)) : undefined,
      height: value(row, 13) ? Number(value(row, 13)) : undefined,
    },
    content: value(row, 14)!,
    isBreaking: value(row, 15) === "1",
    featured: value(row, 16) === "1",
    trending: value(row, 17) === "1",
    popular: value(row, 18) === "1",
  };
}

function rowToTickerMessage(row: TursoRow): TickerMessage {
  return {
    id: Number(value(row, 0)!),
    message: value(row, 1)!,
    priority: Number(value(row, 2) ?? 0),
    isActive: value(row, 3) === "1",
    createdAt: value(row, 4)!,
    updatedAt: value(row, 5)!,
  };
}

function toTursoArg(val: string | number | null): TursoValue {
  if (val === null) return { type: "null", value: "null" };
  if (typeof val === "number") return { type: "integer", value: String(val) };
  return { type: "text", value: val };
}

function postToArgs(post: Omit<Post, "slug"> & { slug?: string }): (string | number | null)[] {
  return [
    post.slug ?? null,
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
  ];
}

const INSERT_POST_SQL = `INSERT INTO posts
  (slug, title, subheadline, excerpt, author, date, read_time, category, tags,
   image_src, image_alt, image_width, image_height, content,
   is_breaking, featured, trending, popular)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

async function executeRaw(sql: string, args: (string | number | null)[] = []): Promise<TursoResult> {
  const stmt: { sql: string; args?: TursoValue[] } = { sql };
  if (args.length > 0) {
    stmt.args = args.map(toTursoArg);
  }

  const body = {
    requests: [{ type: "execute", stmt }],
  };

  const res = await fetch(`${BASE_URL}/v2/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`Turso API error: ${res.status} ${res.statusText}`);
  }

  const data: TursoResponse = await res.json();
  const result = data.results[0]?.response?.result;
  if (!result) throw new Error("No result from Turso pipeline");

  return result;
}

async function executeWrite(
  sql: string,
  args: (string | number | null)[] = []
): Promise<number> {
  const result = await executeRaw(sql, args);
  return result.rowsAffected ?? 0;
}

async function query(sql: string, args: (string | number)[] = []): Promise<Post[]> {
  const result = await executeRaw(sql, args);
  return result.rows.map(rowToPost);
}

// ── Read functions (unchanged API) ──

export async function getFeaturedPost(): Promise<Post | null> {
  const posts = await query("SELECT * FROM posts WHERE featured = 1 LIMIT 1");
  return posts[0] ?? null;
}

export async function getTrendingPosts(limit: number): Promise<Post[]> {
  return query("SELECT * FROM posts WHERE trending = 1 ORDER BY date DESC LIMIT ?", [limit]);
}

export async function getPopularPosts(limit: number): Promise<Post[]> {
  return query("SELECT * FROM posts WHERE popular = 1 ORDER BY date DESC LIMIT ?", [limit]);
}

export async function getBreakingPosts(limit: number): Promise<Post[]> {
  return query("SELECT * FROM posts WHERE is_breaking = 1 OR trending = 1 ORDER BY date DESC LIMIT ?", [limit]);
}

export async function getLatestPosts(limit: number): Promise<Post[]> {
  return query("SELECT * FROM posts ORDER BY date DESC LIMIT ?", [limit]);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await query("SELECT * FROM posts WHERE slug = ? LIMIT 1", [slug]);
  return posts[0] ?? null;
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  return query("SELECT * FROM posts WHERE category = ? ORDER BY date DESC", [category]);
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await query("SELECT * FROM posts WHERE tags LIKE ? ORDER BY date DESC", [`%${tag}%`]);
  return posts.filter((p) =>
    p.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

export async function searchPosts(searchQuery: string): Promise<Post[]> {
  const pattern = `%${searchQuery}%`;
  return query("SELECT * FROM posts WHERE title LIKE ? OR excerpt LIKE ? ORDER BY date DESC", [pattern, pattern]);
}

export async function getRelatedPosts(
  category: string,
  slug: string,
  limit: number
): Promise<Post[]> {
  return query(
    "SELECT * FROM posts WHERE category = ? AND slug != ? ORDER BY date DESC LIMIT ?",
    [category, slug, limit]
  );
}

export async function getAllPosts(): Promise<Post[]> {
  return query("SELECT * FROM posts ORDER BY date DESC");
}

export async function getAllCategories(): Promise<string[]> {
  const posts = await query("SELECT DISTINCT category FROM posts ORDER BY category");
  return posts.map((p) => p.category);
}

// ── Post mutations ──

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function slugExists(slug: string): Promise<boolean> {
  const result = await executeRaw("SELECT 1 FROM posts WHERE slug = ? LIMIT 1", [slug]);
  return result.rows.length > 0;
}

export async function createPost(post: Omit<Post, "slug"> & { slug?: string }): Promise<Post> {
  let slug = post.slug || slugify(post.title);

  // Handle slug collisions
  if (await slugExists(slug)) {
    let suffix = 2;
    let candidate = `${slug}-${suffix}`;
    while (await slugExists(candidate)) {
      suffix++;
      candidate = `${slug}-${suffix}`;
    }
    slug = candidate;
  }

  const args = postToArgs({ ...post, slug });
  await executeWrite(INSERT_POST_SQL, args);

  const created = await getPostBySlug(slug);
  if (!created) throw new Error("Failed to create post");
  return created;
}

export async function updatePost(slug: string, updates: Partial<Post>): Promise<Post | null> {
  const existing = await getPostBySlug(slug);
  if (!existing) return null;

  const merged = { ...existing, ...updates };
  const args = [
    merged.title,
    merged.subheadline ?? null,
    merged.excerpt,
    merged.author,
    merged.date,
    merged.readTime,
    merged.category,
    JSON.stringify(merged.tags),
    merged.image.src,
    merged.image.alt,
    merged.image.width ?? null,
    merged.image.height ?? null,
    merged.content,
    merged.isBreaking ? "1" : "0",
    merged.featured ? "1" : "0",
    merged.trending ? "1" : "0",
    merged.popular ? "1" : "0",
    slug,
  ];

  await executeWrite(
    `UPDATE posts SET
      title = ?, subheadline = ?, excerpt = ?, author = ?, date = ?,
      read_time = ?, category = ?, tags = ?,
      image_src = ?, image_alt = ?, image_width = ?, image_height = ?,
      content = ?, is_breaking = ?, featured = ?, trending = ?, popular = ?
      WHERE slug = ?`,
    args
  );

  return getPostBySlug(slug);
}

export async function deletePost(slug: string): Promise<boolean> {
  const existing = await getPostBySlug(slug);
  if (!existing) return false;
  await executeWrite("DELETE FROM posts WHERE slug = ?", [slug]);
  return true;
}

// ── Ticker messages ──

export async function getTickerMessages(): Promise<TickerMessage[]> {
  const result = await executeRaw(
    "SELECT * FROM ticker_messages ORDER BY priority DESC, created_at DESC"
  );
  return result.rows.map(rowToTickerMessage);
}

export async function getActiveTickerMessages(): Promise<TickerMessage[]> {
  const result = await executeRaw(
    "SELECT * FROM ticker_messages WHERE is_active = 1 ORDER BY priority DESC, created_at DESC"
  );
  return result.rows.map(rowToTickerMessage);
}

export async function createTickerMessage(data: {
  message: string;
  priority?: number;
}): Promise<TickerMessage> {
  await executeWrite(
    "INSERT INTO ticker_messages (message, priority) VALUES (?, ?)",
    [data.message, data.priority ?? 0]
  );

  const result = await executeRaw(
    "SELECT * FROM ticker_messages ORDER BY id DESC LIMIT 1"
  );
  return result.rows.map(rowToTickerMessage)[0];
}

export async function updateTickerMessage(
  id: number,
  data: { message?: string; priority?: number; isActive?: boolean }
): Promise<TickerMessage | null> {
  const existing = await executeRaw(
    "SELECT * FROM ticker_messages WHERE id = ?", [id]
  );
  if (existing.rows.length === 0) return null;

  const current = existing.rows.map(rowToTickerMessage)[0];
  const message = data.message ?? current.message;
  const priority = data.priority ?? current.priority;
  const isActive = data.isActive !== undefined ? (data.isActive ? "1" : "0") : (current.isActive ? "1" : "0");

  await executeWrite(
    `UPDATE ticker_messages SET message = ?, priority = ?, is_active = ?, updated_at = datetime('now') WHERE id = ?`,
    [message, priority, isActive, id]
  );

  const updated = await executeRaw("SELECT * FROM ticker_messages WHERE id = ?", [id]);
  return updated.rows.map(rowToTickerMessage)[0];
}

export async function deleteTickerMessage(id: number): Promise<boolean> {
  const existing = await executeRaw(
    "SELECT * FROM ticker_messages WHERE id = ?", [id]
  );
  if (existing.rows.length === 0) return false;
  await executeWrite("DELETE FROM ticker_messages WHERE id = ?", [id]);
  return true;
}
