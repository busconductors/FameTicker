import Link from "next/link";
import { getAllPosts, getTickerMessages } from "@/db";
import { FileText, Plus, MessageSquare } from "lucide-react";

export default async function AdminDashboard() {
  const [posts, tickerMessages] = await Promise.all([
    getAllPosts(),
    getTickerMessages(),
  ]);

  const breakingCount = posts.filter((p) => p.isBreaking).length;
  const recentPosts = posts.slice(0, 5);

  return (
    <div>
      <h2 className="text-2xl font-bold text-text-dark mb-6" style={{ fontFamily: "var(--font-cormorant-garamond)" }}>
        Dashboard
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        <StatCard label="Total Posts" value={posts.length} icon={FileText} />
        <StatCard label="Breaking Posts" value={breakingCount} icon={MessageSquare} />
        <StatCard label="Ticker Messages" value={tickerMessages.length} icon={MessageSquare} />
      </div>

      <div className="flex gap-3 mb-8">
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 rounded-md bg-[var(--accent-gold)] text-white font-medium px-4 py-2 text-sm hover:opacity-90 transition"
        >
          <Plus size={16} />
          New Post
        </Link>
        <Link
          href="/admin/ticker"
          className="inline-flex items-center gap-2 rounded-md border border-border bg-white text-text-dark font-medium px-4 py-2 text-sm hover:bg-gray-50 transition"
        >
          <MessageSquare size={16} />
          Manage Ticker
        </Link>
      </div>

      <h3 className="text-lg font-semibold text-text-dark mb-3">Recent Posts</h3>
      <div className="bg-white border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-border">
            <tr>
              <th className="text-left px-4 py-2.5 font-medium text-text-muted">Title</th>
              <th className="text-left px-4 py-2.5 font-medium text-text-muted">Category</th>
              <th className="text-left px-4 py-2.5 font-medium text-text-muted">Date</th>
              <th className="text-left px-4 py-2.5 font-medium text-text-muted">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentPosts.map((post) => (
              <tr key={post.slug} className="border-b border-border last:border-0">
                <td className="px-4 py-2.5">
                  <Link
                    href={`/admin/posts/${post.slug}/edit`}
                    className="text-text-dark hover:text-[var(--accent-gold)] transition"
                  >
                    {post.title.slice(0, 60)}
                    {post.title.length > 60 ? "..." : ""}
                  </Link>
                </td>
                <td className="px-4 py-2.5 text-text-muted">{post.category}</td>
                <td className="px-4 py-2.5 text-text-muted">
                  {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </td>
                <td className="px-4 py-2.5">
                  <div className="flex gap-1">
                    {post.isBreaking && <Badge color="red">Breaking</Badge>}
                    {post.featured && <Badge color="gold">Featured</Badge>}
                    {post.trending && <Badge color="blue">Trending</Badge>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: React.ComponentType<{ size?: number | string }>;
}) {
  return (
    <div className="bg-white border border-border rounded-lg p-4 flex items-center gap-3">
      <div className="w-10 h-10 rounded-md bg-[var(--accent-gold)]/10 flex items-center justify-center text-[var(--accent-gold)]">
        <Icon size={20} />
      </div>
      <div>
        <p className="text-2xl font-bold text-text-dark">{value}</p>
        <p className="text-xs text-text-muted">{label}</p>
      </div>
    </div>
  );
}

function Badge({ color, children }: { color: "red" | "gold" | "blue"; children: React.ReactNode }) {
  const colors = {
    red: "bg-red-100 text-red-700",
    gold: "bg-amber-100 text-amber-700",
    blue: "bg-blue-100 text-blue-700",
  };
  return (
    <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${colors[color]}`}>
      {children}
    </span>
  );
}
