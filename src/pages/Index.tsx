import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts, fetchCategories, fetchProductsByCategory } from "@/api/products";
import { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import CategoryFilter from "@/components/CategoryFilter";

export default function Index() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });


  const { data: products = [], isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["products", selectedCategories],
    queryFn: async () => {
      if (selectedCategories.length === 0) {
        return fetchAllProducts();
      }

      // Fetch each selected category in parallel via API
      const results = await Promise.all(
        selectedCategories.map((cat) => fetchProductsByCategory(cat))
      );
      return results.flat();
    },
  });

  const toggleCategory = useCallback((category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  }, []);

console.log("products",products)
  console.log("toggleCategory",toggleCategory)
  return (
    <main className="container mx-auto px-4 py-8">
      <section aria-labelledby="products-heading">
        <h1 id="products-heading" className="mb-2 font-display text-3xl font-bold text-foreground md:text-4xl">
          Discover Products
        </h1>
        <p className="mb-6 text-muted-foreground">Browse our curated collection</p>

        <div className="mb-8">
          <CategoryFilter
            categories={categories}
            selected={selectedCategories}
            onToggle={toggleCategory}
            loading={categoriesLoading}
          />
        </div>

        {productsLoading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4" aria-busy="true">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-72 animate-pulse rounded-lg bg-muted" />
            ))}   
          </div>

        ) : products.length === 0 ? (
          <p className="py-12 text-center text-muted-foreground">No products found.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
