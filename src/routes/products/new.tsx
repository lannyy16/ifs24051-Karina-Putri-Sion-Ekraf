import { Link, createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getServerSession } from "@/lib/server/auth";
import { createProduct } from "@/lib/server/products";

export const Route = createFileRoute("/products/new")({
  beforeLoad: async () => { const { session } = await getServerSession(); if (!session) throw redirect({ to: "/login" }); },
  component: NewProduct,
});
function NewProduct() {
  const navigate = useNavigate(); const createFn = useServerFn(createProduct);
  const [name, setName] = useState(""); const [description, setDescription] = useState("");
  const [price, setPrice] = useState(""); const [stock, setStock] = useState("");
  const [message, setMessage] = useState(""); const [busy, setBusy] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setMessage(""); setBusy(true);
    try {
      await createFn({ data: { name, description, price: Number(price), stock: Number(stock) } });
      await navigate({ to: "/products" });
    } catch (error) { setMessage(error instanceof Error ? error.message : "Product could not be created."); }
    finally { setBusy(false); }
  }
  return <main className="page-wrap px-4 py-12"><section className="island-shell mx-auto max-w-3xl rounded-2xl p-6 sm:p-8">
    <div className="mb-6"><Link to="/products" className="text-sm underline">← Back to products</Link><h1 className="display-title mt-3 text-3xl font-bold">Add product</h1><p className="text-sm text-[var(--sea-ink-soft)]">Complete the product information below.</p></div>
    {message && <p role="alert" className="mb-4 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700">{message}</p>}
    <form onSubmit={submit} className="space-y-5">
      <div className="space-y-2"><Label htmlFor="name">Product name</Label><Input id="name" value={name} onChange={(e) => setName(e.target.value)} maxLength={120} required /></div>
      <div className="space-y-2"><Label htmlFor="description">Description</Label><textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} maxLength={2000} required rows={4} className="w-full rounded-xl border border-[var(--line)] bg-[var(--chip-bg)] px-3 py-2 text-sm" /></div>
      <div className="grid gap-4 sm:grid-cols-2"><div className="space-y-2"><Label htmlFor="price">Price (Rp)</Label><Input id="price" type="number" min="0" max="1000000000" step="1" value={price} onChange={(e) => setPrice(e.target.value)} required /></div><div className="space-y-2"><Label htmlFor="stock">Stock</Label><Input id="stock" type="number" min="0" max="1000000" step="1" value={stock} onChange={(e) => setStock(e.target.value)} required /></div></div>
      <div className="flex justify-end gap-3"><Button type="button" onClick={() => navigate({ to: "/products" })} variant="outline">Cancel</Button><Button type="submit" disabled={busy}>{busy ? "Saving…" : "Create product"}</Button></div>
    </form></section></main>;
}
