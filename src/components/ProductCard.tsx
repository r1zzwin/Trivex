import { motion } from 'framer-motion';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  index: number;
}

/**
 * Animated product card with hover effects and glassmorphism
 */
export function ProductCard({ product, onAddToCart, index }: ProductCardProps) {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round((1 - product.price / product.originalPrice!) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: 'easeOut' }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      <div className="glass rounded-2xl overflow-hidden transition-all duration-300 group-hover:shadow-glow">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-secondary/30">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Discount Badge */}
          {hasDiscount && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-3 left-3 bg-destructive text-destructive-foreground px-2 py-1 rounded-full text-xs font-semibold"
            >
              -{discountPercent}%
            </motion.div>
          )}

          {/* Quick Add Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-foreground/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onAddToCart(product)}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-glow"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </motion.button>
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Category Tag */}
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {product.category}
          </span>

          {/* Name */}
          <h3 className="font-display font-semibold text-lg mt-1 line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground">
              ({product.reviews.toLocaleString()})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mt-3">
            <span className="font-display font-bold text-xl">
              ₹{product.price.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{product.originalPrice!.toFixed(2)}
              </span>
            )}
          </div>

          {/* Mobile Add Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onAddToCart(product)}
            className={cn(
              "w-full mt-4 bg-primary text-primary-foreground py-3 rounded-xl font-semibold",
              "flex items-center justify-center gap-2 transition-all duration-300",
              "hover:shadow-glow md:hidden"
            )}
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
