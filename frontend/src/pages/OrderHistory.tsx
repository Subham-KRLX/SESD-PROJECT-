import { useEffect, useState } from 'react';
import { PageTransition } from '../contexts/PageTransition';
import { OrderTimeline } from '../components/features/OrderHistory/OrderTimeline';
import { History, Share2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface OrderLineItem {
  name?: string;
  quantity: number;
  price?: number;
  priceAtPurchase?: number;
  gadgetId?: string;
  gadget?: { name?: string };
}

interface OrderHistoryItem {
  id: string;
  createdAt: string;
  totalAmount: number;
  status: string;
  items: OrderLineItem[];
}

export default function OrderHistory() {
  const [orders, setOrders] = useState<OrderHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const customerId = user?.id ?? 'demo-user-123';

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`/api/orders/history/${customerId}`);
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
        // Fallback for demo
        setOrders([
            { 
              id: 'ord_9182x73', 
              createdAt: new Date().toISOString(), 
              totalAmount: 2499, 
              status: 'Delivered',
              items: [{ name: 'RTX 5090 Prototype', quantity: 1, price: 2499 }]
            },
            { 
              id: 'ord_2810v45', 
              createdAt: new Date(Date.now() - 86400000).toISOString(), 
              totalAmount: 998, 
              status: 'Shipped',
              items: [{ name: 'Ryzen 9 9950X', quantity: 1, price: 699 }, { name: 'Kraken Z73 Elite', quantity: 1, price: 299 }]
            }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [customerId]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-transparent py-16">
        <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                <div className="space-y-4">
            <div className="flex items-center gap-3 text-blue-300">
                      <History size={20} />
              <span className="text-xs font-semibold uppercase tracking-[0.3em]">Accessing archives</span>
                  </div>
            <h1 className="display-font text-5xl font-bold text-white sm:text-6xl">
              Acquisition <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">history</span>
                  </h1>
            <p className="max-w-lg text-base leading-7 text-gray-400">Review your completed purchases and the current state of each order in a more readable format.</p>
                </div>
                
          <button className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/5 px-6 py-3 text-gray-400 transition-all hover:text-white hover:bg-white/[0.08]">
                    <Share2 size={18} />
            <span className="text-xs font-semibold uppercase tracking-widest">Post report</span>
                </button>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center h-96 space-y-6">
                    <div className="relative w-20 h-20">
              <div className="absolute inset-0 rounded-full border-4 border-white/10" />
              <div className="absolute inset-0 rounded-full border-t-4 border-blue-400 animate-spin" />
                    </div>
            <p className="animate-pulse font-semibold uppercase tracking-widest text-blue-300">Retrieving logs...</p>
                </div>
            ) : orders.length === 0 ? (
          <div className="card flex h-96 flex-col items-center justify-center space-y-6 rounded-[28px] text-center">
             <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/5">
              <History size={40} className="text-gray-500" />
                     </div>
                     <div>
              <h3 className="text-2xl font-bold text-white">Archives empty</h3>
              <p className="mx-auto mt-2 max-w-xs text-gray-400">No hardware acquisitions have been registered yet.</p>
                     </div>
                     <button 
                        onClick={() => window.location.href = '/browse'}
              className="rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-10 py-4 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:opacity-90 shadow-lg shadow-blue-950/30"
                     >
                        Initiate First Deployment
                     </button>
                </div>
            ) : (
                <OrderTimeline orders={orders} />
            )}
        </div>
      </div>
    </PageTransition>
  );
}
