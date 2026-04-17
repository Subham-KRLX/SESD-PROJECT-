import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiPackage, FiCalendar, FiClock, FiCheckCircle } from 'react-icons/fi';

interface OrderItem {
  gadgetId: string;
  quantity: number;
  priceAtOrder: number;
}

interface Order {
  id: string;
  orderDate: string;
  totalPrice: number;
  status: string;
}

export default function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock customer ID for demo - in real app would come from auth context
  const customerId = 'demo-user-123';

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`/api/orders/history/${customerId}`);
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [customerId]);

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-slate-100 p-8 pt-24">
      <div className="max-w-4xl mx-auto space-y-12">
        <header>
           <motion.h1 
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-4xl font-black tracking-tight"
           >
             ORDER <span className="text-indigo-500">HISTORY</span>
           </motion.h1>
           <p className="text-slate-500 mt-2 font-medium">Tracking your tech acquisitions and logistics.</p>
        </header>

        {orders.length === 0 ? (
          <div className="bg-slate-900/30 border border-slate-800/50 rounded-3xl p-12 text-center backdrop-blur-xl">
             <FiPackage className="mx-auto text-slate-700 mb-6" size={64} />
             <h3 className="text-xl font-bold">No hardware deployments found</h3>
             <p className="text-slate-500 mt-2">Your acquisition history is currently empty.</p>
             <button 
              onClick={() => window.location.href = '/browse'}
              className="mt-8 bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-blue-500 hover:text-white transition-all"
             >
               Explore Catalog
             </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, i) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group bg-slate-900/30 border border-slate-800/50 p-8 rounded-3xl backdrop-blur-xl hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-2xl">
                      <FiPackage size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-600 uppercase tracking-widest">Order ID</p>
                      <p className="font-mono text-sm font-bold text-slate-300">#{order.id.slice(-8).toUpperCase()}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-6">
                    <div className="flex items-center gap-2 text-slate-500">
                      <FiCalendar size={14} />
                      <span className="text-sm font-medium">{new Date(order.orderDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                      <FiClock size={14} />
                      <span className="text-sm font-medium">{order.status}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-12">
                   <div className="text-right">
                      <p className="text-xs font-black text-slate-600 uppercase tracking-widest">Investment</p>
                      <p className="text-2xl font-black text-white">${order.totalPrice.toLocaleString()}</p>
                   </div>
                   
                   <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                      <FiCheckCircle size={16} />
                      <span className="text-xs font-black uppercase tracking-widest">Verified</span>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
