import Link from "next/link";
import Hero from "../components/Hero";
import TrendingNow from "../components/TrendingNow";
import ArticleCard from "../components/ArticleCard";
import Sidebar from "../components/Sidebar";
import { getLatestPosts, getPostsByCategory } from "@/db";
import type { Category } from "@/data";

export default async function Home() {
  const sections: { key: Category; title: string }[] = [
    { key: "Relationships", title: "Celebrity Couples" },
    { key: "Music", title: "Music" },
    { key: "Movies", title: "Movies & TV" },
    { key: "Fashion", title: "Fashion" },
    { key: "Reality TV", title: "Reality TV" },
  ];

  const [latest, ...sectionPosts] = await Promise.all([
    getLatestPosts(6),
    ...sections.map((s) => getPostsByCategory(s.key)),
  ]);

  return (
    <>
      <Hero />

      {/* Trending Now + Latest Stories row */}
      <section className="container mx-auto grid gap-8 px-4 py-10 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-8">
          <h2 className="section-header" style={{ fontFamily: "var(--font-oswald)" }}>
            Latest Stories
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {latest.slice(0, 6).map((post, i) => (
              <ArticleCard key={post.slug} post={post} priority={i < 2} />
            ))}
          </div>
        </div>
        <div className="lg:col-span-4 space-y-8">
          <TrendingNow />
          <Sidebar />
        </div>
      </section>

      {/* Category sections with alternating cream backgrounds */}
      {sections.map((s, idx) => (
        <section key={s.key} className={idx % 2 === 0 ? "bg-cream" : "bg-cream-warm"}>
          <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-end justify-between">
              <h2 className="section-header" style={{ fontFamily: "var(--font-oswald)" }}>
                {s.title}
              </h2>
              <Link
                href={`/category/${encodeURIComponent(s.key)}`}
                className="text-sm font-semibold text-text-dark hover:underline"
              >
                View all →
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {sectionPosts[idx].slice(0, 4).map((post) => (
                  <ArticleCard key={post.slug} post={post} />
                ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
