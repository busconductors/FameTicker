"use client";

import { useState } from "react";
import { Pencil, Trash2, Check, X } from "lucide-react";
import { updateTickerAction, deleteTickerAction } from "../../../actions";
import type { TickerMessage } from "@/data/types";

export default function TickerRow({ message }: { message: TickerMessage }) {
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  if (editing) {
    return (
      <tr className="border-b border-border last:border-0 bg-gray-50">
        <td colSpan={5} className="px-4 py-3">
          <form action={async (formData: FormData) => { await updateTickerAction(message.id, formData); }} className="flex items-start gap-3">
            <div className="flex-1 space-y-2">
              <input
                name="message"
                type="text"
                required
                defaultValue={message.message}
                className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-text-dark outline-none focus:ring-2 focus:ring-[var(--accent-gold)] focus:border-transparent"
              />
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-xs text-text-muted">
                  <input
                    type="number"
                    name="priority"
                    defaultValue={message.priority}
                    className="w-16 rounded border border-border px-2 py-1 text-xs"
                  />
                  Priority
                </label>
                <label className="flex items-center gap-2 text-xs text-text-muted">
                  <input
                    type="checkbox"
                    name="isActive"
                    defaultChecked={message.isActive}
                    className="rounded"
                  />
                  Active
                </label>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="submit"
                className="p-1.5 text-green-600 hover:bg-green-50 rounded transition"
                title="Save"
              >
                <Check size={14} />
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="p-1.5 text-text-muted hover:text-text-dark hover:bg-gray-200 rounded transition"
              >
                <X size={14} />
              </button>
            </div>
          </form>
        </td>
      </tr>
    );
  }

  if (deleting) {
    return (
      <tr className="border-b border-border last:border-0 bg-red-50">
        <td colSpan={4} className="px-4 py-2.5 text-sm text-red-700">
          Delete &quot;{message.message.slice(0, 60)}...&quot;?
        </td>
        <td className="px-4 py-2.5">
          <div className="flex items-center justify-end gap-1">
            <form action={async () => { await deleteTickerAction(message.id); }}>
              <button
                type="submit"
                className="text-xs text-white bg-red-600 hover:bg-red-700 px-2 py-1 rounded transition"
              >
                Yes
              </button>
            </form>
            <button
              type="button"
              onClick={() => setDeleting(false)}
              className="text-xs text-text-muted hover:text-text-dark"
            >
              No
            </button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr className="border-b border-border last:border-0 hover:bg-gray-50">
      <td className="px-4 py-2.5 text-text-dark">
        {message.message.slice(0, 100)}
        {message.message.length > 100 ? "..." : ""}
      </td>
      <td className="px-4 py-2.5 text-text-muted">{message.priority}</td>
      <td className="px-4 py-2.5">
        {message.isActive ? (
          <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">Active</span>
        ) : (
          <span className="text-xs bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded">Inactive</span>
        )}
      </td>
      <td className="px-4 py-2.5 text-text-muted text-xs">
        {new Date(message.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
      </td>
      <td className="px-4 py-2.5">
        <div className="flex items-center justify-end gap-1">
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="p-1.5 text-text-muted hover:text-text-dark hover:bg-gray-200 rounded transition"
            title="Edit"
          >
            <Pencil size={14} />
          </button>
          <button
            type="button"
            onClick={() => setDeleting(true)}
            className="p-1.5 text-text-muted hover:text-red-600 hover:bg-red-50 rounded transition"
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
}
