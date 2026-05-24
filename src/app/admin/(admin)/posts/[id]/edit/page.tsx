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

  return <PostEditor post={post} />;
}
