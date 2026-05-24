import Link from "next/link";
import { getAllPosts } from "@/db";
import { Plus, Pencil, Trash2 } from "lucide-react";
import DeletePostButton from "./_components/DeletePostButton";

export default async function PostListPage() {
  const posts = await getAllPosts();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-text-dark" style={{ fontFamily: "var(--font-cormorant-garamond)" }}>
          Posts
        </h2>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 rounded-md bg-[var(--accent-gold)] text-white font-medium px-4 py-2 text-sm hover:opacity-90 transition"
        >
          <Plus size={16} />
          New Post
        </Link>
      </div>

      <div className="bg-white border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-border">
            <tr>
              <th className="text-left px-4 py-2.5 font-medium text-text-muted">Title</th>
              <th className="text-left px-4 py-2.5 font-medium text-text-muted hidden sm:table-cell">Category</th>
              <th className="text-left px-4 py-2.5 font-medium text-text-muted hidden md:table-cell">Date</th>
              <th className="text-left px-4 py-2.5 font-medium text-text-muted hidden lg:table-cell">Flags</th>
              <th className="text-right px-4 py-2.5 font-medium text-text-muted w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.slug} className="border-b border-border last:border-0 hover:bg-gray-50">
                <td className="px-4 py-2.5">
                  <span className="text-text-dark font-medium">
                    {post.title.slice(0, 80)}
                    {post.title.length > 80 ? "..." : ""}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-text-muted hidden sm:table-cell">{post.category}</td>
                <td className="px-4 py-2.5 text-text-muted hidden md:table-cell">
                  {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </td>
                <td className="px-4 py-2.5 hidden lg:table-cell">
                  <div className="flex gap-1">
                    {post.isBreaking && <span className="text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded">Breaking</span>}
                    {post.featured && <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">Featured</span>}
                    {post.trending && <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">Trending</span>}
                  </div>
                </td>
                <td className="px-4 py-2.5">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/admin/posts/${post.slug}/edit`}
                      className="p-1.5 text-text-muted hover:text-text-dark hover:bg-gray-200 rounded transition"
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
      </div>
    </div>
  );
}
