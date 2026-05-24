import Link from "next/link";
import { getPopularPosts } from "@/db";
import NewsletterSignup from "./NewsletterSignup";
import TagCloud from "./TagCloud";

export default async function Sidebar() {
  const popular = await getPopularPosts(4);

  return (
    <aside className="space-y-8">
      <section>
        <h3
          className="text-lg font-black uppercase tracking-wider text-foreground"
          style={{ fontFamily: "var(--font-bebas)" }}
        >
          Most Read
        </h3>
        <ul className="mt-3 space-y-3">
          {popular.map((p) => (
            <li
              key={p.slug}
              className="rounded-md border border-border bg-card p-3 hover:bg-muted transition"
            >
              <Link
                href={`/${p.slug}`}
                className="text-sm font-semibold text-foreground hover:underline line-clamp-2"
              >
                {p.title}
              </Link>
              <p className="text-xs text-text-secondary mt-1">{p.category}</p>
            </li>
          ))}
        </ul>
      </section>

      <NewsletterSignup />
      <TagCloud />
    </aside>
  );
}
