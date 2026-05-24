"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deletePostAction } from "../../../actions";

export default function DeletePostButton({ slug }: { slug: string }) {
  const [confirming, setConfirming] = useState(false);
  const [pending, setPending] = useState(false);

  async function handleDelete() {
    setPending(true);
    await deletePostAction(slug);
  }

  if (confirming) {
    return (
      <form action={handleDelete} className="inline-flex items-center gap-1">
        <button
          type="submit"
          disabled={pending}
          className="text-xs text-white bg-red-600 hover:bg-red-700 px-2 py-1 rounded transition disabled:opacity-50"
        >
          {pending ? "..." : "Confirm"}
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          className="text-xs text-text-muted hover:text-text-dark"
        >
          Cancel
        </button>
      </form>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      className="p-1.5 text-text-muted hover:text-red-600 hover:bg-red-50 rounded transition"
      title="Delete"
    >
      <Trash2 size={14} />
    </button>
  );
}
