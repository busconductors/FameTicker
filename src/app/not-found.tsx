import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
      <h1 className="text-8xl font-bold opacity-10 text-foreground" style={{ fontFamily: "var(--font-playfair)" }}>
        404
      </h1>
      <h2 className="-mt-8 text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-playfair)" }}>
        Page Not Found
      </h2>
      <p className="mt-3 max-w-md text-foreground/80">
        This tea has gone cold. The page you're looking for doesn't exist or has been moved.
      </p>
      <Link href="/" className="btn-primary mt-6 inline-flex rounded-md px-4 py-2 text-sm font-semibold">
        Back to Home
      </Link>
    </div>
  );
}
