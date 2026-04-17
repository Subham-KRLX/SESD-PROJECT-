import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { TrendingUp, ShoppingBag, Users, Zap, ShieldCheck } from 'lucide-react';

interface SalesHistoryPoint {
  month: string;
  sales: number;
  units: number;
}

interface DashboardViewModel {
  totalOrders?: number;
  totalCustomers?: number;
  topProduct?: string;
  lowStockItems?: number;
  salesHistory?: SalesHistoryPoint[];
}

export function HardwareDashboard({ stats }: { stats: DashboardViewModel | null }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = containerRef.current?.querySelectorAll('.stat-card');
    if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'back.out(1.2)',
          }
        );
    }
  }, []);

  const salesData = stats?.salesHistory || [
    { month: 'Jan', sales: 4200, units: 21 },
    { month: 'Feb', sales: 3800, units: 18 },
    { month: 'Mar', sales: 6500, units: 35 },
    { month: 'Apr', sales: 5100, units: 28 },
    { month: 'May', sales: 8200, units: 45 },
  ];

  const statCards = [
    { icon: ShoppingBag, label: 'Orders', value: stats?.totalOrders || '0', tone: 'blue' },
    { icon: Users, label: 'Customers', value: stats?.totalCustomers || '0', tone: 'violet' },
    { icon: Zap, label: 'Top product', value: stats?.topProduct || 'N/A', tone: 'pink' },
    { icon: ShieldCheck, label: 'Low stock items', value: stats?.lowStockItems || '0', tone: 'emerald' },
  ];

  return (
    <div ref={containerRef} className="mx-auto max-w-7xl space-y-10 px-4 py-12 md:px-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-gray-500">Operations overview</p>
            <h1 className="display-font text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                Hardware
                <span className="block bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                  metrics and trends
                </span>
            </h1>
            <p className="max-w-xl text-base leading-7 text-gray-400 md:text-lg">A clean snapshot of demand, inventory pressure, and revenue movement across the marketplace.</p>
          </div>
          <div className="inline-flex items-center gap-3 rounded-full border border-white/8 bg-white/5 px-4 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-gray-300 shadow-lg shadow-black/20">
             <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.45)]" />
             Live data connected
          </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          const toneClasses = {
            blue: 'bg-blue-500/10 text-blue-300 border-blue-500/15',
            violet: 'bg-violet-500/10 text-violet-300 border-violet-500/15',
            pink: 'bg-pink-500/10 text-pink-300 border-pink-500/15',
            emerald: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/15',
          }[stat.tone];
          return (
            <div
              key={idx}
              className="stat-card group relative overflow-hidden rounded-[28px] border border-white/8 bg-gradient-to-b from-[#171d2a] to-[#0f1419] p-7 shadow-[0_18px_50px_rgba(0,0,0,0.28)] transition-all duration-300 hover:border-white/12"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-30" />
              <div className={`mb-6 inline-flex rounded-2xl border p-4 ${toneClasses}`}>
                <Icon size={24} />
              </div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">{stat.label}</p>
              <p className="text-3xl font-bold tracking-tight text-white">{stat.value}</p>
              
              <div className="mt-5 h-px w-full bg-white/6 overflow-hidden">
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ repeat: Infinity, duration: 4.5, ease: 'linear' }}
                    className="h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  />
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Sales Trajectory */}
        <div className="relative overflow-hidden rounded-[32px] border border-white/8 bg-[#121823] p-7 shadow-[0_18px_50px_rgba(0,0,0,0.26)]">
          <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="text-blue-300" size={20} />
              <h2 className="text-xl font-bold text-white">Revenue trajectory</h2>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.32}/>
                    <stop offset="95%" stopColor="#60A5FA" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                    dataKey="month" 
                    stroke="#4b5563" 
                    fontSize={10} 
                    fontWeight="900" 
                    tickLine={false} 
                    axisLine={false}
                    dy={10}
                />
                <YAxis 
                    stroke="#4b5563" 
                    fontSize={10} 
                    fontWeight="900" 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(v) => `$${v}`}
                />
                <Tooltip 
                    contentStyle={{ 
                        background: 'rgba(17, 23, 37, 0.96)', 
                        border: '1px solid rgba(148, 163, 184, 0.12)',
                        borderRadius: '16px',
                        boxShadow: '0 16px 40px rgba(0,0,0,0.35)'
                    }} 
                    itemStyle={{ color: '#93C5FD', fontWeight: 'bold' }}
                />
                <Area 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#60A5FA" 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#colorSales)" 
                    animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Acquisition Velocity */}
    <div className="rounded-[32px] border border-white/8 bg-[#121823] p-7 shadow-[0_18px_50px_rgba(0,0,0,0.26)]">
          <div className="flex items-center gap-3 mb-8">
        <Zap className="text-violet-300" size={20} />
        <h2 className="text-xl font-bold text-white">Acquisition velocity</h2>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                <XAxis 
                    dataKey="month" 
          stroke="#4b5563" 
                    fontSize={10} 
                    fontWeight="900" 
                    tickLine={false} 
                    axisLine={false}
                    dy={10}
                />
                <YAxis 
          stroke="#4b5563" 
                    fontSize={10} 
                    fontWeight="900" 
                    tickLine={false} 
                    axisLine={false}
                />
                <Tooltip 
          cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                    contentStyle={{ 
            background: 'rgba(17, 23, 37, 0.96)', 
            border: '1px solid rgba(148, 163, 184, 0.12)',
            borderRadius: '16px'
                    }} 
                />
                <Bar 
                    dataKey="units" 
          fill="#8B5CF6" 
                    radius={[10, 10, 0, 0]} 
                    animationDuration={1500}
                    barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
