import { motion } from 'framer-motion';

/**
 * Loading skeleton for product cards
 */
export function ProductSkeleton() {
  return (
    <div className="glass rounded-2xl overflow-hidden">
      {/* Image skeleton */}
      <div className="aspect-square skeleton" />
      
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <div className="h-3 w-16 skeleton rounded" />
        
        {/* Title */}
        <div className="h-5 w-3/4 skeleton rounded" />
        
        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 skeleton rounded" />
          <div className="h-4 w-20 skeleton rounded" />
        </div>
        
        {/* Price */}
        <div className="h-6 w-24 skeleton rounded" />
        
        {/* Button */}
        <div className="h-12 w-full skeleton rounded-xl md:hidden" />
      </div>
    </div>
  );
}

interface ProductGridSkeletonProps {
  count?: number;
}

/**
 * Grid of product skeletons for loading state
 */
export function ProductGridSkeleton({ count = 8 }: ProductGridSkeletonProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.05 }}
        >
          <ProductSkeleton />
        </motion.div>
      ))}
    </div>
  );
}
