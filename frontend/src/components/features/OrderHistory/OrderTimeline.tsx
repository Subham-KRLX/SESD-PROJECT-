import { motion } from 'framer-motion';
import { Check, Clock, Truck, Package, ChevronRight } from 'lucide-react';

export function OrderTimeline({ orders }: { orders: any[] }) {
  const statusSteps = [
    { status: 'PENDING', icon: Clock, color: 'text-yellow-500' },
    { status: 'PAID', icon: Package, color: 'text-blue-500' },
    { status: 'SHIPPED', icon: Truck, color: 'text-violet-500' },
    { status: 'DELIVERED', icon: Check, color: 'text-green-500' },
  ];

  return (
    <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto py-12 px-4">
      {orders.map((order, idx) => {
        const normalizedStatus = String(order.status || 'PENDING').toUpperCase();
        const currentStatusIdx = statusSteps.findIndex(s => s.status === normalizedStatus);
        const totalAmount = Number(order.totalAmount ?? order.price ?? 0);
        
        return (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            className="relative overflow-hidden rounded-[30px] border border-white/8 bg-gradient-to-b from-[#171d2a] to-[#0f1419] p-8 shadow-[0_18px_50px_rgba(0,0,0,0.28)]"
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-blue-500/5 blur-[60px]" />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 relative z-10">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                    <h3 className="display-font text-2xl font-bold text-white tracking-tight">Deployment #{String(order.id).slice(-8).toUpperCase()}</h3>
                    <ChevronRight size={20} className="text-gray-600" />
                </div>
                <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">{new Date(order.createdAt).toLocaleDateString()} • {new Date(order.createdAt).toLocaleTimeString()}</p>
              </div>
              <div className="flex flex-col items-end">
                  <span className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-tighter shadow-lg ${
                    normalizedStatus === 'DELIVERED' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                    normalizedStatus === 'SHIPPED' ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30' :
                    'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  }`}>
                    {normalizedStatus}
                  </span>
                  <p className="text-white font-black text-xl mt-2">${totalAmount.toFixed(2)}</p>
              </div>
            </div>

            {/* Visual Timeline */}
            <div className="relative mb-12 px-2">
              <div className="flex justify-between relative z-10">
                {statusSteps.map((step, stepIdx) => {
                  const Icon = step.icon;
                  const isCompleted = currentStatusIdx >= stepIdx;
                  const isActive = currentStatusIdx === stepIdx;

                  return (
                    <div key={step.status} className="flex flex-col items-center group">
                      <motion.div
                        animate={{ 
                            scale: isActive ? 1.2 : 1,
                            backgroundColor: isCompleted ? 'rgba(59, 130, 246, 1)' : 'rgba(255, 255, 255, 0.05)',
                            borderColor: isCompleted ? 'rgba(59, 130, 246, 0.5)' : 'rgba(255, 255, 255, 0.1)'
                        }}
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 shadow-2xl transition-all duration-500`}
                      >
                        <Icon size={24} className={isCompleted ? 'text-black' : 'text-gray-600'} />
                        
                        {isActive && (
                            <motion.div 
                                layoutId="glow"
                              className="absolute inset-0 bg-blue-400/20 blur-xl rounded-2xl -z-10"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            />
                        )}
                      </motion.div>
                      <p className={`text-[10px] sm:text-xs mt-4 font-black uppercase tracking-widest transition-colors duration-300 ${
                          isCompleted ? 'text-blue-300' : 'text-gray-600'
                      }`}>
                          {step.status}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Connector Lines */}
              <div className="absolute top-7 left-0 right-0 h-[2px] bg-white/5 rounded-full -z-0">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(currentStatusIdx / (statusSteps.length - 1)) * 100}%` }}
                  transition={{ duration: 1, ease: 'easeInOut', delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-blue-500 via-violet-500 to-pink-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                />
              </div>
            </div>

            {/* Order Items Summary */}
            <div className="rounded-2xl border border-white/5 bg-black/30 p-6">
                <h4 className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-gray-500">Manifest summary</h4>
                <div className="space-y-4">
                  {(order.items || []).map((item: any, itemIdx: number) => (
                    <div key={itemIdx} className="flex justify-between items-center group/item">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center font-bold text-gray-500">
                             {item.quantity}x
                         </div>
                         <span className="text-white font-semibold transition-colors group-hover/item:text-blue-300">{item.gadget?.name || item.name || String(item.gadgetId).slice(-6).toUpperCase()}</span>
                      </div>
                      <span className="text-gray-400 font-black">${Number(item.priceAtPurchase ?? item.price ?? 0).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
