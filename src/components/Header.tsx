import { motion } from 'framer-motion';
import { Sun, Moon, ShoppingCart } from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  cartItemCount: number;
  onCartClick: () => void;
}

/**
 * Header with logo, theme toggle, and cart button
 */
export function Header({ isDark, onToggleTheme, cartItemCount, onCartClick }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-40 glass border-b border-border/50"
    >
      <div className="container py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-2"
        >
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-glow">
            <span className="text-primary-foreground font-display font-bold text-xl">N</span>
          </div>
          <span className="font-display font-bold text-xl hidden sm:block">Trivex</span>
        </motion.div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onToggleTheme}
            className="p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
          >
            <motion.div
              initial={false}
              animate={{ rotate: isDark ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </motion.div>
          </motion.button>

          {/* Cart Button (Desktop) */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCartClick}
            className="hidden md:flex items-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground font-medium shadow-glow transition-all hover:shadow-[0_0_50px_hsl(175_80%_50%/0.4)]"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Cart</span>
            {cartItemCount > 0 && (
              <motion.span
                key={cartItemCount}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-accent text-accent-foreground px-2 py-0.5 rounded-full text-xs font-bold min-w-[1.5rem]"
              >
                {cartItemCount}
              </motion.span>
            )}
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
