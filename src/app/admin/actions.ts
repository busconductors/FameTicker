"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSession, clearSession, validateSession } from "@/lib/auth";
import {
  createPost,
  updatePost,
  deletePost,
  createTickerMessage,
  updateTickerMessage,
  deleteTickerMessage,
} from "@/db";
import type { Category } from "@/data/types";

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

// ── Auth actions ──

export async function login(formData: FormData): Promise<{ error?: string }> {
  const password = parseFormString(formData, "password");

  if (password !== process.env.ADMIN_PASSWORD) {
    return { error: "Invalid password" };
  }

  await createSession(password);
  redirect("/admin");
}

export async function logout(): Promise<void> {
  await clearSession();
  redirect("/admin/login");
}

// ── Post actions ──

export async function createPostAction(formData: FormData): Promise<{ error?: string }> {
  await requireAuthOrRedirect("/admin/posts/new");

  const title = parseFormString(formData, "title");
  if (!title) return { error: "Title is required" };

  try {
    await createPost({
      slug: parseFormOptional(formData, "slug"),
      title,
      subheadline: parseFormOptional(formData, "subheadline"),
      excerpt: parseFormString(formData, "excerpt"),
      author: parseFormString(formData, "author"),
      date: parseFormString(formData, "date"),
      readTime: parseFormString(formData, "readTime"),
      category: parseFormString(formData, "category") as Category,
      tags: parseFormTags(formData),
      image: parseFormImage(formData),
      content: parseFormString(formData, "content"),
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
  if (!title) return { error: "Title is required" };

  try {
    await updatePost(slug, {
      title,
      subheadline: parseFormOptional(formData, "subheadline"),
      excerpt: parseFormString(formData, "excerpt"),
      author: parseFormString(formData, "author"),
      date: parseFormString(formData, "date"),
      readTime: parseFormString(formData, "readTime"),
      category: parseFormString(formData, "category") as Category,
      tags: parseFormTags(formData),
      image: parseFormImage(formData),
      content: parseFormString(formData, "content"),
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
  if (!message) return { error: "Message is required" };

  try {
    await createTickerMessage({
      message,
      priority: Number(parseFormString(formData, "priority") || "0"),
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
  if (!message) return { error: "Message is required" };

  try {
    await updateTickerMessage(id, {
      message,
      priority: Number(parseFormString(formData, "priority") || "0"),
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
