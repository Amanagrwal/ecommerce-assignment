import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "@/api/products";
import { useCart } from "@/contexts/CartContext";
import { ArrowLeft, ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { UseformatINR } from "@/hooks/UseformatINR";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
        // console.log(id)
  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(Number(id)),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="h-96 animate-pulse rounded-lg bg-muted" />
          <div className="space-y-4">
            <div className="h-8 w-3/4 animate-pulse rounded bg-muted" />
            <div className="h-4 w-1/4 animate-pulse rounded bg-muted" />
            <div className="h-32 animate-pulse rounded bg-muted" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="container mx-auto px-4 py-16 text-center">
        <h1 className="mb-4 font-display text-2xl font-bold text-foreground">Product not found</h1>
        <Link to="/" className="text-primary underline">Back to Home</Link>
      </main>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.title} added to cart!`);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Products
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-8 md:grid-cols-2"
      >
        <div className="flex items-center justify-center rounded-lg border bg-secondary/30 p-8">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-[400px] w-auto object-contain"
          />
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {product.category}
          </span>
          <h1 className="font-display text-2xl font-bold leading-tight text-foreground md:text-3xl">
            {product.title}
          </h1>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="text-sm font-medium text-foreground">{product.rating.rate}</span>
            </div>
            <span className="text-sm text-muted-foreground">({product.rating.count} reviews)</span>
          </div>
          <p className="text-3xl font-bold text-primary">{UseformatINR(product.price)}</p>
          <p className="leading-relaxed text-muted-foreground">{product.description}</p>

          <Button
            size="lg"
            className="mt-4 w-full gap-2 md:w-auto"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-5 w-5" />
            Add to My Cart
          </Button>
        </div>
      </motion.div>
    </main>
  );
}
