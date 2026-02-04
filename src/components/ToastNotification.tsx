import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X, ShoppingCart } from 'lucide-react';
import { useEffect } from 'react';

export interface ToastData {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
  productName?: string;
}

interface ToastNotificationProps {
  toast: ToastData;
  onDismiss: (id: string) => void;
}

/**
 * Individual toast notification
 */
function ToastNotification({ toast, onDismiss }: ToastNotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 3000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 50, scale: 0.9 }}
      className="glass rounded-xl p-4 shadow-lg flex items-center gap-3 max-w-sm"
    >
      <div className={`p-2 rounded-full ${
        toast.type === 'success' ? 'bg-success/10 text-success' : 
        toast.type === 'error' ? 'bg-destructive/10 text-destructive' : 
        'bg-primary/10 text-primary'
      }`}>
        {toast.type === 'success' ? (
          <ShoppingCart className="w-4 h-4" />
        ) : (
          <CheckCircle className="w-4 h-4" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm line-clamp-1">{toast.message}</p>
        {toast.productName && (
          <p className="text-xs text-muted-foreground line-clamp-1">{toast.productName}</p>
        )}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="p-1 rounded-full hover:bg-secondary transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

interface ToastContainerProps {
  toasts: ToastData[];
  onDismiss: (id: string) => void;
}

/**
 * Container for toast notifications
 */
export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastNotification key={toast.id} toast={toast} onDismiss={onDismiss} />
        ))}
      </AnimatePresence>
    </div>
  );
}
