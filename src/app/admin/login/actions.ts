"use server";

import { createSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

// ── In-memory rate limiter ──

const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;

const attemptMap = new Map<string, { count: number; resetAt: number }>();

async function getClientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return h.get("x-real-ip") ?? "unknown";
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  // Clean expired entries to prevent memory leaks
  for (const [key, entry] of attemptMap) {
    if (entry.resetAt < Date.now()) attemptMap.delete(key);
  }

  const entry = attemptMap.get(ip);
  const now = Date.now();

  if (!entry || entry.resetAt < now) {
    attemptMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return { allowed: true };
  }

  if (entry.count >= MAX_ATTEMPTS) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return { allowed: false, retryAfter };
  }

  entry.count++;
  return { allowed: true };
}

// ── Login action ──

export async function loginAction(formData: FormData): Promise<{ error?: string }> {
  const ip = await getClientIp();
  const { allowed, retryAfter } = checkRateLimit(ip);

  if (!allowed) {
    return {
      error: `Too many login attempts. Please try again in ${retryAfter} seconds.`,
    };
  }

  const password = (formData.get("password") as string) ?? "";

  if (password !== process.env.ADMIN_PASSWORD) {
    return { error: "Invalid password" };
  }

  await createSession(password);
  redirect("/admin");
}
