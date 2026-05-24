import Link from "next/link";
import { getAllPosts, getTickerMessages } from "@/db";
import { FileText, Plus, MessageSquare, TrendingUp, Zap, Hash } from "lucide-react";

export default async function AdminDashboard() {
  const [posts, tickerMessages] = await Promise.all([
    getAllPosts(),
    getTickerMessages(),
  ]);

  const breakingCount = posts.filter((p) => p.isBreaking).length;
  const trendingCount = posts.filter((p) => p.trending).length;
  const recentPosts = posts.slice(0, 5);

  return (
    <div className="max-w-6xl">
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            {posts.length} posts · {tickerMessages.length} ticker messages
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/ticker"
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors inline-flex items-center gap-2"
          >
            <MessageSquare size={16} />
            Ticker
          </Link>
          <Link
            href="/admin/posts/new"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors inline-flex items-center gap-2"
          >
            <Plus size={16} />
            New Post
          </Link>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard
          label="Total Posts"
          value={posts.length}
          icon={FileText}
          accent="indigo"
        />
        <StatCard
          label="Breaking"
          value={breakingCount}
          icon={Zap}
          accent="red"
        />
        <StatCard
          label="Trending"
          value={trendingCount}
          icon={TrendingUp}
          accent="amber"
        />
        <StatCard
          label="Ticker Messages"
          value={tickerMessages.length}
          icon={Hash}
          accent="emerald"
        />
      </div>

      {/* ── Recent Posts ── */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Recent Posts
          </h2>
          <Link
            href="/admin/posts"
            className="text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            View all
          </Link>
        </div>

        {recentPosts.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <FileText size={32} className="mx-auto text-gray-300 mb-3" />
            <p className="text-sm text-gray-500">No posts yet</p>
            <Link
              href="/admin/posts/new"
              className="inline-flex items-center gap-1.5 mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              <Plus size={14} />
              Create your first post
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Category
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Date
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Flags
                </th>
              </tr>
            </thead>
            <tbody>
              {recentPosts.map((post) => (
                <tr
                  key={post.slug}
                  className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-5 py-3">
                    <Link
                      href={`/admin/posts/${post.slug}/edit`}
                      className="text-gray-900 font-medium hover:text-indigo-600 transition-colors line-clamp-1"
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-gray-500 hidden sm:table-cell">
                    {post.category}
                  </td>
                  <td className="px-5 py-3 text-gray-500 hidden md:table-cell whitespace-nowrap">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-1.5">
                      {post.isBreaking && <Badge color="red">Breaking</Badge>}
                      {post.featured && <Badge color="indigo">Featured</Badge>}
                      {post.trending && <Badge color="amber">Trending</Badge>}
                      {!post.isBreaking && !post.featured && !post.trending && (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string;
  value: number;
  icon: React.ComponentType<{ size?: number | string }>;
  accent: "indigo" | "red" | "amber" | "emerald";
}) {
  const accentStyles = {
    indigo: "bg-indigo-50 text-indigo-600",
    red: "bg-red-50 text-red-600",
    amber: "bg-amber-50 text-amber-600",
    emerald: "bg-emerald-50 text-emerald-600",
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${accentStyles[accent]}`}
        >
          <Icon size={20} />
        </div>
        <div>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          <p className="text-xs text-gray-500">{label}</p>
        </div>
      </div>
    </div>
  );
}

function Badge({
  color,
  children,
}: {
  color: "indigo" | "red" | "amber";
  children: React.ReactNode;
}) {
  const colors = {
    indigo: "bg-indigo-50 text-indigo-700",
    red: "bg-red-50 text-red-700",
    amber: "bg-amber-50 text-amber-700",
  };
  return (
    <span
      className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors[color]}`}
    >
      {children}
    </span>
  );
}
