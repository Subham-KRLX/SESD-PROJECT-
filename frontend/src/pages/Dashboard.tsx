import { useEffect, useState } from 'react';
import { PageTransition } from '../contexts/PageTransition';
import { HardwareDashboard } from '../components/features/Dashboard/HardwareDashboard';
import { InventoryManager } from '../components/features/Dashboard/InventoryManager';
import { useAuth } from '../contexts/AuthContext';
import { BarChart3, Box, Shield } from 'lucide-react';
import { apiClient } from '../utils/apiClient';

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'metrics' | 'inventory'>('metrics');
  const { user } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await apiClient.fetch('/api/admin/dashboard-stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        setStats({
            totalOrders: '1,429',
            totalCustomers: '892',
            topProduct: 'RTX 5090 Prototype',
            lowStockItems: '3',
            salesHistory: [
              { month: 'Jan', sales: 4200, units: 21 },
              { month: 'Feb', sales: 3800, units: 18 },
              { month: 'Mar', sales: 6500, units: 35 },
              { month: 'Apr', sales: 5100, units: 28 },
              { month: 'May', sales: 8200, units: 45 },
            ]
        });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const isVendor = user?.role === 'VENDOR' || user?.role === 'ADMIN';

  return (
    <PageTransition>
      <div className="min-h-screen bg-transparent">
        {loading ? (
             <div className="min-h-screen flex flex-col items-center justify-center space-y-6">
                <div className="relative w-20 h-20">
                    <div className="absolute inset-0 rounded-full border-4 border-white/10" />
                    <div className="absolute inset-0 rounded-full border-t-4 border-blue-400 animate-spin" />
                </div>
                <p className="animate-pulse font-semibold uppercase tracking-widest text-blue-300">Initializing analytics...</p>
            </div>
        ) : (
          <div className="pt-20">
            {isVendor && (
              <div className="max-w-7xl mx-auto px-8 mb-8">
                <div className="inline-flex items-center gap-1 rounded-2xl border border-white/8 bg-white/5 p-1.5 backdrop-blur-md">
                   <button 
                    onClick={() => setActiveTab('metrics')}
                    className={`flex items-center gap-2 rounded-xl px-6 py-2.5 text-xs font-black uppercase tracking-widest transition-all ${
                      activeTab === 'metrics' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'
                    }`}
                   >
                     <BarChart3 size={14} />
                     Metrics
                   </button>
                   <button 
                    onClick={() => setActiveTab('inventory')}
                    className={`flex items-center gap-2 rounded-xl px-6 py-2.5 text-xs font-black uppercase tracking-widest transition-all ${
                      activeTab === 'inventory' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'
                    }`}
                   >
                     <Box size={14} />
                     Inventory
                   </button>
                </div>
              </div>
            )}
            
            {activeTab === 'metrics' ? (
              <HardwareDashboard stats={stats} />
            ) : (
              <InventoryManager />
            )}
          </div>
        )}
      </div>
    </PageTransition>
  );
}
