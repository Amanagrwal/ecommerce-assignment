import { Link } from "react-router-dom";
import { Product } from "@/types/product";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import {UseformatINR } from "@/hooks/UseformatINR"
interface Props {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link
        to={`/product/${product.id}/details`}
        className="group flex h-full flex-col overflow-hidden rounded-lg border bg-card shadow-card transition-shadow hover:shadow-card-hover"
        aria-label={`View ${product.title}`}
      >
        <div className="flex items-center justify-center bg-secondary/50 p-6">
          <img
            src={product.image}
            alt={product.title}
            className="h-48 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="flex flex-1 flex-col gap-2 p-4">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {product.category}
          </span>
          <h3 className="line-clamp-2 font-display text-sm font-semibold leading-snug text-card-foreground">
            {product.title}
          </h3>
          <div className="mt-auto flex items-center justify-between pt-2">
            <span className="text-lg font-bold text-primary">{UseformatINR(product.price)}</span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="h-3 w-3 fill-primary text-primary" aria-hidden="true" />
              {product.rating.rate}
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
