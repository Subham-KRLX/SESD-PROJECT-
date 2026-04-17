import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.js';
import Browse from './pages/Browse.js';
import Login from './pages/Login.js';
import Dashboard from './pages/Dashboard.js';
import OrderHistory from './pages/OrderHistory.js';
import CartDrawer from './components/CartDrawer.js';
import { useState, useEffect } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
function App() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const addToCart = (product) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { id: product.id, name: product.name, price: product.price, quantity: 1 }];
        });
        setIsCartOpen(true);
    };
    const removeFromCart = (id) => {
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
        }
        catch (error) {
            console.error('Finalization failed:', error);
        }
    };
    return (_jsx(Router, { children: _jsxs("div", { className: "min-h-screen bg-slate-900 text-white font-sans", children: [_jsx("nav", { className: "border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex items-center justify-between h-16", children: [_jsx(Link, { to: "/", className: "flex items-center gap-2", children: _jsx("span", { className: "text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500", children: "TechSpark" }) }), _jsxs("div", { className: "flex gap-6 items-center", children: [_jsx(Link, { to: "/browse", className: "text-slate-300 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest", children: "Hardware" }), _jsx(Link, { to: "/orders", className: "text-slate-300 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest", children: "Orders" }), _jsx(Link, { to: "/dashboard", className: "text-slate-300 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest", children: "Stats" }), _jsx(Link, { to: "/login", className: "text-slate-300 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest", children: "Login" }), _jsxs("button", { onClick: () => setIsCartOpen(true), className: "p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors relative", children: [_jsx(FiShoppingCart, { size: 20 }), cartItems.length > 0 && (_jsx("span", { className: "absolute -top-1 -right-1 w-4 h-4 bg-blue-500 text-white text-[10px] flex items-center justify-center rounded-full font-bold", children: cartItems.reduce((acc, item) => acc + item.quantity, 0) }))] })] })] }) }) }), _jsx("main", { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/browse", element: _jsx(Browse, { onAddToCart: addToCart }) }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "/orders", element: _jsx(OrderHistory, {}) })] }) }), _jsx(CartDrawer, { isOpen: isCartOpen, onClose: () => setIsCartOpen(false), items: cartItems, onRemove: removeFromCart, onPlaceOrder: placeOrder })] }) }));
}
export default App;
//# sourceMappingURL=App.js.map