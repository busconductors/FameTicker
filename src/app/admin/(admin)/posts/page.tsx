import Link from "next/link";
import { getAllPosts } from "@/db";
import { Plus, Pencil } from "lucide-react";
import DeletePostButton from "./_components/DeletePostButton";

export default async function PostListPage() {
  const posts = await getAllPosts();

  return (
    <div className="max-w-6xl">
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Posts</h1>
          <p className="text-sm text-gray-500 mt-1">{posts.length} posts total</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors inline-flex items-center gap-2"
        >
          <Plus size={16} />
          New Post
        </Link>
      </div>

      {/* ── Table ── */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        {posts.length === 0 ? (
          <div className="px-5 py-12 text-center">
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
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Flags
                </th>
                <th className="text-right px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
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
                  <td className="px-5 py-3 hidden lg:table-cell">
                    <div className="flex gap-1.5">
                      {post.isBreaking && (
                        <span className="text-xs font-medium bg-red-50 text-red-700 px-2 py-0.5 rounded-full">
                          Breaking
                        </span>
                      )}
                      {post.featured && (
                        <span className="text-xs font-medium bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full">
                          Featured
                        </span>
                      )}
                      {post.trending && (
                        <span className="text-xs font-medium bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">
                          Trending
                        </span>
                      )}
                      {!post.isBreaking && !post.featured && !post.trending && (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/posts/${post.slug}/edit`}
                        className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                        title="Edit"
                      >
                        <Pencil size={14} />
                      </Link>
                      <DeletePostButton slug={post.slug} />
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
