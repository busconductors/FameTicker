import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { posts } from "@/data";
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

  const url = `https://spillitnow.space/${post.slug}`;

  return (
    <article>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl py-8">
          <div className="relative overflow-hidden rounded-2xl border border-border">
            <Image
              src={post.image.src}
              alt={post.image.alt}
              width={1600}
              height={900}
              className="h-64 w-full object-cover sm:h-96"
              priority
              unoptimized
            />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="badge border-transparent bg-secondary/90 text-secondary-foreground">
              {post.category}
            </span>
            {post.tags.slice(0, 3).map((t) => (
              <Link key={t} href={`/tag/${encodeURIComponent(t)}`} className="badge hover:bg-muted">
                #{t}
              </Link>
            ))}
          </div>

          <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl" style={{ fontFamily: "var(--font-bebas)" }}>
            {post.title}
          </h1>
          {post.subheadline && (
            <p className="mt-2 text-base text-foreground/80">{post.subheadline}</p>
          )}

          <div className="mt-3 text-xs text-foreground/60">
            By {post.author} • {new Date(post.date).toLocaleDateString()} • {post.readTime} min read
          </div>

          <div className="mt-4">
            <ShareButtons url={url} title={post.title} />
          </div>

          <div className="mt-8 space-y-6">
            <RichContent content={post.content} />
          </div>

          <RelatedArticles current={post} />
          <CommentsPlaceholder />
        </div>
      </div>
    </article>
  );
}
