"use client";

import { useState, useTransition } from "react";
import type { Post } from "@/data/types";
import { categories } from "@/data/types";
import { createPostAction, updatePostAction } from "../../../actions";

interface PostEditorProps {
  post?: Post;
}

export default function PostEditor({ post }: PostEditorProps) {
  const isEdit = !!post;
  const [error, setError] = useState<string>();
  const [pending, startTransition] = useTransition();

  // Local state for the tag chip input
  const [tags, setTags] = useState<string[]>(post?.tags ?? []);
  const [tagInput, setTagInput] = useState("");

  // Local state for image preview
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>(
    post?.image?.src ?? ""
  );
  const [imagePreviewError, setImagePreviewError] = useState(false);

  function handleSubmit(formData: FormData) {
    setError(undefined);
    startTransition(async () => {
      const result = isEdit
        ? await updatePostAction(post!.slug, formData)
        : await createPostAction(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  }

  function addTag() {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setTagInput("");
  }

  function removeTag(tag: string) {
    setTags(tags.filter((t) => t !== tag));
  }

  function handleTagKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Sticky Top Bar ── */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">
            {isEdit ? "Edit Post" : "New Post"}
          </h1>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="post-editor-form"
              disabled={pending}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50 transition-colors"
            >
              {pending
                ? "Saving..."
                : isEdit
                  ? "Update Post"
                  : "Publish Post"}
            </button>
          </div>
        </div>
      </div>

      {/* ── Form Body ── */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6">
        {/* Error Banner */}
        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700 mb-6">
            {error}
          </div>
        )}

        <form id="post-editor-form" action={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-6">
            {/* ── Left Panel ── */}
            <div className="flex-1 min-w-0 space-y-6">
              {/* Title */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
                <Field label="Title" required>
                  <input
                    name="title"
                    type="text"
                    required
                    defaultValue={post?.title}
                    placeholder="Post title"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-2xl font-semibold text-gray-900 placeholder:text-gray-400 transition-colors focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none"
                  />
                </Field>
              </div>

              {/* Slug */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
                <Field
                  label="Slug"
                  hint="Auto-generated from title if left blank"
                >
                  <input
                    name="slug"
                    type="text"
                    defaultValue={post?.slug}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none"
                  />
                </Field>
              </div>

              {/* Subheadline */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
                <Field label="Subheadline">
                  <input
                    name="subheadline"
                    type="text"
                    defaultValue={post?.subheadline}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none"
                  />
                </Field>
              </div>

              {/* Excerpt */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
                <Field label="Excerpt">
                  <textarea
                    name="excerpt"
                    rows={3}
                    defaultValue={post?.excerpt}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none"
                  />
                </Field>
              </div>

              {/* Content */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
                <Field label="Content (HTML)">
                  <textarea
                    name="content"
                    rows={20}
                    defaultValue={post?.content}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 font-mono text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none"
                  />
                </Field>
              </div>
            </div>

            {/* ── Right Panel ── */}
            <div className="w-full md:w-80 flex-shrink-0 space-y-6">
              {/* Metadata */}
              <SectionCard title="Metadata">
                <div className="space-y-4">
                  <Field label="Author" required>
                    <input
                      name="author"
                      type="text"
                      required
                      defaultValue={post?.author ?? "Jane Lytvynenko"}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none"
                    />
                  </Field>

                  <Field label="Date" required>
                    <input
                      name="date"
                      type="datetime-local"
                      required
                      defaultValue={
                        post?.date
                          ? post.date.slice(0, 16)
                          : new Date().toISOString().slice(0, 16)
                      }
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none"
                    />
                  </Field>

                  <Field label="Read Time" required>
                    <input
                      name="readTime"
                      type="text"
                      required
                      defaultValue={post?.readTime ?? "5 min read"}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none"
                    />
                  </Field>

                  <Field label="Category" required>
                    <select
                      name="category"
                      required
                      defaultValue={post?.category ?? "News"}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
              </SectionCard>

              {/* Tags */}
              <SectionCard title="Tags">
                <div className="space-y-4">
                  {/* Hidden input for form submission */}
                  <input
                    type="hidden"
                    name="tags"
                    value={tags.join(", ")}
                  />

                  {/* Tag chips */}
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-gray-100 text-gray-700 rounded-full text-xs px-2.5 py-1 flex items-center gap-1"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                              className="w-3 h-3"
                            >
                              <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                            </svg>
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Tag input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Add a tag
                    </label>
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleTagKeyDown}
                      onBlur={addTag}
                      placeholder="Type and press Enter..."
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
              </SectionCard>

              {/* Image */}
              <SectionCard title="Image">
                <div className="space-y-4">
                  <Field label="Image URL" required>
                    <input
                      name="image_src"
                      type="url"
                      required
                      defaultValue={post?.image?.src}
                      onChange={(e) => {
                        setImagePreviewUrl(e.target.value);
                        setImagePreviewError(false);
                      }}
                      onBlur={(e) => {
                        setImagePreviewUrl(e.target.value);
                      }}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none"
                    />
                  </Field>

                  <Field label="Alt Text" required>
                    <input
                      name="image_alt"
                      type="text"
                      required
                      defaultValue={post?.image?.alt}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none"
                    />
                  </Field>

                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Width">
                      <input
                        name="image_width"
                        type="number"
                        defaultValue={post?.image?.width ?? ""}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none"
                      />
                    </Field>
                    <Field label="Height">
                      <input
                        name="image_height"
                        type="number"
                        defaultValue={post?.image?.height ?? ""}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none"
                      />
                    </Field>
                  </div>

                  {/* Image Preview */}
                  {imagePreviewUrl && !imagePreviewError && (
                    <div>
                      <p className="block text-sm font-medium text-gray-700 mb-1.5">
                        Preview
                      </p>
                      <img
                        src={imagePreviewUrl}
                        alt="Preview"
                        onError={() => setImagePreviewError(true)}
                        className="max-h-40 rounded-md border border-gray-200 object-cover"
                      />
                    </div>
                  )}
                </div>
              </SectionCard>

              {/* Flags */}
              <SectionCard title="Flags">
                <div className="grid grid-cols-2 gap-3">
                  <CheckboxField
                    name="isBreaking"
                    label="Breaking"
                    defaultChecked={post?.isBreaking}
                  />
                  <CheckboxField
                    name="featured"
                    label="Featured (Hero)"
                    defaultChecked={post?.featured}
                  />
                  <CheckboxField
                    name="trending"
                    label="Trending"
                    defaultChecked={post?.trending}
                  />
                  <CheckboxField
                    name="popular"
                    label="Popular"
                    defaultChecked={post?.popular}
                  />
                </div>
              </SectionCard>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Sub-Components ──

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
    </div>
  );
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
      <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
        {title}
      </h2>
      {children}
    </div>
  );
}

function CheckboxField({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
      />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );
}
