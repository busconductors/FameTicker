import Link from "next/link";
import { LayoutDashboard, FileText, MessageSquare, LogOut } from "lucide-react";
import { logout } from "../actions";
import { requireAuth } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAuth();

  return (
    <div className="flex min-h-screen">
      {/* ── Sidebar ── */}
      <aside className="w-56 bg-white border-r border-gray-200 flex flex-col shrink-0">
        <div className="p-5">
          <Link href="/admin" className="block">
            <span className="text-lg font-bold text-gray-900 tracking-tight">Fame Ticker</span>
            <span className="text-xs text-gray-500 block mt-0.5">Admin</span>
          </Link>
        </div>

        <nav className="flex-1 px-3 space-y-0.5">
          <SidebarLink href="/admin" icon={LayoutDashboard}>
            Dashboard
          </SidebarLink>
          <SidebarLink href="/admin/posts" icon={FileText}>
            Posts
          </SidebarLink>
          <SidebarLink href="/admin/ticker" icon={MessageSquare}>
            Ticker
          </SidebarLink>
        </nav>

        <div className="p-3 border-t border-gray-100">
          <form action={logout}>
            <button
              type="submit"
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 bg-gray-50 p-6 lg:p-8 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}

function SidebarLink({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon: React.ComponentType<{ size?: number | string }>;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
    >
      <Icon size={16} />
      {children}
    </Link>
  );
}
