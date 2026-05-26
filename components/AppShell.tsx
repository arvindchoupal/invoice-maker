"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  Bell,
  Building2,
  ChevronDown,
  CreditCard,
  Download,
  FilePlus2,
  FileText,
  LayoutDashboard,
  LogOut,
  Plus,
  Search,
  Settings,
  Shield,
  Users,
} from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { api, clearSession } from "@/lib/api";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/invoices", label: "Invoices", icon: FileText },
  { href: "/clients", label: "Clients", icon: Users },
  { href: "/bookkeeping", label: "Bookkeeping", icon: BarChart3 },
  { href: "/recurring", label: "Recurring", icon: CreditCard },
  { href: "/reports", label: "Reports", icon: Download },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/pricing", label: "Pricing", icon: Shield },
];

const adminNav = { href: "/admin", label: "Admin", icon: Shield };

const quickActions = [
  { href: "/invoices/new", label: "Invoice", icon: FilePlus2 },
  { href: "/clients", label: "Client", icon: Users },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email?: string; role: string } | null>(null);
  const [settings, setSettings] = useState<{ company_name?: string; company_tax_id?: string } | null>(null);

  useEffect(() => {
    api<{ name: string; email?: string; role: string }>("/auth/me").then(setUser).catch(() => undefined);
    api<{ company_name?: string; company_tax_id?: string }>("/settings").then(setSettings).catch(() => undefined);
  }, []);

  const companyName = settings?.company_name || "InvoiceWala workspace";
  const workspaceLabel = settings?.company_tax_id ? "GST workspace" : "Business workspace";
  const compactSidebar = pathname === "/invoices/new" || /^\/invoices\/[^/]+\/edit$/.test(pathname);
  const isAdmin = user?.role === "admin" || user?.email?.toLowerCase() === "arvind@vtechserve.io";
  const visibleNav = isAdmin ? [...nav, adminNav] : nav;
  const initials = (user?.name || "User")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  function signOut() {
    clearSession();
    router.push("/");
  }
  const mobileNav = visibleNav.filter((item) => ["/dashboard", "/invoices", "/clients", "/reports", "/settings"].includes(item.href));

  return (
    <div className="invoicewala-shell min-h-screen text-slate-950 dark:text-white">
      <aside
        className={`fixed inset-y-3 left-3 z-30 hidden rounded-3xl border border-slate-200/80 bg-white/85 p-3 shadow-2xl shadow-slate-950/[0.06] backdrop-blur-2xl transition-[width] duration-300 dark:border-white/10 dark:bg-slate-950/72 dark:shadow-black/30 lg:block ${
          compactSidebar ? "w-[76px]" : "w-[272px]"
        }`}
      >
        <div className="flex h-full flex-col">
          <BrandLogo
            href="/dashboard"
            className={`rounded-2xl px-3 py-3 transition hover:bg-slate-100 dark:hover:bg-white/[0.06] ${compactSidebar ? "justify-center" : ""}`}
            imageClassName={compactSidebar ? "h-10 w-10" : "h-10 w-10"}
            showText={!compactSidebar}
          />

          <button
            className={`mt-3 flex w-full items-center rounded-2xl border border-slate-200 bg-slate-50/80 p-3 text-left transition hover:border-blue-200 hover:bg-blue-50/60 dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.07] ${
              compactSidebar ? "justify-center" : "justify-between"
            }`}
            title={compactSidebar ? companyName : undefined}
          >
            <span className={`flex min-w-0 items-center ${compactSidebar ? "" : "gap-3"}`}>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                <Building2 className="h-4 w-4" />
              </span>
              <span className={`min-w-0 ${compactSidebar ? "hidden" : ""}`}>
                <span className="block truncate text-sm font-semibold">{companyName}</span>
                <span className="block text-xs text-slate-500 dark:text-slate-400">{workspaceLabel}</span>
              </span>
            </span>
            <ChevronDown className={`h-4 w-4 text-slate-400 ${compactSidebar ? "hidden" : ""}`} />
          </button>

          <nav className="mt-5 grid gap-1.5">
            {visibleNav.map(({ href, label, icon: Icon }) => {
              const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
              return (
                <Link
                  className={`group relative flex items-center rounded-2xl px-3 py-2.5 text-sm font-semibold transition-all duration-200 ${compactSidebar ? "justify-center" : "gap-3"} ${
                    active
                      ? "bg-slate-950 text-white shadow-lg shadow-slate-950/10 dark:bg-white dark:text-slate-950"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/[0.06] dark:hover:text-white"
                  }`}
                  href={href}
                  key={href}
                  title={compactSidebar ? label : undefined}
                >
                  {active ? <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-blue-400" /> : null}
                  <Icon className="h-4 w-4" />
                  <span className={compactSidebar ? "sr-only" : ""}>{label}</span>
                </Link>
              );
            })}
          </nav>

          <div className={`mt-5 rounded-2xl border border-blue-500/15 bg-gradient-to-br from-blue-500/10 to-cyan-400/5 p-3 dark:border-blue-300/10 ${compactSidebar ? "hidden" : ""}`}>
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-300">Quick create</p>
              <Plus className="h-4 w-4 text-blue-500" />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {quickActions.map(({ href, label, icon: Icon }) => (
                <Link
                  className="grid gap-1 rounded-xl bg-white/70 p-2 text-center text-xs font-semibold text-slate-700 ring-1 ring-slate-200/70 transition hover:-translate-y-0.5 hover:bg-white dark:bg-white/[0.07] dark:text-slate-200 dark:ring-white/10"
                  href={href}
                  key={label}
                >
                  <Icon className="mx-auto h-4 w-4" />
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-auto grid gap-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3 dark:border-white/10 dark:bg-white/[0.04]">
              <div className={`flex items-center ${compactSidebar ? "justify-center" : "gap-3"}`}>
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-slate-800 to-slate-600 text-sm font-bold text-white">{initials}</div>
                <div className={`min-w-0 ${compactSidebar ? "hidden" : ""}`}>
                  <p className="truncate text-sm font-semibold">{user?.name ?? "Signed in user"}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{user?.role ?? "user"}</p>
                </div>
              </div>
              <button
                className={`mt-3 flex w-full items-center justify-center rounded-xl px-3 py-2 text-xs font-semibold text-slate-500 transition hover:bg-slate-200/60 hover:text-slate-950 dark:hover:bg-white/[0.06] dark:hover:text-white ${compactSidebar ? "" : "gap-2"}`}
                onClick={signOut}
                title={compactSidebar ? "Sign out" : undefined}
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className={compactSidebar ? "sr-only" : ""}>Sign out</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      <div className={`transition-[padding] duration-300 ${compactSidebar ? "lg:pl-[104px]" : "lg:pl-[304px]"}`}>
        <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/78 px-4 py-3 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/72 lg:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3 lg:hidden">
              <BrandLogo href="/dashboard" imageClassName="h-9 w-9" showText={false} />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">InvoiceWala</p>
                <p className="truncate text-xs text-slate-500 dark:text-slate-400">{companyName}</p>
              </div>
            </div>

            <div className="hidden min-w-0 flex-1 items-center gap-3 lg:flex">
              <div className="flex w-full max-w-md items-center gap-2 rounded-2xl border border-slate-200 bg-white/70 px-3 py-2 text-sm text-slate-500 shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-400">
                <Search className="h-4 w-4" />
                <span>Search invoices, clients, GSTIN...</span>
                <kbd className="ml-auto rounded-lg border border-slate-200 px-2 py-0.5 text-[10px] font-semibold dark:border-white/10">⌘K</kbd>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/reports"
                className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 sm:flex"
              >
                <Download className="h-4 w-4" />
                Reports
              </Link>
              <button className="hidden h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white/70 text-slate-600 transition hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 sm:grid">
                <Bell className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={signOut}
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200"
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden md:inline">Sign out</span>
              </button>
              <Link href="/invoices/new" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-950/20 transition hover:-translate-y-0.5 hover:bg-blue-500">
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">New</span>
              </Link>
            </div>
          </div>
        </header>

        <main className={`px-4 pb-24 pt-6 lg:py-8 ${compactSidebar ? "lg:px-4" : "lg:px-8"}`}>{children}</main>
      </div>

      <nav className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-5 gap-1 rounded-3xl border border-slate-200/80 bg-white/90 p-2 shadow-2xl shadow-slate-950/15 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/90 lg:hidden">
        {mobileNav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
          return (
            <Link
              className={`grid min-h-12 place-items-center rounded-2xl text-xs font-semibold transition ${
                active ? "bg-blue-600 text-white shadow-lg shadow-blue-950/25" : "text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/[0.06]"
              }`}
              href={href}
              key={href}
            >
              <Icon className="h-4 w-4" />
              <span className="mt-0.5 max-w-full truncate text-[10px]">{label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
