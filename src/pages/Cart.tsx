import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";
import { Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { UseformatINR } from "@/hooks/UseformatINR";

export default function Cart() {
  const { items, removeFromCart, totalPrice, totalItems } = useCart();

  return (
    <main className="container mx-auto px-4 py-8">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Continue Shopping
      </Link>

      <h1 className="mb-8 font-display text-3xl font-bold text-foreground">
        Your Cart {totalItems > 0 && <span className="text-muted-foreground">({totalItems})</span>}
      </h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-16">
          <ShoppingBag className="h-16 w-16 text-muted-foreground/30" />
          <p className="text-lg text-muted-foreground">Your cart is empty</p>
          <Link to="/">
            <Button>Browse Products</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2" role="list" aria-label="Cart items">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div
                  key={item.product.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  className="flex gap-4 rounded-lg border bg-card p-4 shadow-card"
                  role="listitem"
                >
                  <Link to={`/product/${item.product.id}/details`} className="shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="h-24 w-24 rounded-md object-contain bg-secondary/30 p-2"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <Link
                        to={`/product/${item.product.id}/details`}
                        className="font-display text-sm font-semibold text-card-foreground hover:text-primary"
                      >
                        {item.product.title}
                      </Link>
                      <p className="mt-1 text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary">
                        { UseformatINR(item.product.price * item.quantity)}
                      </span>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.product.id)}
                        aria-label={`Remove ${item.product.title} from cart`}
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <aside className="rounded-lg border bg-card p-6 shadow-card h-fit" aria-label="Order summary">
            <h2 className="mb-4 font-display text-lg font-bold text-card-foreground">Order Summary</h2>
            <div className="space-y-2 border-b pb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Items ({totalItems})</span>
                <span className="text-card-foreground">{UseformatINR(totalPrice)}</span>
              </div>
            </div>
            <div className="flex justify-between pt-4 text-lg font-bold">
              <span className="text-card-foreground">Total</span>
              <span className="text-primary">{UseformatINR(totalPrice)}</span>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}
