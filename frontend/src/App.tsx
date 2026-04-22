import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home.js';
import Browse from './pages/Browse.js';
import Login from './pages/Login.js';
import Dashboard from './pages/Dashboard.js';
import OrderHistory from './pages/OrderHistory.js';
import { CartDrawer } from './components/features/Cart/CartDrawer';
import { useCartStore } from './store/cartStore';
import { useState } from 'react';
import { ShoppingCart, LayoutDashboard, Database, Zap } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { apiClient } from './utils/apiClient';

function AppContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const totalItems = useCartStore((state) => state.totalItems());
  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const location = useLocation();
  const { user } = useAuth();

  const handlePlaceOrder = async () => {
    try {
      const customerId = user?.id ?? 'demo-user-123';
      const items = cartItems.map(item => ({ gadgetId: item.id, quantity: item.quantity }));
      
      const response = await apiClient.fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId, items })
      });
      
      if (response.ok) {
        clearCart();
        setIsCartOpen(false);
        alert(`Hardware deployment confirmed${user ? ` for ${user.name}` : ''}!`);
      } else {
        alert('System uplink failed. Please try again.');
      }
    } catch (error) {
      console.error('Finalization failed:', error);
      alert('System uplink failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1419] text-white selection:bg-blue-500/30 selection:text-white">
        <nav className="sticky top-0 z-[100] border-b border-white/6 bg-[#0F1419]/92 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-2 group">
                <div className="p-2 rounded-xl bg-gradient-to-br from-blue-600 via-violet-600 to-pink-500 shadow-lg shadow-blue-950/30 transition-transform group-hover:rotate-6">
                <Zap size={20} className="text-white" />
              </div>
                <span className="display-font text-2xl font-bold tracking-tight text-white uppercase">
                TechSpark
              </span>
            </Link>
            
            <div className="hidden md:flex gap-10 items-center">
              {[
                { to: '/browse', label: 'Hardware', icon: Database },
                { to: '/orders', label: 'Acquisitions', icon: LayoutDashboard },
                { to: '/dashboard', label: 'Metrics', icon: Zap },
              ].map((link) => (
                <Link 
                  key={link.to}
                  to={link.to} 
                  className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] transition-colors relative group ${
                    location.pathname === link.to ? 'text-blue-300' : 'text-gray-500 hover:text-white'
                  }`}
                >
                  <link.icon size={14} />
                  <span>{link.label}</span>
                  {location.pathname === link.to && (
                      <motion.div 
                        layoutId="nav-glow"
                        className="absolute -bottom-7 left-0 right-0 h-1 rounded-full bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400 shadow-[0_0_12px_rgba(59,130,246,0.35)]"
                      />
                  )}
                </Link>
              ))}

              <div className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/5 px-4 py-2">
                <div className="flex flex-col text-right">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-blue-300">{user?.role || 'ADMIN'}</span>
                  <span className="text-sm font-bold text-white">{user?.name || 'System Operator'}</span>
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCartOpen(true)}
                className="relative rounded-xl border border-white/8 bg-white/5 p-3 text-white transition-all hover:bg-white/[0.08]"
              >
                <ShoppingCart size={18} className="text-gray-200" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 flex items-center justify-center rounded-md bg-gradient-to-r from-blue-600 to-violet-600 px-1.5 py-0.5 text-[10px] font-black text-white shadow-lg shadow-blue-950/30">
                    {totalItems}
                  </span>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </nav>
      
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/orders" element={<OrderHistory />} />
          </Routes>
        </AnimatePresence>
      </main>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        onCheckout={handlePlaceOrder}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
