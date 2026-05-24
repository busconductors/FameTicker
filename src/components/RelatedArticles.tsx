import ArticleCard from "./ArticleCard";
import { posts, type Post } from "@/data";

export default function RelatedArticles({ current }: { current: Post }) {
  const related = posts
    .filter((p) => p.category === current.category && p.slug !== current.slug)
    .slice(0, 4);

  if (!related.length) return null;

  return (
    <section className="mt-12">
      <h3 className="mb-4 text-xl font-bold text-text-dark" style={{ fontFamily: "var(--font-cormorant-garamond)" }}>
        Related Articles
      </h3>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {related.map((p) => (
          <ArticleCard key={p.slug} post={p} />
        ))}
      </div>
    </section>
  );
}
