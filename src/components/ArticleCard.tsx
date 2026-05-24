import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/data";

export default function ArticleCard({ post }: { post: Post }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-border bg-card transition hover:shadow-elevated">
      <Link href={`/${post.slug}`} className="block">
        <div className="relative">
          <Image
            src={post.image.src}
            alt={post.image.alt}
            width={1200}
            height={675}
            className="h-48 w-full object-cover sm:h-56"
            unoptimized
          />
          <div className="absolute left-3 top-3">
            <span className="badge border-transparent bg-secondary/90 text-secondary-foreground">
              {post.category}
            </span>
          </div>
        </div>
        <div className="space-y-2 p-4">
          <h3 className="line-clamp-2 text-lg font-extrabold leading-tight group-hover:underline" style={{ fontFamily: "var(--font-bebas)" }}>
            {post.title}
          </h3>
          <p className="line-clamp-2 text-sm text-foreground/80">{post.excerpt}</p>
          <div className="pt-1 text-xs text-foreground/60">
            {new Date(post.date).toLocaleDateString()} • {post.readTime} min read
          </div>
        </div>
      </Link>
    </article>
  );
}
