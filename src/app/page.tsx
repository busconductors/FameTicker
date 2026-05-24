import Hero from "../components/Hero";
import ArticleCard from "../components/ArticleCard";
import Sidebar from "../components/Sidebar";
import { posts, type Category } from "@/data";

export default function Home() {
  const latest = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const sections: { key: Category; title: string }[] = [
    { key: "Relationships", title: "Celebrity Couples" },
    { key: "Music", title: "Music" },
    { key: "Movies", title: "Movies & TV" },
    { key: "Fashion", title: "Fashion" },
    { key: "Reality TV", title: "Reality TV" },
  ];

  return (
    <>
      <Hero />

      <section className="container mx-auto grid gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-8">
          <h2 className="mb-4 text-xl font-black" style={{ fontFamily: "var(--font-bebas)" }}>
            Latest Stories
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {latest.slice(0, 6).map((post, i) => (
              <ArticleCard key={post.slug} post={post} priority={i < 2} />
            ))}
          </div>
        </div>
        <div className="lg:col-span-4">
          <Sidebar />
        </div>
      </section>

      {sections.map((s) => (
        <section key={s.key} className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-end justify-between">
            <h2 className="text-xl font-black" style={{ fontFamily: "var(--font-bebas)" }}>
              {s.title}
            </h2>
            <a className="text-sm font-semibold hover:underline" href={`/category/${encodeURIComponent(s.key)}`}>
              View all
            </a>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {posts
              .filter((p) => p.category === s.key)
              .slice(0, 4)
              .map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
          </div>
        </section>
      ))}
    </>
  );
}
