import Link from "next/link";
import { LayoutDashboard, FileText, MessageSquare, LogOut } from "lucide-react";
import { logout } from "../actions";
import { requireAuth } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAuth();

  return (
    <div className="flex min-h-screen">
      <aside className="w-60 bg-background border-r border-border flex flex-col shrink-0">
        <div className="p-5">
          <Link href="/admin" className="block" style={{ fontFamily: "var(--font-cormorant-garamond)" }}>
            <span className="text-xl font-bold text-[var(--accent-gold)]">FAME TICKER</span>
            <span className="text-xs text-text-muted block mt-0.5">Admin Panel</span>
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
            Breaking Ticker
          </SidebarLink>
        </nav>

        <div className="p-3 border-t border-border">
          <form action={logout}>
            <button
              type="submit"
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-text-muted hover:text-text-dark hover:bg-gray-100 rounded-md transition"
            >
              <LogOut size={16} />
              Logout
            </button>
          </form>
        </div>
      </aside>

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
      className="flex items-center gap-2.5 px-3 py-2 text-sm text-text-muted hover:text-text-dark hover:bg-gray-100 rounded-md transition"
    >
      <Icon size={16} />
      {children}
    </Link>
  );
}
