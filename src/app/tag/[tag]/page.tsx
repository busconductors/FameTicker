import type { Metadata } from "next";
import ArticleCard from "../../../components/ArticleCard";
import { posts } from "@/data";

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const { tag: rawTag } = await params;
  const tag = decodeURIComponent(rawTag);
  return {
    title: `#${tag}`,
    description: `Articles tagged with #${tag} on Fame Ticker.`,
  };
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag: rawTag } = await params;
  const tag = decodeURIComponent(rawTag);
  const results = posts.filter((p) => p.tags.some((t) => t.toLowerCase() === tag.toLowerCase()));

  return (
    <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1
          className="text-3xl font-bold text-gold"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          #{tag}
        </h1>
        <p
          className="text-text-muted-dark text-sm"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          {results.length} article{results.length === 1 ? "" : "s"}
        </p>
      </div>

      <section className="bg-cream rounded-md p-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
