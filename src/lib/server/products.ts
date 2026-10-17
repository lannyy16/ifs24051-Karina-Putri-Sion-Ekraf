import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { type Product, db } from "@/lib/db";
import { requireAdmin, requireAuth } from "@/lib/session";

const productFields = {
  name: z.string().trim().min(1, "Name is required").max(120, "Name is too long"),
  description: z.string().trim().min(1, "Description is required").max(2000, "Description is too long"),
  price: z.coerce.number().finite().min(0, "Price cannot be negative").max(1_000_000_000),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative").max(1_000_000),
};
export const productSchema = z.object(productFields);
export type ProductInput = z.infer<typeof productSchema>;
const idSchema = z.string().trim().min(1).max(128);
function httpError(message: string, status: number): Error & { status: number } {
  return Object.assign(new Error(message), { status });
}

export const getProducts = createServerFn({ method: "GET" }).handler(async () => {
  await requireAuth();
  return [...db.product].sort((a, b) => b.createdAt.localeCompare(a.createdAt)) as Product[];
});

export const createProduct = createServerFn({ method: "POST" }).validator(productSchema).handler(async ({ data }) => {
  await requireAdmin();
  const now = new Date().toISOString();
  const product: Product = { id: crypto.randomUUID(), ...data, createdAt: now, updatedAt: now };
  db.product.push(product);
  return product;
});

export const updateProduct = createServerFn({ method: "POST" })
  .validator(z.object({ id: idSchema, ...productFields }))
  .handler(async ({ data }) => {
    await requireAdmin();
    const index = db.product.findIndex((p) => p.id === data.id);
    if (index < 0) throw httpError("Product not found", 404);
    const updated: Product = { ...db.product[index], name: data.name, description: data.description, price: data.price, stock: data.stock, updatedAt: new Date().toISOString() };
    db.product[index] = updated;
    return updated;
  });

export const deleteProduct = createServerFn({ method: "POST" }).validator(z.object({ id: idSchema })).handler(async ({ data }) => {
  await requireAdmin();
  const index = db.product.findIndex((p) => p.id === data.id);
  if (index < 0) throw httpError("Product not found", 404);
  db.product.splice(index, 1);
  return { ok: true };
});
