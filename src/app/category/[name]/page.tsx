import type { Metadata } from "next";
import Link from "next/link";
import ArticleCard from "../../../components/ArticleCard";
import { posts, categories, type Category } from "@/data";

function normalizeCategory(name: string): Category | null {
  const decoded = decodeURIComponent(name).toLowerCase();
  const found = categories.find((c) => c.toLowerCase() === decoded);
  return found ?? null;
}

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }): Promise<Metadata> {
  const { name } = await params;
  const cat = normalizeCategory(name);
  return {
    title: cat ?? "Category Not Found",
    description: cat ? `Latest ${cat} news, gossip, and updates on Fame Ticker.` : undefined,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const cat = normalizeCategory(name);
  if (!cat) {
    return (
      <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <section className="bg-cream rounded-md p-6 sm:p-8">
          <h1
            className="text-3xl sm:text-4xl font-bold text-text-dark"
            style={{ fontFamily: "var(--font-cormorant-garamond)" }}
          >
            Category Not Found
          </h1>
          <p
            className="mt-2 text-text-muted-dark"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            We couldn&apos;t find that category.
          </p>
        </section>
      </div>
    );
  }

  const items = posts.filter((p) => p.category === cat);

  return (
    <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1
            className="text-4xl font-bold text-[var(--accent-gold)]"
            style={{ fontFamily: "var(--font-cormorant-garamond)" }}
          >
            {cat}
          </h1>
          <p
            className="text-text-muted-dark text-sm"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {items.length} article{items.length === 1 ? "" : "s"}
          </p>
        </div>
        <Link
          href="/"
          className="text-sm text-text-muted-dark hover:text-text-dark"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Home
        </Link>
      </div>

      <section className="bg-cream rounded-md p-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
