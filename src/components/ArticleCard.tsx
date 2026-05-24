import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/data";
import CategoryPill from "./CategoryPill";
import BreakingBadge from "./BreakingBadge";

export default function ArticleCard({
  post,
  priority = false,
}: {
  post: Post;
  priority?: boolean;
}) {
  return (
    <article className="group rounded-xl overflow-hidden border border-border/10 bg-white shadow-sm transition hover:shadow-md">
      <Link href={`/${post.slug}`} className="block">
        <div className="relative">
          <Image
            src={post.image.src}
            alt={post.image.alt}
            width={1200}
            height={675}
            className="h-48 w-full object-cover sm:h-56"
            unoptimized
            priority={priority}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <CategoryPill category={post.category} variant="dark" />
            {post.isBreaking && <BreakingBadge />}
          </div>
        </div>
        <div className="p-4 space-y-2">
          <h3
            className="line-clamp-2 text-lg font-bold leading-tight text-text-dark group-hover:underline"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {post.title}
          </h3>
          <p
            className="line-clamp-2 text-sm text-text-muted-dark"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between text-xs text-text-muted-dark/70 pt-1">
            <span>
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
