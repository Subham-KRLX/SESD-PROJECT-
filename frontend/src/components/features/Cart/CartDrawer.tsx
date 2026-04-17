import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../../../store/cartStore';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export function CartDrawer({ 
  isOpen, 
  onClose, 
  onCheckout 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  onCheckout?: () => void;
}) {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCartStore();

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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 35 }}
            className="fixed right-0 top-0 z-[101] flex h-full w-full flex-col border-l border-white/8 bg-gradient-to-b from-[#171d2a] to-[#0f1419] shadow-[0_30px_100px_rgba(0,0,0,0.4)] md:w-[460px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/8 bg-white/5 p-8">
              <div className="flex items-center gap-3">
                <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-2">
                    <ShoppingBag size={24} className="text-blue-300" />
                </div>
                <h2 className="text-2xl font-bold text-white">Hardware cart</h2>
              </div>
              <motion.button 
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose} 
                className="text-gray-400 transition-colors hover:text-white"
              >
                <X size={28} />
              </motion.button>
            </div>

            {/* Items Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <AnimatePresence mode="popLayout">
                {items.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center h-full text-center space-y-4"
                  >
                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                        <ShoppingBag size={40} className="text-gray-600" />
                    </div>
                    <div>
                        <p className="text-xl font-bold text-white">Cart is Empty</p>
                        <p className="text-gray-500 text-sm">No hardware modules deployed yet.</p>
                    </div>
                  </motion.div>
                ) : (
                  items.map((item: CartItem) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50, scale: 0.9 }}
                      className="group relative overflow-hidden rounded-[24px] border border-white/8 bg-white/5 p-5 transition-all duration-300 hover:border-white/12"
                    >
                      <div className="flex gap-5 relative z-10">
                        <div className="w-24 h-24 shrink-0 overflow-hidden rounded-xl border border-white/5 bg-[#0c1118]">
                            <img
                              src={item.image || 'https://via.placeholder.com/100'}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                        
                        <div className="flex-1 flex flex-col">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-bold text-white text-lg leading-tight">{item.name}</h3>
                            <motion.button
                              whileHover={{ scale: 1.1, color: '#ef4444' }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeItem(item.id)}
                              className="text-gray-500 transition-colors"
                            >
                              <Trash2 size={18} />
                            </motion.button>
                          </div>
                          
                          <p className="mb-4 text-xl font-bold text-blue-300">${item.price}</p>

                          {/* Quantity Controls */}
                          <div className="mt-auto flex items-center justify-between ">
                            <div className="flex items-center rounded-xl border border-white/8 bg-[#0c1118] p-1">
                                <motion.button
                                  whileTap={{ scale: 0.8 }}
                                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                  className="rounded-lg p-1.5 text-gray-400 transition-all hover:bg-white/10 hover:text-white"
                                >
                                  <Minus size={16} />
                                </motion.button>
                                <span className="text-white font-black w-8 text-center text-sm">
                                  {item.quantity}
                                </span>
                                <motion.button
                                  whileTap={{ scale: 0.8 }}
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="rounded-lg p-1.5 text-gray-400 transition-all hover:bg-white/10 hover:text-white"
                                >
                                  <Plus size={16} />
                                </motion.button>
                            </div>
                            <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                                Sub: <span className="text-white">${(item.price * item.quantity).toFixed(2)}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="space-y-6 border-t border-white/8 bg-black/20 p-8">
                <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-400">
                        <span>Total Items:</span>
                        <span className="text-white font-bold">{items.reduce((acc: number, curr: CartItem) => acc + curr.quantity, 0)}</span>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="text-gray-400 font-medium">Grand Total:</span>
                      <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-violet-300 to-pink-300">
                        ${totalPrice().toFixed(2)}
                      </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02, boxShadow: '0 18px 40px rgba(59,130,246,0.18)' }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onCheckout}
                      className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 py-4 text-lg font-bold tracking-wide text-white transition-all"
                    >
                      Authenticate & Checkout
                    </motion.button>
                    
                    <button
                      onClick={() => clearCart()}
                      className="w-full py-2 text-sm font-semibold uppercase tracking-widest text-gray-500 transition-colors hover:text-red-400"
                    >
                      Purge Cart History
                    </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
