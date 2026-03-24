import { Product } from "@/types/product";

const BASE_URL = "https://fakestoreapi.com";

export async function fetchAllProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products/category/${encodeURIComponent(category)}`);
  // console.log("call API" , `${BASE_URL}/products/category/${encodeURIComponent(category)}`)
  if (!res.ok) throw new Error("Failed to fetch products by category");
  return res.json();
}

export async function fetchCategories(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/products/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function fetchProductById(id: number): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}
