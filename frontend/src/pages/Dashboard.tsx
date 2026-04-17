import { useEffect, useState } from 'react';
import { PageTransition } from '../contexts/PageTransition';
import { HardwareDashboard } from '../components/features/Dashboard/HardwareDashboard';

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/dashboard-stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        // Fallback stats for demo
        setStats({
            totalOrders: '1,429',
            totalRevenue: '$842,500',
            totalCustomers: '892',
            totalGadgets: '245',
            topProduct: 'RTX 4090 Prototype',
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
          <HardwareDashboard stats={stats} />
        )}
      </div>
    </PageTransition>
  );
}
