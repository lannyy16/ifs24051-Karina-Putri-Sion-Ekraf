import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, createFileRoute, redirect, useNavigate, useParams } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getServerSession } from "@/lib/server/auth";
import { deleteProduct, getProducts, updateProduct } from "@/lib/server/products";

export const Route = createFileRoute("/products/$productId")({
  beforeLoad: async () => { const { session } = await getServerSession(); if (!session) throw redirect({ to: "/login" }); },
  component: EditProduct,
});
function EditProduct() {
  const { productId } = useParams({ from: "/products/$productId" }); const navigate = useNavigate(); const queryClient = useQueryClient();
  const updateFn = useServerFn(updateProduct); const deleteFn = useServerFn(deleteProduct);
  const query = useQuery({ queryKey: ["product", productId], queryFn: async () => (await getProducts()).find((p) => p.id === productId), enabled: Boolean(productId) });
  const product = query.data; const [name, setName] = useState(""); const [description, setDescription] = useState(""); const [price, setPrice] = useState(""); const [stock, setStock] = useState(""); const [message, setMessage] = useState(""); const [busy, setBusy] = useState(false);
  useEffect(() => { if (product) { setName(product.name); setDescription(product.description); setPrice(String(product.price)); setStock(String(product.stock)); } }, [product]);
  async function submit(event: React.FormEvent<HTMLFormElement>) { event.preventDefault(); if (!product) return; setBusy(true); setMessage(""); try { await updateFn({ data: { id: product.id, name, description, price: Number(price), stock: Number(stock) } }); await queryClient.invalidateQueries({ queryKey: ["products"] }); await queryClient.invalidateQueries({ queryKey: ["product", productId] }); setMessage("Product updated successfully."); } catch (error) { setMessage(error instanceof Error ? error.message : "Product could not be updated."); } finally { setBusy(false); } }
  async function remove() { if (!product || !window.confirm(`Delete ${product.name}?`)) return; setBusy(true); try { await deleteFn({ data: { id: product.id } }); await queryClient.invalidateQueries({ queryKey: ["products"] }); await navigate({ to: "/products" }); } catch (error) { setMessage(error instanceof Error ? error.message : "Product could not be deleted."); } finally { setBusy(false); } }
  if (query.isPending) return <main className="page-wrap px-4 py-12"><p>Loading product…</p></main>;
  if (query.isError) return <main className="page-wrap px-4 py-12"><p role="alert">Could not load product. {(query.error as Error).message}</p></main>;
  if (!product) return <main className="page-wrap px-4 py-12"><p>Product not found.</p><Link to="/products">Back to products</Link></main>;
  return <main className="page-wrap px-4 py-12"><section className="island-shell mx-auto max-w-3xl rounded-2xl p-6 sm:p-8"><div className="mb-6"><Link to="/products" className="text-sm underline">← Back to products</Link><h1 className="display-title mt-3 text-3xl font-bold">Edit product</h1></div>
    {message && <p role="status" className="mb-4 rounded-lg border border-[var(--line)] p-3 text-sm">{message}</p>}
    <form onSubmit={submit} className="space-y-5"><div className="space-y-2"><Label htmlFor="name">Product name</Label><Input id="name" value={name} onChange={(e) => setName(e.target.value)} maxLength={120} required /></div><div className="space-y-2"><Label htmlFor="description">Description</Label><textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} maxLength={2000} rows={4} required className="w-full rounded-xl border border-[var(--line)] bg-[var(--chip-bg)] px-3 py-2 text-sm" /></div><div className="grid gap-4 sm:grid-cols-2"><div className="space-y-2"><Label htmlFor="price">Price (Rp)</Label><Input id="price" type="number" min="0" max="1000000000" step="1" value={price} onChange={(e) => setPrice(e.target.value)} required /></div><div className="space-y-2"><Label htmlFor="stock">Stock</Label><Input id="stock" type="number" min="0" max="1000000" step="1" value={stock} onChange={(e) => setStock(e.target.value)} required /></div></div><div className="flex flex-wrap justify-end gap-3"><Button type="button" variant="outline" onClick={() => navigate({ to: "/products" })}>Cancel</Button><Button type="button" variant="destructive" onClick={remove} disabled={busy}>Delete</Button><Button type="submit" disabled={busy}>{busy ? "Saving…" : "Save changes"}</Button></div></form></section></main>;
}
