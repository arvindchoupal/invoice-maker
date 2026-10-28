"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  Bell,
  Building2,
  ChevronDown,
  CreditCard,
  Download,
  Expand,
  FilePlus2,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  PanelLeftClose,
  Sparkles,
  Plus,
  Settings,
  Shield,
  Users,
  X,
} from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { api, clearSession, getToken } from "@/lib/api";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/invoices", label: "Invoices", icon: FileText },
  { href: "/clients", label: "Clients", icon: Users },
  { href: "/bookkeeping", label: "Bookkeeping", icon: BarChart3 },
  { href: "/recurring", label: "Recurring", icon: CreditCard },
  { href: "/reports", label: "Reports", icon: Download },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/pricing", label: "Founding plan", icon: Shield },
];

const adminNav = { href: "/admin", label: "Admin", icon: Shield };

const quickActions = [
  { href: "/invoices/new", label: "Invoice", icon: FilePlus2 },
  { href: "/clients", label: "Client", icon: Users },
];

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

function isPageScrolled() {
  return window.scrollY > 8;
}

function routeDetails(pathname: string) {
  if (pathname === "/invoices/new") return { label: "Create invoice", parent: "Invoices", icon: FilePlus2 };
  if (/^\/invoices\/[^/]+\/edit$/.test(pathname)) return { label: "Edit invoice", parent: "Invoices", icon: FileText };
  if (pathname === "/ai-import") return { label: "AI import", parent: "Invoices", icon: FilePlus2 };
  if (pathname === "/payments") return { label: "Payments", parent: "Workspace", icon: CreditCard };
  if (pathname === "/documents") return { label: "Finance documents", parent: "Workspace", icon: FileText };
  return null;
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const headerScrolled = useSyncExternalStore(subscribeToScroll, isPageScrolled, () => false);
  const [user, setUser] = useState<{ name: string; email?: string; role: string } | null>(null);
  const [settings, setSettings] = useState<{ company_name?: string; company_tax_id?: string } | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [editorSidebarExpanded, setEditorSidebarExpanded] = useState(false);

  useEffect(() => {
    if (!getToken()) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
      return;
    }
    api<{ name: string; email?: string; role: string }>("/auth/me")
      .then((nextUser) => {
        setUser(nextUser);
        setAuthReady(true);
      })
      .catch(() => {
        clearSession();
        router.replace(`/login?next=${encodeURIComponent(pathname)}`);
      });
    api<{ company_name?: string; company_tax_id?: string }>("/settings").then(setSettings).catch(() => undefined);
  }, [pathname, router]);

  const companyName = settings?.company_name || "InvoiceWala workspace";
  const workspaceLabel = settings?.company_tax_id ? "GST workspace" : "Business workspace";
  const isInvoiceEditor = pathname === "/invoices/new" || /^\/invoices\/[^/]+\/edit$/.test(pathname);
  const compactSidebar = isInvoiceEditor ? !editorSidebarExpanded : sidebarCollapsed;
  const isAdmin = user?.role === "admin" || user?.email?.toLowerCase() === "arvind@vtechserve.io";
  const visibleNav = isAdmin ? [...nav, adminNav] : nav;
  const currentNav = visibleNav.find((item) => pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href)));
  const routeDetail = routeDetails(pathname);
  const CurrentPageIcon = routeDetail?.icon ?? currentNav?.icon ?? LayoutDashboard;
  const pageTitle = routeDetail?.label ?? currentNav?.label ?? "Workspace";
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
  const mobileNav = visibleNav.filter((item) => ["/dashboard", "/invoices", "/clients", "/reports"].includes(item.href));

  if (!authReady) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50 px-6 text-center dark:bg-[#0b0f14]">
        <div>
          <div className="mx-auto h-10 w-10 animate-pulse rounded-2xl bg-blue-600" />
          <p className="mt-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Opening your secure workspace…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="invoicewala-shell min-h-screen text-slate-950 dark:text-white">
      <aside
        className={`fixed bottom-3 top-[92px] left-3 z-30 hidden rounded-xl border border-slate-200 bg-white p-3 shadow-sm shadow-slate-950/[0.03] transition-[width] duration-200 dark:border-[#2b3138] dark:bg-[#12161b] dark:shadow-none lg:block ${
          compactSidebar ? "w-[72px]" : "w-[236px]"
        }`}
      >
        <div className="flex h-full flex-col">
          <BrandLogo
            href="/dashboard"
            className={`rounded-lg px-2 py-2 transition hover:bg-slate-100 dark:hover:bg-white/[0.06] ${compactSidebar ? "justify-center" : ""}`}
            imageClassName={compactSidebar ? "h-8 w-8" : "h-8 w-8"}
            showText={!compactSidebar}
          />

          <button
            className={`mt-3 flex w-full items-center rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-left transition hover:border-blue-200 hover:bg-blue-50/60 dark:border-[#2b3138] dark:bg-[#171b20] dark:hover:bg-[#1c2229] ${
              compactSidebar ? "justify-center" : "justify-between"
            }`}
            title={compactSidebar ? companyName : undefined}
            onClick={() => router.push("/settings")}
            aria-label={`Open settings for ${companyName}`}
          >
            <span className={`flex min-w-0 items-center ${compactSidebar ? "" : "gap-3"}`}>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950">
                <Building2 className="h-4 w-4" />
              </span>
              <span className={`min-w-0 ${compactSidebar ? "hidden" : ""}`}>
                <span className="block truncate text-sm font-semibold">{companyName}</span>
                <span className="block text-xs text-slate-500 dark:text-slate-400">{workspaceLabel}</span>
              </span>
            </span>
            <ChevronDown className={`h-4 w-4 text-slate-400 ${compactSidebar ? "hidden" : ""}`} />
          </button>

          <nav className="mt-5 grid gap-1">
            {visibleNav.map(({ href, label, icon: Icon }) => {
              const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
              return (
                <Link
                  className={`group relative flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150 ${compactSidebar ? "justify-center" : "gap-3"} ${
                    active
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-[#1c2229] dark:hover:text-white"
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

          <div className={`mt-5 rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-[#2b3138] dark:bg-[#171b20] ${compactSidebar ? "hidden" : ""}`}>
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-300">Quick create</p>
              <Plus className="h-4 w-4 text-blue-500" />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {quickActions.map(({ href, label, icon: Icon }) => (
                <Link
                  className="grid gap-1 rounded-lg bg-white p-2 text-center text-xs font-medium text-slate-700 ring-1 ring-slate-200 transition hover:bg-blue-50 dark:bg-[#12161b] dark:text-slate-200 dark:ring-[#2b3138] dark:hover:bg-[#1c2229]"
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
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-[#2b3138] dark:bg-[#171b20]">
              <div className={`flex items-center ${compactSidebar ? "justify-center" : "gap-3"}`}>
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-slate-800 text-xs font-semibold text-white">{initials}</div>
                <div className={`min-w-0 ${compactSidebar ? "hidden" : ""}`}>
                  <p className="truncate text-sm font-semibold">{user?.name ?? "Signed in user"}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{user?.role ?? "user"}</p>
                </div>
              </div>
              <button
                className={`mt-2 flex w-full items-center justify-center rounded-lg px-3 py-2 text-xs font-medium text-slate-500 transition hover:bg-slate-200/60 hover:text-slate-950 dark:hover:bg-[#1c2229] dark:hover:text-white ${compactSidebar ? "" : "gap-2"}`}
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

      <div className={`transition-[padding] duration-200 ${compactSidebar ? "lg:pl-[96px]" : "lg:pl-[260px]"}`}>
        <header className={`sticky top-[76px] z-20 border-b border-slate-200 px-4 py-2.5 transition-colors duration-200 dark:border-[#2b3138] lg:px-5 ${headerScrolled ? "bg-white/95 backdrop-blur-xl dark:bg-[#0f1216]/95" : "bg-transparent backdrop-blur-none"}`}>
          <div className="mx-auto flex max-w-[100rem] items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3 lg:hidden">
              <BrandLogo href="/dashboard" imageClassName="h-9 w-9" showText={false} />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">InvoiceWala</p>
                <h1 className="truncate text-xs font-medium text-slate-500 dark:text-slate-400">{pageTitle}</h1>
              </div>
            </div>

            <div className="hidden min-w-0 flex-1 items-center gap-3 lg:flex">
              <button className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-[#1c2229]" onClick={() => isInvoiceEditor ? setEditorSidebarExpanded((value) => !value) : setSidebarCollapsed((value) => !value)} aria-label="Toggle sidebar" title="Toggle sidebar" aria-expanded={!compactSidebar}>
                <PanelLeftClose className="h-5 w-5" />
              </button>
              <div className="flex min-w-[170px] items-center gap-2 text-sm text-slate-800 dark:text-slate-100">
                <CurrentPageIcon className="h-4 w-4 text-slate-500" />
                <h1 className="truncate font-semibold">{pageTitle}</h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/reports" className="hidden h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 dark:border-[#2b3138] dark:bg-[#171b20] dark:text-slate-300 dark:hover:bg-[#1c2229] sm:grid" aria-label="Reports" title="Reports">
                <Download className="h-4 w-4" />
              </Link>
              <button className="hidden h-10 w-10 place-items-center rounded-lg text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-[#1c2229] sm:grid" onClick={() => router.push("/ai-import")} aria-label="AI import" title="AI import">
                <Sparkles className="h-5 w-5" />
              </button>
              <button className="hidden h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 dark:border-[#2b3138] dark:bg-[#171b20] dark:text-slate-300 dark:hover:bg-[#1c2229] sm:grid" onClick={() => setShowNotifications((value) => !value)} aria-label="Notifications" aria-expanded={showNotifications}>
                <Bell className="h-4 w-4" />
              </button>
              <button className="hidden h-10 w-10 place-items-center rounded-lg text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-[#1c2229] sm:grid" onClick={() => document.documentElement.requestFullscreen?.()} aria-label="Full screen" title="Full screen">
                <Expand className="h-5 w-5" />
              </button>
              <ThemeToggle inline showLabel={false} />
              {!isInvoiceEditor ? <Link href="/invoices/new" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 px-3.5 py-1.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-500">
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">New invoice</span>
              </Link> : null}
            </div>
            {showNotifications ? (
              <div className="absolute right-28 top-16 z-50 w-72 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl dark:border-[#2a313a] dark:bg-[#151a20]">
                <p className="font-semibold">Notifications</p>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">You are all caught up. Payment reminders and invoice activity will appear here.</p>
              </div>
            ) : null}
          </div>
        </header>

        <main className={`px-4 pb-24 pt-5 lg:py-6 ${compactSidebar ? "lg:px-5" : "lg:px-5"}`}>{children}</main>
      </div>

      {showMobileMenu ? (
        <div className="fixed inset-0 z-50 bg-slate-950/45 p-4 backdrop-blur-sm lg:hidden" role="dialog" aria-modal="true" aria-label="More workspace navigation">
          <div className="absolute inset-x-4 bottom-24 rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl dark:border-[#2a313a] dark:bg-[#11161c]">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-semibold">More workspace tools</p>
              <button className="grid h-11 w-11 place-items-center rounded-xl hover:bg-slate-100 dark:hover:bg-white/[0.06]" onClick={() => setShowMobileMenu(false)} aria-label="Close menu"><X className="h-5 w-5" /></button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {visibleNav.filter((item) => !mobileNav.some((mobileItem) => mobileItem.href === item.href)).map(({ href, label, icon: Icon }) => (
                <Link className="flex min-h-12 items-center gap-3 rounded-2xl border border-slate-200 px-3 text-sm font-semibold dark:border-[#2a313a]" href={href} key={href} onClick={() => setShowMobileMenu(false)}><Icon className="h-4 w-4" />{label}</Link>
              ))}
              <Link className="flex min-h-12 items-center gap-3 rounded-2xl border border-slate-200 px-3 text-sm font-semibold dark:border-[#2a313a]" href="/ai-import" onClick={() => setShowMobileMenu(false)}><FilePlus2 className="h-4 w-4" />AI import</Link>
            </div>
          </div>
        </div>
      ) : null}

      <nav className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-5 gap-1 rounded-3xl border border-slate-200/80 bg-white/90 p-2 shadow-2xl shadow-slate-950/15 backdrop-blur-2xl dark:border-[#2a313a] dark:bg-[#11161c]/95 lg:hidden" aria-label="Mobile workspace navigation">
        {mobileNav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
          return (
            <Link
              className={`grid min-h-12 place-items-center rounded-2xl text-xs font-semibold transition ${
                active ? "bg-blue-600 text-white shadow-lg shadow-blue-950/25" : "text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-[#1d242c]"
              }`}
              href={href}
              key={href}
            >
              <Icon className="h-4 w-4" />
              <span className="mt-0.5 max-w-full truncate text-[10px]">{label}</span>
            </Link>
          );
        })}
        <button className={`grid min-h-12 place-items-center rounded-2xl text-xs font-semibold transition ${showMobileMenu ? "bg-blue-600 text-white" : "text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-[#1d242c]"}`} onClick={() => setShowMobileMenu(true)} aria-label="More workspace tools"><Menu className="h-4 w-4" /><span className="mt-0.5 text-[10px]">More</span></button>
      </nav>
    </div>
  );
}
