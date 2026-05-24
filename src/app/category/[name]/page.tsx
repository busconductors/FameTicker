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
    description: cat ? `Latest ${cat} news, gossip, and updates on Spill It Now.` : undefined,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const cat = normalizeCategory(name);
  if (!cat) {
    return (
      <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black" style={{ fontFamily: "var(--font-bebas)" }}>
          Category Not Found
        </h1>
        <p className="mt-2">We couldn't find that category.</p>
      </div>
    );
  }

  const items = posts.filter((p) => p.category === cat);

  return (
    <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-end justify-between">
        <h1 className="text-3xl font-black" style={{ fontFamily: "var(--font-bebas)" }}>
          {cat}
        </h1>
        <Link href="/" className="text-sm font-semibold hover:underline">
          Home
        </Link>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
