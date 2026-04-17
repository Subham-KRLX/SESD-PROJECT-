import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.js';
import Browse from './pages/Browse.js';
import Login from './pages/Login.js';
import Dashboard from './pages/Dashboard.js';
import OrderHistory from './pages/OrderHistory.js';
import CartDrawer from './components/CartDrawer.js';
import { useState, useEffect } from 'react';
import { FiShoppingCart } from 'react-icons/fi';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: any) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const placeOrder = async () => {
    try {
      // Mock user ID
      const customerId = 'demo-user-123';
      const items = cartItems.map(item => ({ gadgetId: item.id, quantity: item.quantity }));
      
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId, items })
      });
      
      if (response.ok) {
        setCartItems([]);
        setIsCartOpen(false);
        alert('Deployment Initiated! Your hardware is on the way.');
      }
    } catch (error) {
      console.error('Finalization failed:', error);
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-white font-sans">
        <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link to="/" className="flex items-center gap-2">
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
                  TechSpark
                </span>
              </Link>
              <div className="flex gap-6 items-center">
                <Link to="/browse" className="text-slate-300 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">
                  Hardware
                </Link>
                <Link to="/orders" className="text-slate-300 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">
                  Orders
                </Link>
                <Link to="/dashboard" className="text-slate-300 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">
                  Stats
                </Link>
                <Link to="/login" className="text-slate-300 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">
                  Login
                </Link>
                <button 
                  onClick={() => setIsCartOpen(true)}
                  className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors relative"
                >
                  <FiShoppingCart size={20} />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 text-white text-[10px] flex items-center justify-center rounded-full font-bold">
                      {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </nav>
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse onAddToCart={addToCart} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/orders" element={<OrderHistory />} />
          </Routes>
        </main>

        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          items={cartItems}
          onRemove={removeFromCart}
          onPlaceOrder={placeOrder}
        />
      </div>
    </Router>
  );
}

export default App;
