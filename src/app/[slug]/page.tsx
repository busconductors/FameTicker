import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { posts } from "@/data";
import BreakingBadge from "../../components/BreakingBadge";
import CategoryPill from "../../components/CategoryPill";
import ShareButtons from "../../components/ShareButtons";
import RichContent from "../../components/RichContent";
import RelatedArticles from "../../components/RelatedArticles";
import CommentsPlaceholder from "../../components/CommentsPlaceholder";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === decodeURIComponent(slug));
  if (!post) return { title: "Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.image.src, alt: post.image.alt }],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === decodeURIComponent(slug));
  if (!post) return notFound();

  const url = "https://fameticker.netlify.app/" + post.slug;

  return (
    <article>
      {/* Hero image — full width, dark bg */}
      <div className="relative w-full h-[40vh] sm:h-[50vh] overflow-hidden">
        <Image src={post.image.src} alt={post.image.alt} fill className="object-cover" priority unoptimized />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Article content — cream bg */}
      <div className="bg-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl py-8">
            {/* Breadcrumb */}
            <nav className="mb-4 text-xs text-text-muted-dark uppercase tracking-wider">
              <Link href="/" className="hover:text-text-dark">Home</Link>
              <span className="mx-2">/</span>
              <Link href={`/category/${encodeURIComponent(post.category)}`} className="hover:text-text-dark">{post.category}</Link>
              <span className="mx-2">/</span>
              <span className="text-text-dark">{post.title.slice(0, 40)}...</span>
            </nav>

            {/* Badges */}
            <div className="flex items-center gap-2 mb-3">
              {post.isBreaking && <BreakingBadge />}
              <CategoryPill category={post.category} variant="light" />
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-text-dark mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
              {post.title}
            </h1>

            {/* Subheadline */}
            {post.subheadline && (
              <p className="text-base text-text-muted-dark mb-4">{post.subheadline}</p>
            )}

            {/* Byline */}
            <div className="text-sm text-text-muted-dark mb-6">
              By {post.author} • {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} • {post.readTime}
            </div>

            {/* Share buttons */}
            <div className="mb-8">
              <ShareButtons url={url} title={post.title} />
            </div>

            {/* Article body */}
            <div className="prose-content">
              <RichContent content={post.content} />
            </div>

            {/* Tags */}
            <div className="mt-8 pt-6 border-t border-gold-dim">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <Link key={t} href={`/tag/${encodeURIComponent(t)}`} className="bg-[#2A2A2A] text-text-dark/70 text-xs font-medium px-3 py-1.5 rounded-full hover:bg-gold/20 hover:text-gold transition">
                    #{t}
                  </Link>
                ))}
              </div>
            </div>

            {/* Related + Comments */}
            <RelatedArticles current={post} />
            <CommentsPlaceholder />
          </div>
        </div>
      </div>
    </article>
  );
}
