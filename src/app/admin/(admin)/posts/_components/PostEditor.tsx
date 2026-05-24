"use client";

import { useActionState } from "react";
import type { Post } from "@/data/types";
import { categories } from "@/data/types";
import { createPostAction, updatePostAction } from "../../../actions";

interface PostEditorProps {
  post?: Post;
}

const initState: { error?: string } = {};

export default function PostEditor({ post }: PostEditorProps) {
  const isEdit = !!post;

  const createAction = async (_prev: typeof initState, formData: FormData) => {
    return createPostAction(formData);
  };

  const editAction = async (_prev: typeof initState, formData: FormData) => {
    return updatePostAction(post!.slug, formData);
  };

  const action = isEdit ? editAction : createAction;
  const [state, formAction, pending] = useActionState(action, initState);

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && (
        <div className="rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-700">
          {state.error}
        </div>
      )}

      {/* Title */}
      <Field label="Title" required>
        <input
          name="title"
          type="text"
          required
          defaultValue={post?.title}
          className="input"
        />
      </Field>

      {/* Slug */}
      <Field label="Slug" hint="Auto-generated from title if left blank">
        <input
          name="slug"
          type="text"
          defaultValue={post?.slug}
          className="input"
        />
      </Field>

      {/* Subheadline */}
      <Field label="Subheadline">
        <input
          name="subheadline"
          type="text"
          defaultValue={post?.subheadline}
          className="input"
        />
      </Field>

      {/* Excerpt */}
      <Field label="Excerpt" required>
        <textarea name="excerpt" required rows={2} defaultValue={post?.excerpt} className="input" />
      </Field>

      {/* Author + Read Time */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Author" required>
          <input name="author" type="text" required defaultValue={post?.author ?? "Jane Lytvynenko"} className="input" />
        </Field>
        <Field label="Read Time" required>
          <input name="readTime" type="text" required defaultValue={post?.readTime ?? "5 min read"} className="input" />
        </Field>
      </div>

      {/* Date + Category */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Date" required>
          <input
            name="date"
            type="datetime-local"
            required
            defaultValue={post?.date ? post.date.slice(0, 16) : new Date().toISOString().slice(0, 16)}
            className="input"
          />
        </Field>
        <Field label="Category" required>
          <select name="category" required defaultValue={post?.category ?? "News"} className="input">
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </Field>
      </div>

      {/* Tags */}
      <Field label="Tags" hint="Comma-separated">
        <input
          name="tags"
          type="text"
          defaultValue={post?.tags?.join(", ")}
          className="input"
        />
      </Field>

      {/* Image */}
      <fieldset className="border border-border rounded-md p-4 space-y-3">
        <legend className="text-sm font-medium text-text-dark px-1">Image</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Image URL" required>
            <input name="image_src" type="url" required defaultValue={post?.image?.src} className="input" />
          </Field>
          <Field label="Alt Text" required>
            <input name="image_alt" type="text" required defaultValue={post?.image?.alt} className="input" />
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Width">
            <input name="image_width" type="number" defaultValue={post?.image?.width ?? ""} className="input" />
          </Field>
          <Field label="Height">
            <input name="image_height" type="number" defaultValue={post?.image?.height ?? ""} className="input" />
          </Field>
        </div>
      </fieldset>

      {/* Content */}
      <Field label="Content (HTML)" required>
        <textarea
          name="content"
          required
          rows={20}
          defaultValue={post?.content}
          className="input font-mono text-sm"
        />
      </Field>

      {/* Flags */}
      <fieldset className="border border-border rounded-md p-4 space-y-2">
        <legend className="text-sm font-medium text-text-dark px-1">Flags</legend>
        <div className="flex flex-wrap gap-6">
          <CheckboxField name="isBreaking" label="Breaking" defaultChecked={post?.isBreaking} />
          <CheckboxField name="featured" label="Featured (Hero)" defaultChecked={post?.featured} />
          <CheckboxField name="trending" label="Trending" defaultChecked={post?.trending} />
          <CheckboxField name="popular" label="Popular" defaultChecked={post?.popular} />
        </div>
      </fieldset>

      {/* Submit */}
      <div className="flex items-center gap-3 pt-4 border-t border-border">
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-[var(--accent-gold)] text-white font-medium px-6 py-2 text-sm hover:opacity-90 disabled:opacity-50 transition"
        >
          {pending ? "Saving..." : isEdit ? "Update Post" : "Publish Post"}
        </button>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="text-sm text-text-muted hover:text-text-dark"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

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
      <label className="block text-sm font-medium text-text-dark mb-1">
        {label}
        {required && <span className="text-[var(--accent-red)] ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-text-muted mt-1">{hint}</p>}
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
    <label className="flex items-center gap-2 text-sm text-text-dark cursor-pointer">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="rounded border-border"
      />
      {label}
    </label>
  );
}
