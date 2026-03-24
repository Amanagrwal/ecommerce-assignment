import { Link } from "react-router-dom";
import { ShoppingCart, Store } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <nav className="container mx-auto flex items-center justify-between px-4 py-4" aria-label="Main navigation">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-foreground">
          <Store className="h-6 w-6 text-primary" aria-hidden="true" />
          <span>Sembark</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Home
          </Link>

          <Link
            to="/cart"
            className="relative flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            aria-label={`Cart with ${totalItems} items`}
          >
            <ShoppingCart className="h-5 w-5" />
            
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>
      </nav>
    </header>
  );
}
