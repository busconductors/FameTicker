import type { Metadata } from "next";
import ArticleCard from "../../components/ArticleCard";
import { posts } from "@/data";

export const metadata: Metadata = {
  title: "Search",
  description: "Search celebrity news, gossip, and entertainment updates on Spill It Now.",
};

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q: rawQ } = await searchParams;
  const q = (rawQ ?? "").trim();
  const results = q
    ? posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q.toLowerCase()) ||
          p.excerpt.toLowerCase().includes(q.toLowerCase())
      )
    : [];

  return (
    <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-4 text-3xl font-black" style={{ fontFamily: "var(--font-bebas)" }}>
        Search
      </h1>
      <form action="/search" className="mb-6 max-w-xl">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Search gossip..."
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </form>

      {q && (
        <p className="mb-4 text-sm text-foreground/70">
          {results.length} result{results.length === 1 ? "" : "s"} for "{q}"
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
