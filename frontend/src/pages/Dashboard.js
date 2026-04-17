import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiPackage, FiUsers, FiDollarSign, FiTool, FiTrendingUp, FiAlertCircle } from 'react-icons/fi';
export default function Dashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('/api/admin/dashboard-stats');
                const data = await response.json();
                setStats(data);
            }
            catch (error) {
                console.error('Failed to fetch stats:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);
    if (loading)
        return (_jsx("div", { className: "min-h-screen bg-black flex items-center justify-center", children: _jsx("div", { className: "w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" }) }));
    const statCards = [
        { title: 'Total Revenue', value: `$${stats?.totalRevenue.toLocaleString()}`, icon: FiDollarSign, color: 'emerald' },
        { title: 'Active Orders', value: stats?.totalOrders, icon: FiPackage, color: 'blue' },
        { title: 'Customers', value: stats?.totalCustomers, icon: FiUsers, color: 'indigo' },
        { title: 'Hardware Catalog', value: stats?.totalGadgets, icon: FiTool, color: 'purple' },
    ];
    return (_jsx("div", { className: "min-h-screen bg-black text-slate-100 p-8 pt-24", children: _jsxs("div", { className: "max-w-7xl mx-auto space-y-12", children: [_jsxs("header", { className: "flex flex-col md:flex-row md:items-center justify-between gap-6", children: [_jsxs("div", { children: [_jsxs(motion.h1, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, className: "text-4xl font-black tracking-tight", children: ["SYSTEM ", _jsx("span", { className: "text-blue-500", children: "DASHBOARD" })] }), _jsx("p", { className: "text-slate-500 mt-2 font-medium", children: "Real-time technical hardware analytics and oversight." })] }), _jsx("div", { className: "flex gap-4", children: _jsxs("div", { className: "bg-slate-900/50 border border-slate-800 px-6 py-3 rounded-2xl backdrop-blur-xl flex items-center gap-3", children: [_jsx("div", { className: "w-2 h-2 bg-emerald-500 rounded-full animate-pulse" }), _jsx("span", { className: "text-sm font-bold text-slate-300", children: "SYSTEM COLD-READY" })] }) })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: statCards.map((stat, i) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.1 }, className: "bg-slate-900/30 border border-slate-800/50 p-6 rounded-3xl backdrop-blur-xl hover:border-slate-700 transition-colors group", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("div", { className: `p-3 rounded-2xl bg-${stat.color}-500/10 text-${stat.color}-400 group-hover:scale-110 transition-transform`, children: _jsx(stat.icon, { size: 24 }) }), i === 0 && _jsx(FiTrendingUp, { className: "text-emerald-500" })] }), _jsx("h3", { className: "text-slate-500 text-sm font-bold uppercase tracking-wider", children: stat.title }), _jsx("p", { className: "text-3xl font-black mt-1 tracking-tight", children: stat.value })] }, i))) }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [_jsxs("div", { className: "lg:col-span-2 bg-slate-900/40 border border-slate-800/50 rounded-3xl p-8 backdrop-blur-xl", children: [_jsx("h3", { className: "text-xl font-bold mb-8", children: "Hardware Logistics (24h)" }), _jsx("div", { className: "h-64 flex items-end justify-between gap-4", children: [40, 70, 45, 90, 65, 80, 55, 30, 95, 75].map((h, i) => (_jsx(motion.div, { initial: { height: 0 }, animate: { height: `${h}%` }, transition: { delay: i * 0.05 + 0.5, duration: 1 }, className: "flex-1 bg-gradient-to-t from-blue-600 to-indigo-400 rounded-t-lg opacity-80 hover:opacity-100 transition-opacity relative group", children: _jsxs("div", { className: "absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-white text-black text-[10px] font-bold px-2 py-1 rounded transition-opacity", children: [h, "%"] }) }, i))) }), _jsxs("div", { className: "flex justify-between mt-6 text-xs font-bold text-slate-600 uppercase tracking-widest", children: [_jsx("span", { children: "00:00" }), _jsx("span", { children: "06:00" }), _jsx("span", { children: "12:00" }), _jsx("span", { children: "18:00" }), _jsx("span", { children: "23:59" })] })] }), _jsxs("div", { className: "bg-slate-900/40 border border-slate-800/50 rounded-3xl p-8 backdrop-blur-xl", children: [_jsxs("div", { className: "flex items-center justify-between mb-8", children: [_jsx("h3", { className: "text-xl font-bold", children: "System Alerts" }), _jsx("span", { className: "bg-red-500/10 text-red-400 text-[10px] px-2 py-1 rounded-full font-bold", children: "CRITICAL" })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex gap-4 p-4 rounded-2xl bg-red-500/5 border border-red-500/10", children: [_jsx(FiAlertCircle, { className: "text-red-500 shrink-0", size: 20 }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-bold text-red-200", children: "Low Stock: RTX 5090 FE" }), _jsx("p", { className: "text-xs text-slate-500 mt-1", children: "Inventory dropped below threshold (2 units remaining)." })] })] }), _jsxs("div", { className: "flex gap-4 p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10", children: [_jsx(FiPackage, { className: "text-blue-500 shrink-0", size: 20 }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-bold text-blue-200", children: "Large Order Received" }), _jsx("p", { className: "text-xs text-slate-500 mt-1", children: "Order #SPK-4921 contains bulk hardware units." })] })] })] })] })] })] }) }));
}
//# sourceMappingURL=Dashboard.js.map