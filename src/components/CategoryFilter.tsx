import { motion } from 'framer-motion';
import { Category } from '@/types';
import { Laptop, Shirt, Footprints, LayoutGrid } from 'lucide-react';

interface CategoryFilterProps {
  selected: Category;
  onChange: (category: Category) => void;
}

const categories: { id: Category; label: string; icon: typeof Laptop }[] = [
  { id: 'all', label: 'All', icon: LayoutGrid },
  { id: 'electronics', label: 'Electronics', icon: Laptop },
  { id: 'clothing', label: 'Clothing', icon: Shirt },
  { id: 'shoes', label: 'Shoes', icon: Footprints },
];

/**
 * Category filter with animated selection
 */
export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap gap-2"
    >
      {categories.map(({ id, label, icon: Icon }) => (
        <motion.button
          key={id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(id)}
          className={`relative px-4 py-2 rounded-xl font-medium text-sm flex items-center gap-2 transition-colors ${
            selected === id
              ? 'text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground bg-secondary/50'
          }`}
        >
          {selected === id && (
            <motion.span
              layoutId="categoryBg"
              className="absolute inset-0 bg-primary rounded-xl shadow-glow"
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            <Icon className="w-4 h-4" />
            {label}
          </span>
        </motion.button>
      ))}
    </motion.div>
  );
}
