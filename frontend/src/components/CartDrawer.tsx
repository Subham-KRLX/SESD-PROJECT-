import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiTrash2, FiShoppingCart, FiArrowRight } from 'react-icons/fi';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onPlaceOrder: () => void;
}

export default function CartDrawer({ isOpen, onClose, items, onRemove, onPlaceOrder }: CartDrawerProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl z-[70] flex flex-col"
          >
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FiShoppingCart className="text-blue-500" size={24} />
                <h2 className="text-xl font-black tracking-tight">CART</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4">
                  <FiShoppingCart size={48} className="opacity-20" />
                  <p className="font-bold">Hardware bay is empty.</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 bg-slate-800/30 p-4 rounded-2xl border border-slate-700/30 hover:border-blue-500/30 transition-colors">
                    <div className="w-16 h-16 bg-slate-800 rounded-xl flex items-center justify-center font-bold text-xs text-slate-600">
                      IMG
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm">{item.name}</h4>
                      <p className="text-blue-400 font-black text-sm mt-1">${item.price.toLocaleString()}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400 font-bold uppercase tracking-widest">Qty: {item.quantity}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="p-2 text-slate-600 hover:text-red-400 transition-colors"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-slate-800 bg-slate-900/80 backdrop-blur-xl">
                <div className="flex justify-between mb-6">
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">Subtotal</span>
                  <span className="text-2xl font-black text-white">${total.toLocaleString()}</span>
                </div>
                <button 
                  onClick={onPlaceOrder}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all group"
                >
                  Initiate Deployment
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-center text-[10px] text-slate-600 mt-4 font-black uppercase tracking-widest">
                  Clean Architecture Verified Transaction
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
