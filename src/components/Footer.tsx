import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { UseformatINR } from "@/hooks/UseformatINR";

export default function Footer() {
  const { totalItems, totalPrice } = useCart();

  return (
    <footer className="sticky bottom-0 z-40 border-t bg-background/90 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <p className="text-sm text-muted-foreground">
          © 2026 Sembark . All rights reserved.
        </p>
        <AnimatePresence>
          {totalItems > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <Link
                to="/cart"
                className="flex items-center gap-3 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-elevated transition-transform hover:scale-105"
              >
                <ShoppingCart className="h-4 w-4" />
                <span> {totalItems} item{totalItems !== 1 ? "s" : ""}</span>
                <span className="font-bold">{UseformatINR(totalPrice)}</span>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </footer>
  );
}
