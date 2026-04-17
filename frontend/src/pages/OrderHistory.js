import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiPackage, FiCalendar, FiClock, FiCheckCircle } from 'react-icons/fi';
export default function OrderHistory() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    // Mock customer ID for demo - in real app would come from auth context
    const customerId = 'demo-user-123';
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`/api/orders/history/${customerId}`);
                const data = await response.json();
                setOrders(data);
            }
            catch (error) {
                console.error('Failed to fetch orders:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [customerId]);
    if (loading)
        return (_jsx("div", { className: "min-h-screen bg-black flex items-center justify-center", children: _jsx("div", { className: "w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" }) }));
    return (_jsx("div", { className: "min-h-screen bg-black text-slate-100 p-8 pt-24", children: _jsxs("div", { className: "max-w-4xl mx-auto space-y-12", children: [_jsxs("header", { children: [_jsxs(motion.h1, { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, className: "text-4xl font-black tracking-tight", children: ["ORDER ", _jsx("span", { className: "text-indigo-500", children: "HISTORY" })] }), _jsx("p", { className: "text-slate-500 mt-2 font-medium", children: "Tracking your tech acquisitions and logistics." })] }), orders.length === 0 ? (_jsxs("div", { className: "bg-slate-900/30 border border-slate-800/50 rounded-3xl p-12 text-center backdrop-blur-xl", children: [_jsx(FiPackage, { className: "mx-auto text-slate-700 mb-6", size: 64 }), _jsx("h3", { className: "text-xl font-bold", children: "No hardware deployments found" }), _jsx("p", { className: "text-slate-500 mt-2", children: "Your acquisition history is currently empty." }), _jsx("button", { onClick: () => window.location.href = '/browse', className: "mt-8 bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-blue-500 hover:text-white transition-all", children: "Explore Catalog" })] })) : (_jsx("div", { className: "space-y-6", children: orders.map((order, i) => (_jsxs(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { delay: i * 0.1 }, className: "group bg-slate-900/30 border border-slate-800/50 p-8 rounded-3xl backdrop-blur-xl hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "p-3 bg-indigo-500/10 text-indigo-400 rounded-2xl", children: _jsx(FiPackage, { size: 24 }) }), _jsxs("div", { children: [_jsx("p", { className: "text-xs font-black text-slate-600 uppercase tracking-widest", children: "Order ID" }), _jsxs("p", { className: "font-mono text-sm font-bold text-slate-300", children: ["#", order.id.slice(-8).toUpperCase()] })] })] }), _jsxs("div", { className: "flex gap-6", children: [_jsxs("div", { className: "flex items-center gap-2 text-slate-500", children: [_jsx(FiCalendar, { size: 14 }), _jsx("span", { className: "text-sm font-medium", children: new Date(order.orderDate).toLocaleDateString() })] }), _jsxs("div", { className: "flex items-center gap-2 text-slate-500", children: [_jsx(FiClock, { size: 14 }), _jsx("span", { className: "text-sm font-medium", children: order.status })] })] })] }), _jsxs("div", { className: "flex items-center justify-between md:justify-end gap-12", children: [_jsxs("div", { className: "text-right", children: [_jsx("p", { className: "text-xs font-black text-slate-600 uppercase tracking-widest", children: "Investment" }), _jsxs("p", { className: "text-2xl font-black text-white", children: ["$", order.totalPrice.toLocaleString()] })] }), _jsxs("div", { className: "flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400", children: [_jsx(FiCheckCircle, { size: 16 }), _jsx("span", { className: "text-xs font-black uppercase tracking-widest", children: "Verified" })] })] })] }, order.id))) }))] }) }));
}
//# sourceMappingURL=OrderHistory.js.map