import React from "react";

export default function RichContent({ content }: { content: string[] }) {
  return (
    <div className="prose prose-zinc max-w-none dark:prose-invert">
      {content.map((block, idx) => {
        const yt = /<youtube id=\"([\w-]{6,})\"><\/youtube>/.exec(block);
        if (yt) {
          const id = yt[1];
          return (
            <div key={idx} className="my-6 aspect-video w-full overflow-hidden rounded-lg border border-border">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${id}`}
                title="YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          );
        }
        return (
          <p key={idx} className="leading-relaxed">
            {block}
          </p>
        );
      })}
    </div>
  );
}
