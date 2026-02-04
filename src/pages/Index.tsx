import { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

// Components
import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import { ProductGridSkeleton } from '@/components/ProductSkeleton';
import { SearchBar } from '@/components/SearchBar';
import { CategoryFilter } from '@/components/CategoryFilter';
import { FloatingCart } from '@/components/FloatingCart';
import { CartPanel } from '@/components/CartPanel';
import { CheckoutView } from '@/components/CheckoutView';
import { SuccessView } from '@/components/SuccessView';
import { ToastContainer, ToastData } from '@/components/ToastNotification';

// Data and hooks
import { products } from '@/data/products';
import { useCart } from '@/hooks/useCart';
import { useTheme } from '@/hooks/useTheme';
import { ViewState, Category, Product } from '@/types';

/**
 * Main Index page - E-commerce single page application
 */
const Index = () => {
  // State
  const [currentView, setCurrentView] = useState<ViewState>('products');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [toasts, setToasts] = useState<ToastData[]>([]);

  // Hooks
  const { isDark, toggle: toggleTheme } = useTheme();
  const {
    items: cartItems,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    totalSavings,
  } = useCart();

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Toast notifications
  const addToast = useCallback((toast: Omit<ToastData, 'id'>) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { ...toast, id }]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Add to cart handler
  const handleAddToCart = useCallback(
    (product: Product) => {
      addItem(product);
      addToast({
        type: 'success',
        message: 'Added to cart',
        productName: product.name,
      });
    },
    [addItem, addToast]
  );

  // Remove from cart handler
  const handleRemoveFromCart = useCallback(
    (productId: string) => {
      const product = cartItems.find((item) => item.id === productId);
      removeItem(productId);
      if (product) {
        addToast({
          type: 'info',
          message: 'Removed from cart',
          productName: product.name,
        });
      }
    },
    [cartItems, removeItem, addToast]
  );

  // Checkout flow handlers
  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setCurrentView('checkout');
  };

  const handleCheckoutComplete = () => {
    clearCart();
    setCurrentView('success');
  };

  const handleContinueShopping = () => {
    setCurrentView('products');
  };

  // Render based on current view
  if (currentView === 'checkout') {
    return (
      <div className="min-h-screen bg-background">
        <Header
          isDark={isDark}
          onToggleTheme={toggleTheme}
          cartItemCount={totalItems}
          onCartClick={() => setCurrentView('products')}
        />
        <CheckoutView
          items={cartItems}
          totalPrice={totalPrice}
          onBack={() => setCurrentView('products')}
          onComplete={handleCheckoutComplete}
        />
      </div>
    );
  }

  if (currentView === 'success') {
    return (
      <div className="min-h-screen bg-background">
        <SuccessView onContinueShopping={handleContinueShopping} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header
        isDark={isDark}
        onToggleTheme={toggleTheme}
        cartItemCount={totalItems}
        onCartClick={() => setIsCartOpen(true)}
      />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Main Content */}
      <main className="container py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            <Sparkles className="w-4 h-4" />
            <span>Discover Premium Products</span>
          </motion.div>
          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-4">
            Welcome to{' '}
            <span className="gradient-text">Trivex</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our curated collection of premium electronics, clothing, and footwear.
            Free shipping on all orders.
          </p>
        </motion.div>

        {/* Filters Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center justify-between">
          <CategoryFilter
            selected={selectedCategory}
            onChange={setSelectedCategory}
          />
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <ProductGridSkeleton count={8} />
          ) : filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-muted-foreground text-lg">
                No products found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-4 text-primary hover:underline"
              >
                Clear filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  index={index}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="container py-8 text-center text-muted-foreground text-sm">
          <p>© 2024 Trivex. All rights reserved. Built with ❤️ for the future.</p>
          <a
            href="https://wa.me/918075175465?text=I%27m%20interested%20in%20your%20development%20and%20please%20contact%20me"
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-2 hover:text-primary transition-colors"
          >
            Designed By rizwin
          </a>
        </div>
      </footer>

      {/* Floating Cart Button (Mobile) */}
      <FloatingCart itemCount={totalItems} onClick={() => setIsCartOpen(true)} />

      {/* Cart Panel */}
      <CartPanel
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        totalPrice={totalPrice}
        totalSavings={totalSavings}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleProceedToCheckout}
      />
    </div>
  );
};

export default Index;
