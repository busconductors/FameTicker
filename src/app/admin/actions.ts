"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { clearSession, validateSession } from "@/lib/auth";
import {
  createPost,
  updatePost,
  deletePost,
  createTickerMessage,
  updateTickerMessage,
  deleteTickerMessage,
} from "@/db";
import { categories, type Category } from "@/data/types";

// ── Helpers ──

function requireAuthOrRedirect(path: string): Promise<void> {
  return validateSession().then((valid) => {
    if (!valid) redirect(`/admin/login?redirect=${encodeURIComponent(path)}`);
  });
}

function parseFormString(formData: FormData, key: string): string {
  return (formData.get(key) as string) ?? "";
}

function parseFormOptional(formData: FormData, key: string): string | undefined {
  const v = formData.get(key);
  if (v === null || (typeof v === "string" && v.trim() === "")) return undefined;
  return v as string;
}

function parseFormBool(formData: FormData, key: string): boolean {
  return formData.get(key) === "on";
}

function parseFormTags(formData: FormData): string[] {
  const raw = parseFormString(formData, "tags");
  return raw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

function parseFormImage(formData: FormData) {
  return {
    src: parseFormString(formData, "image_src"),
    alt: parseFormString(formData, "image_alt"),
    width: parseFormOptional(formData, "image_width") ? Number(parseFormOptional(formData, "image_width")) : undefined,
    height: parseFormOptional(formData, "image_height") ? Number(parseFormOptional(formData, "image_height")) : undefined,
  };
}

// ── Validation constants ──

const VALID_CATEGORIES: readonly string[] = categories;

const POST_LIMITS = {
  title: 200,
  slug: 200,
  subheadline: 300,
  excerpt: 500,
  author: 150,
  readTime: 50,
  content: 100_000,
  imageSrc: 2048,
  imageAlt: 300,
  maxTags: 10,
  maxTagLength: 50,
} as const;

const TICKER_MESSAGE_MAX = 280;

// ── Validation functions ──

const SLUG_RE = /^[a-z0-9-]+$/;

function validatePostFields(data: {
  title: string;
  slug?: string;
  subheadline?: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  content: string;
  imageSrc: string;
  imageAlt: string;
}): string | null {
  const title = data.title.trim();
  if (!title) return "Title is required";
  if (title.length > POST_LIMITS.title) return `Title must be at most ${POST_LIMITS.title} characters`;

  if (data.slug !== undefined) {
    if (data.slug.length > POST_LIMITS.slug) return `Slug must be at most ${POST_LIMITS.slug} characters`;
    if (!SLUG_RE.test(data.slug)) return "Slug must contain only lowercase letters, numbers, and hyphens";
  }

  if (data.subheadline !== undefined && data.subheadline.length > POST_LIMITS.subheadline) {
    return `Subheadline must be at most ${POST_LIMITS.subheadline} characters`;
  }

  const excerpt = data.excerpt.trim();
  if (!excerpt) return "Excerpt is required";
  if (excerpt.length > POST_LIMITS.excerpt) return `Excerpt must be at most ${POST_LIMITS.excerpt} characters`;

  const author = data.author.trim();
  if (!author) return "Author is required";
  if (author.length > POST_LIMITS.author) return `Author must be at most ${POST_LIMITS.author} characters`;

  if (!data.date) return "Date is required";
  if (isNaN(Date.parse(data.date))) return "Date must be a valid ISO 8601 date";

  const readTime = data.readTime.trim();
  if (!readTime) return "Read time is required";
  if (readTime.length > POST_LIMITS.readTime) return `Read time must be at most ${POST_LIMITS.readTime} characters`;

  if (!VALID_CATEGORIES.includes(data.category)) {
    return `Category must be one of: ${VALID_CATEGORIES.join(", ")}`;
  }

  if (!Array.isArray(data.tags)) return "Tags must be an array";
  if (data.tags.length > POST_LIMITS.maxTags) return `At most ${POST_LIMITS.maxTags} tags allowed`;
  for (let i = 0; i < data.tags.length; i++) {
    const tag = data.tags[i];
    if (!tag || tag.trim() === "") return `Tag ${i + 1} must not be empty`;
    if (tag.length > POST_LIMITS.maxTagLength) return `Tag ${i + 1} must be at most ${POST_LIMITS.maxTagLength} characters`;
  }

  if (data.content.length > POST_LIMITS.content) return `Content must be at most ${POST_LIMITS.content.toLocaleString()} characters`;

  const imageSrc = data.imageSrc.trim();
  if (!imageSrc) return "Image URL is required";
  if (imageSrc.length > POST_LIMITS.imageSrc) return `Image URL must be at most ${POST_LIMITS.imageSrc} characters`;

  const imageAlt = data.imageAlt.trim();
  if (!imageAlt) return "Image alt text is required";
  if (imageAlt.length > POST_LIMITS.imageAlt) return `Image alt text must be at most ${POST_LIMITS.imageAlt} characters`;

  return null;
}

function validateTickerFields(data: {
  message: string;
  priority: number;
}): string | null {
  const message = data.message.trim();
  if (!message) return "Message is required";
  if (message.length > TICKER_MESSAGE_MAX) return `Message must be at most ${TICKER_MESSAGE_MAX} characters`;

  if (!Number.isFinite(data.priority)) return "Priority must be a finite integer";

  return null;
}

// ── Auth actions ──

export async function logout(): Promise<void> {
  await clearSession();
  redirect("/admin/login");
}

// ── Post actions ──

export async function createPostAction(formData: FormData): Promise<{ error?: string }> {
  await requireAuthOrRedirect("/admin/posts/new");

  const title = parseFormString(formData, "title");
  const slug = parseFormOptional(formData, "slug");
  const subheadline = parseFormOptional(formData, "subheadline");
  const excerpt = parseFormString(formData, "excerpt");
  const author = parseFormString(formData, "author");
  const date = parseFormString(formData, "date");
  const readTime = parseFormString(formData, "readTime");
  const category = parseFormString(formData, "category");
  const tags = parseFormTags(formData);
  const image = parseFormImage(formData);
  const content = parseFormString(formData, "content");

  const validationError = validatePostFields({
    title,
    slug,
    subheadline,
    excerpt,
    author,
    date,
    readTime,
    category,
    tags,
    content,
    imageSrc: image.src,
    imageAlt: image.alt,
  });
  if (validationError) return { error: validationError };

  try {
    await createPost({
      slug,
      title,
      subheadline,
      excerpt,
      author,
      date,
      readTime,
      category: category as Category,
      tags,
      image,
      content,
      isBreaking: parseFormBool(formData, "isBreaking"),
      featured: parseFormBool(formData, "featured"),
      trending: parseFormBool(formData, "trending"),
      popular: parseFormBool(formData, "popular"),
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to create post" };
  }

  revalidatePath("/");
  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}

export async function updatePostAction(
  slug: string,
  formData: FormData
): Promise<{ error?: string }> {
  await requireAuthOrRedirect(`/admin/posts/${slug}/edit`);

  const title = parseFormString(formData, "title");
  const subheadline = parseFormOptional(formData, "subheadline");
  const excerpt = parseFormString(formData, "excerpt");
  const author = parseFormString(formData, "author");
  const date = parseFormString(formData, "date");
  const readTime = parseFormString(formData, "readTime");
  const category = parseFormString(formData, "category");
  const tags = parseFormTags(formData);
  const image = parseFormImage(formData);
  const content = parseFormString(formData, "content");

  const validationError = validatePostFields({
    title,
    slug: undefined, // slug is not updatable via this action
    subheadline,
    excerpt,
    author,
    date,
    readTime,
    category,
    tags,
    content,
    imageSrc: image.src,
    imageAlt: image.alt,
  });
  if (validationError) return { error: validationError };

  try {
    await updatePost(slug, {
      title,
      subheadline,
      excerpt,
      author,
      date,
      readTime,
      category: category as Category,
      tags,
      image,
      content,
      isBreaking: parseFormBool(formData, "isBreaking"),
      featured: parseFormBool(formData, "featured"),
      trending: parseFormBool(formData, "trending"),
      popular: parseFormBool(formData, "popular"),
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to update post" };
  }

  revalidatePath("/");
  revalidatePath(`/${slug}`);
  revalidatePath("/admin/posts");
  revalidatePath(`/admin/posts/${slug}/edit`);
  redirect("/admin/posts");
}

export async function deletePostAction(slug: string): Promise<{ error?: string }> {
  await requireAuthOrRedirect("/admin/posts");

  try {
    await deletePost(slug);
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to delete post" };
  }

  revalidatePath("/");
  revalidatePath(`/${slug}`);
  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}

// ── Ticker actions ──

export async function createTickerAction(formData: FormData): Promise<{ error?: string; success?: boolean }> {
  await requireAuthOrRedirect("/admin/ticker");

  const message = parseFormString(formData, "message");
  const priority = Number(parseFormString(formData, "priority") || "0");

  const validationError = validateTickerFields({ message, priority });
  if (validationError) return { error: validationError };

  try {
    await createTickerMessage({
      message,
      priority,
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to create ticker message" };
  }

  revalidatePath("/");
  revalidatePath("/admin/ticker");
  return { success: true };
}

export async function updateTickerAction(
  id: number,
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  await requireAuthOrRedirect("/admin/ticker");

  const message = parseFormString(formData, "message");
  const priority = Number(parseFormString(formData, "priority") || "0");

  const validationError = validateTickerFields({ message, priority });
  if (validationError) return { error: validationError };

  try {
    await updateTickerMessage(id, {
      message,
      priority,
      isActive: parseFormBool(formData, "isActive"),
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to update ticker message" };
  }

  revalidatePath("/");
  revalidatePath("/admin/ticker");
  return { success: true };
}

export async function deleteTickerAction(id: number): Promise<{ error?: string; success?: boolean }> {
  await requireAuthOrRedirect("/admin/ticker");

  try {
    await deleteTickerMessage(id);
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to delete ticker message" };
  }

  revalidatePath("/");
  revalidatePath("/admin/ticker");
  return { success: true };
}
