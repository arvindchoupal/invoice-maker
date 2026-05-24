"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { currency } from "@/lib/invoice";
import { EmptyState, StatCard } from "@/components/ui";

export default function AdminPage() {
  const [analytics, setAnalytics] = useState<Record<string, number> | null>(null);
  const [users, setUsers] = useState<Array<Record<string, string | number>>>([]);
  const [error, setError] = useState("");
console.log(error)
  useEffect(() => {
    Promise.all([api<Record<string, number>>("/admin/analytics"), api<Array<Record<string, string | number>>>("/admin/users")])
      .then(([a, u]) => {
        setAnalytics(a);
        setUsers(u);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Admin access required"));
  }, []);

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-semibold">Admin</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Manage users and platform-level analytics.</p>
      </div>
      {error ? <EmptyState title="Admin access required" body={error} /> : null}
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Users" value={String(analytics?.users ?? "...")} />
        <StatCard label="Invoices" value={String(analytics?.invoices ?? "...")} tone="slate" />
        <StatCard label="Paid invoices" value={String(analytics?.paid_count ?? "...")} tone="green" />
        <StatCard label="Volume" value={analytics ? currency(Number(analytics.total_volume ?? 0)) : "..."} tone="amber" />
      </div>
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            <tr><th className="p-3">User</th><th className="p-3">Role</th><th className="p-3">Invoices</th><th className="p-3">Billed</th></tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr className="border-t border-slate-200 dark:border-slate-800" key={String(user.id)}>
                <td className="p-3 font-medium">{user.name}<div className="text-xs text-slate-500">{user.email}</div></td>
                <td className="p-3">{user.role}</td>
                <td className="p-3">{user.invoice_count}</td>
                <td className="p-3">{currency(Number(user.total_billed ?? 0))}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
