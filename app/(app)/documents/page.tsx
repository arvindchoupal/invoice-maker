"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { currency } from "@/lib/invoice";
import { Badge, Card, EmptyState, Skeleton } from "@/components/ui";

interface DocumentRow {
  id: number;
  document_type: string;
  document_number: string;
  party_name: string;
  status: string;
  issue_date: string;
  total: number;
  currency: string;
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<DocumentRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api<DocumentRow[]>("/documents").then(setDocuments).finally(() => setLoading(false));
  }, []);

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Finance documents</h1>
        <p className="mt-1 text-sm text-slate-500">Invoices, receipts, quotations, estimates, purchase orders, credit notes, expense reports, and delivery challans.</p>
      </div>
      <Card className="overflow-hidden">
        {loading ? <div className="p-5"><Skeleton className="h-14" /></div> : documents.length ? (
          <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-white/[0.04]"><tr><th className="p-4">Type</th><th className="p-4">Number</th><th className="p-4">Party</th><th className="p-4">Date</th><th className="p-4">Total</th><th className="p-4">Status</th></tr></thead>
            <tbody>{documents.map((doc) => <tr className="border-t border-slate-100 dark:border-white/5" key={doc.id}><td className="p-4 capitalize">{doc.document_type.replaceAll("_", " ")}</td><td className="p-4 font-semibold">{doc.document_number}</td><td className="p-4">{doc.party_name}</td><td className="p-4">{String(doc.issue_date).slice(0, 10)}</td><td className="p-4">{currency(Number(doc.total), doc.currency)}</td><td className="p-4"><Badge>{doc.status}</Badge></td></tr>)}</tbody>
          </table>
          </div>
        ) : <div className="p-5"><EmptyState title="No finance documents yet" body="Create or import documents to manage quotes, receipts, purchase orders and more." /></div>}
      </Card>
    </div>
  );
}
