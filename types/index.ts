export type InvoiceStatus = "Draft" | "Sent" | "Paid" | "Overdue";

export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
}

export interface Client {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  tax_id?: string;
  billing_address?: string;
  invoice_count?: number;
  lifetime_value?: number;
  outstanding_amount?: number;
  paid_amount?: number;
  last_invoice_date?: string;
}

export interface InvoiceItem {
  name: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  discountRate: number;
}

export interface Invoice {
  id?: number;
  invoiceNumber?: string;
  invoice_number?: string;
  clientId?: number | null;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  currency: string;
  businessName: string;
  businessEmail?: string;
  businessTaxId?: string;
  businessAddress?: string;
  customerName: string;
  customerEmail?: string;
  customerTaxId?: string;
  customerAddress?: string;
  notes?: string;
  terms?: string;
  items: InvoiceItem[];
  subtotal?: number;
  taxTotal?: number;
  discountTotal?: number;
  total?: number;
}
