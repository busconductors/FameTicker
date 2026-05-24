import { notFound } from "next/navigation";
import { getPostBySlug } from "@/db";
import PostEditor from "../../_components/PostEditor";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostBySlug(decodeURIComponent(id));
  if (!post) return notFound();

  return (
    <div>
      <h2 className="text-2xl font-bold text-text-dark mb-6" style={{ fontFamily: "var(--font-cormorant-garamond)" }}>
        Edit Post
      </h2>
      <PostEditor post={post} />
    </div>
  );
}
