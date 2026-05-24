"use server";

import { createSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData): Promise<{ error?: string }> {
  const password = (formData.get("password") as string) ?? "";

  if (password !== process.env.ADMIN_PASSWORD) {
    return { error: "Invalid password" };
  }

  await createSession(password);
  redirect("/admin");
}
