import Link from "next/link";
import { getTrendingPosts } from "@/db";

export default async function TrendingNow() {
  const trending = await getTrendingPosts(5);

  return (
    <section className="bg-cream-warm rounded-xl p-6">
      <h2
        className="section-header"
        style={{ fontFamily: "var(--font-bebas)" }}
      >
        Trending Now
      </h2>
      <ol>
        {trending.map((post, i) => (
          <li
            key={post.slug}
            className="flex items-start gap-3 py-3 border-b border-gold-dim last:border-b-0"
          >
            <span
              className="text-gold font-bold text-[24px] leading-none min-w-[2rem] shrink-0"
              style={{ fontFamily: "var(--font-cormorant-garamond)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <Link href={`/${post.slug}`}>
                <span className="text-text-dark font-semibold text-[15px] leading-snug line-clamp-2 hover:underline">
                  {post.title}
                </span>
              </Link>
              <p className="text-xs text-text-muted-dark uppercase tracking-wide mt-0.5">
                {post.category}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
