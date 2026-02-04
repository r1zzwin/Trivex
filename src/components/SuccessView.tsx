import { useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';

interface SuccessViewProps {
  onContinueShopping: () => void;
}

/**
 * Payment success screen with confetti animation
 */
export function SuccessView({ onContinueShopping }: SuccessViewProps) {
  // Trigger confetti on mount
  const fireConfetti = useCallback(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ['#00c9b1', '#8b5cf6', '#f472b6', '#fbbf24', '#22c55e'];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();

    // Big burst in center
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.5, y: 0.5 },
      colors,
    });
  }, []);

  useEffect(() => {
    fireConfetti();
  }, [fireConfetti]);

  const orderNumber = `ORD-${Date.now().toString(36).toUpperCase()}`;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="glass rounded-3xl p-8 md:p-12 max-w-lg w-full text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', damping: 15, stiffness: 300 }}
          className="w-24 h-24 mx-auto mb-6 rounded-full bg-success/10 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: 'spring', damping: 15, stiffness: 300 }}
          >
            <CheckCircle className="w-12 h-12 text-success" />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-display font-bold text-3xl md:text-4xl mb-3"
        >
          Payment Successful!
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground text-lg mb-8"
        >
          Thank you for your purchase. Your order has been confirmed.
        </motion.p>

        {/* Order Number */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-secondary/50 rounded-xl p-4 mb-8"
        >
          <p className="text-sm text-muted-foreground mb-1">Order Number</p>
          <p className="font-display font-bold text-xl">{orderNumber}</p>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 gap-4 mb-8"
        >
          <div className="bg-primary/5 rounded-xl p-4">
            <Package className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Estimated Delivery</p>
            <p className="font-semibold">3-5 Business Days</p>
          </div>
          <div className="bg-accent/10 rounded-xl p-4">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <CheckCircle className="w-6 h-6 text-accent mx-auto mb-2" />
            </motion.div>
            <p className="text-sm text-muted-foreground">Order Status</p>
            <p className="font-semibold">Processing</p>
          </div>
        </motion.div>

        {/* Continue Shopping Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onContinueShopping}
          className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg shadow-glow flex items-center justify-center gap-2"
        >
          Continue Shopping
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </div>
  );
}
