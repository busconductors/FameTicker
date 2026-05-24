import Image from "next/image";
import Link from "next/link";
import { posts } from "@/data";
import BreakingBadge from "./BreakingBadge";
import CategoryPill from "./CategoryPill";

export default function Hero() {
  const feature = posts.find((p) => p.featured) ?? posts[0];

  return (
    <section className="relative w-full">
      <div className="relative h-[60vh] sm:h-[70vh] w-full overflow-hidden">
        <Image
          src={feature.image.src}
          alt={feature.image.alt}
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 sm:p-8 lg:p-12">
          <div className="flex items-center gap-2 mb-3">
            {feature.isBreaking && <BreakingBadge />}
            <CategoryPill category={feature.category} variant="dark" />
          </div>
          <h1
            className="max-w-3xl text-white font-bold leading-tight drop-shadow-lg text-[28px] sm:text-[36px] lg:text-[48px] mb-3"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {feature.title}
          </h1>
          <p className="text-[13px] sm:text-sm text-gold/80 mb-4">
            By {feature.author} &bull;{" "}
            {new Date(feature.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}{" "}
            &bull; {feature.readTime}
          </p>
          <Link
            href={`/${feature.slug}`}
            className="inline-block border border-white/40 text-white px-5 py-2 text-sm font-semibold rounded-md hover:bg-white/10 transition-colors"
          >
            Read More
          </Link>
        </div>
      </div>
    </section>
  );
}
