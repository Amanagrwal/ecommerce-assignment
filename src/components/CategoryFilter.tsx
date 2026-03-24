import { motion } from "framer-motion";

interface Props {
  categories: string[];
  selected: string[];
  onToggle: (category: string) => void;
  loading: boolean;
}

export default function CategoryFilter({ categories, selected, onToggle, loading }: Props) {
  if (loading) {
    return (
      <div className="flex flex-wrap gap-2" role="group" aria-label="Category filters loading">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-9 w-24 animate-pulse rounded-full bg-muted" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
      {categories.map((cat) => {
        const isActive = selected.includes(cat);
        return (
          <motion.button
            key={cat}
            whileTap={{ scale: 0.95 }}
            onClick={() => onToggle(cat)}
            className={`rounded-full border px-4 py-2 text-sm font-medium capitalize transition-colors ${
              isActive
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
            }`}
            aria-pressed={isActive}
          >
            {cat}
          </motion.button>
        );
      })}
    </div>
  );
}
