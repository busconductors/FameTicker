import React from "react";
import { Facebook, MessageCircle, MessageSquare } from "lucide-react";

export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const links = [
    {
      name: "X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: MessageCircle,
    },
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: Facebook,
    },
    {
      name: "Reddit",
      href: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
      icon: MessageSquare,
    },
  ];
  return (
    <div className="flex flex-wrap items-center gap-2">
      {links.map((l) => (
        <a
          key={l.name}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border border-border bg-card px-3 py-1 text-xs font-semibold hover:bg-muted inline-flex items-center gap-1"
        >
          <l.icon className="h-3 w-3" />
          Share on {l.name}
        </a>
      ))}
    </div>
  );
}
