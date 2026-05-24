import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHash } from "crypto";

const SESSION_COOKIE = "admin_token";
const SESSION_MAX_AGE = 60 * 60 * 24; // 24 hours

function hashPassword(password: string): string {
  const secret = process.env.ADMIN_SESSION_SECRET!;
  return createHash("sha256").update(password + secret).digest("hex");
}

export async function createSession(password: string): Promise<void> {
  const token = hashPassword(password);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });
}

export async function validateSession(): Promise<boolean> {
  if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_SESSION_SECRET) {
    return false;
  }
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return false;
  const expected = hashPassword(process.env.ADMIN_PASSWORD!);
  return token === expected;
}

export async function requireAuth(): Promise<void> {
  const valid = await validateSession();
  if (!valid) redirect("/admin/login");
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
