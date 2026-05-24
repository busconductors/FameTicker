import PostEditor from "../_components/PostEditor";

export default function NewPostPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-text-dark mb-6" style={{ fontFamily: "var(--font-cormorant-garamond)" }}>
        New Post
      </h2>
      <PostEditor />
    </div>
  );
}
