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
      <tr className="border-b border-gray-50 last:border-0 bg-indigo-50/30">
        <td colSpan={5} className="px-5 py-3">
          <form action={async (formData: FormData) => { await updateTickerAction(message.id, formData); }} className="flex items-start gap-3">
            <div className="flex-1 space-y-2">
              <input
                name="message"
                type="text"
                required
                defaultValue={message.message}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none"
              />
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-xs text-gray-500">
                  <input
                    type="number"
                    name="priority"
                    defaultValue={message.priority}
                    className="w-16 rounded border border-gray-300 px-2 py-1 text-xs text-gray-900 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none"
                  />
                  Priority
                </label>
                <label className="flex items-center gap-2 text-xs text-gray-500">
                  <input
                    type="checkbox"
                    name="isActive"
                    defaultChecked={message.isActive}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  Active
                </label>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="submit"
                className="p-1.5 text-green-600 hover:bg-green-50 rounded-md transition-colors"
                title="Save"
              >
                <Check size={14} />
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
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
      <tr className="border-b border-gray-50 last:border-0 bg-red-50">
        <td colSpan={4} className="px-5 py-3 text-sm text-red-700">
          Delete &quot;{message.message.slice(0, 60)}...&quot;?
        </td>
        <td className="px-5 py-3">
          <div className="flex items-center justify-end gap-2">
            <form action={async () => { await deleteTickerAction(message.id); }}>
              <button
                type="submit"
                className="rounded-md bg-red-600 hover:bg-red-700 text-white text-xs font-medium px-3 py-1.5 transition-colors"
              >
                Delete
              </button>
            </form>
            <button
              type="button"
              onClick={() => setDeleting(false)}
              className="rounded-md border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-xs font-medium px-3 py-1.5 transition-colors"
            >
              Cancel
            </button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
      <td className="px-5 py-3">
        <span className="text-gray-900 line-clamp-1">
          {message.message}
        </span>
      </td>
      <td className="px-5 py-3 text-gray-500">{message.priority}</td>
      <td className="px-5 py-3 hidden sm:table-cell">
        {message.isActive ? (
          <span className="text-xs font-medium bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
            Active
          </span>
        ) : (
          <span className="text-xs font-medium bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
            Inactive
          </span>
        )}
      </td>
      <td className="px-5 py-3 text-gray-500 whitespace-nowrap hidden md:table-cell">
        {new Date(message.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </td>
      <td className="px-5 py-3">
        <div className="flex items-center justify-end gap-1">
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
            title="Edit"
          >
            <Pencil size={14} />
          </button>
          <button
            type="button"
            onClick={() => setDeleting(true)}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
}
