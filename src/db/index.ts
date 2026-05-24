import type { Post } from "@/data/types";

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

function toTursoArg(val: string | number): TursoValue {
  if (typeof val === "number") {
    return { type: "integer", value: String(val) };
  }
  return { type: "text", value: val };
}

async function query(sql: string, args: (string | number)[] = []): Promise<Post[]> {
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
      "Authorization": `Bearer ${AUTH_TOKEN}`,
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

  return result.rows.map(rowToPost);
}

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
