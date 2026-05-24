import Image from "next/image";
import Link from "next/link";
import { posts } from "@/data";

export default function Hero() {
  const feature = posts.find((p) => p.featured) ?? posts[0];
  return (
    <section className="relative">
      <div className="container mx-auto grid items-stretch gap-6 px-4 py-8 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-12">
        <div className="relative overflow-hidden rounded-2xl border border-border shadow-elevated lg:col-span-8">
          <Image
            src={feature.image.src}
            alt={feature.image.alt}
            width={1600}
            height={900}
            className="h-72 w-full object-cover sm:h-96 lg:h-[520px]"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <div className="mb-2 inline-flex items-center gap-2">
              <span className="badge border-transparent bg-primary/90 text-primary-foreground">Breaking</span>
              <span className="badge">{feature.category}</span>
            </div>
            <h1 className="mb-2 text-3xl font-black leading-tight text-white drop-shadow sm:text-4xl lg:text-5xl" style={{ fontFamily: "var(--font-bebas)" }}>
              {feature.title}
            </h1>
            <p className="max-w-3xl text-sm text-white/90 sm:text-base">
              {feature.excerpt}
            </p>
            <div className="mt-4 text-xs text-white/80">
              By {feature.author} • {new Date(feature.date).toLocaleDateString()} • {feature.readTime} min read
            </div>
            <Link
              href={`/${feature.slug}`}
              className="mt-5 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Read More
            </Link>
          </div>
        </div>
        <div className="grid content-start gap-4 lg:col-span-4">
          <h2 className="text-lg font-black tracking-tight" style={{ fontFamily: "var(--font-bebas)" }}>
            Trending Now
          </h2>
          <ul className="space-y-3">
            {posts
              .filter((p) => p.trending)
              .slice(0, 5)
              .map((p, i) => (
                <li key={p.slug} className="group relative rounded-lg border border-border bg-card p-3 hover:bg-muted/60">
                  <Link href={`/${p.slug}`} className="flex items-center gap-3">
                    <span className="text-sm font-bold text-secondary">{String(i + 1).padStart(2, "0")}</span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold group-hover:underline">
                        {p.title}
                      </p>
                      <span className="text-xs text-foreground/60">{p.category}</span>
                    </div>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
