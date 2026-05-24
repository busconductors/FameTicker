export default function RichContent({ content }: { content: string }) {
  return (
    <div
      className="prose prose-lg max-w-none"
      style={{
        fontFamily: "var(--font-playfair)",
        color: "var(--text-dark)",
      }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
