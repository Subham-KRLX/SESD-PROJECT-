import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Browse() {
  const [gadgets, setGadgets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGadgets = async () => {
      try {
        const response = await fetch('/api/gadgets');
        if (!response.ok) throw new Error('System failure: Unable to sync with hardware grid');
        const data = await response.json();
        setGadgets(data);
      } catch (err: any) {
        setError(err.message);
        // Fallback for demo if API isn't running
        setGadgets([
          { id: '1', modelName: 'RTX 5090 Prototype', manufacturer: 'QuantumTech', price: 2499, stockQty: 5, techSpecs: '32GB GDDR7, Blackwell Architecture' },
          { id: '2', modelName: 'Ryzen 9 9950X', manufacturer: 'QuantumTech', price: 699, stockQty: 15, techSpecs: '16 Cores, 32 Threads, 5.8GHz' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchGadgets();
  }, []);

  return (
    <div className="min-h-screen bg-black text-slate-100 py-20 px-6 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-2">
              HARDWARE <span className="text-blue-500">GRID</span>
            </h2>
            <p className="text-slate-500 font-medium">Synchronizing with real-time vendor inventory</p>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <input 
                type="text" 
                placeholder="Search specs..." 
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-500/50 focus:outline-none backdrop-blur-xl transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600">⌘K</span>
            </div>
            <button className="bg-slate-900 hover:bg-slate-800 border border-slate-800 px-6 py-4 rounded-2xl transition-all font-bold">
              Filters
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col justify-center items-center h-96 space-y-4">
            <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
            <p className="text-blue-500 font-mono animate-pulse">DECRYPTING INVENTORY...</p>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {gadgets.map((g, i) => (
                <motion.div 
                  key={g.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group relative bg-slate-900/30 border border-slate-800/50 rounded-[2.5rem] overflow-hidden backdrop-blur-3xl hover:border-blue-500/40 transition-all duration-500"
                >
                  {/* Glowing background effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-10 blur-2xl transition-opacity" />
                  
                  <div className="aspect-square bg-gradient-to-br from-slate-800/50 to-transparent flex items-center justify-center relative overflow-hidden">
                     <span className="text-7xl group-hover:scale-110 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0">
                       {g.modelName.includes('RTX') ? '🔌' : '🧠'}
                     </span>
                     <div className="absolute top-6 right-6 bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/5 font-bold text-green-400">
                       ${g.price}
                     </div>
                  </div>

                  <div className="p-8">
                    <div className="mb-6">
                      <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-500/80 mb-2 block">
                        {g.manufacturer}
                      </span>
                      <h3 className="text-2xl font-bold tracking-tight group-hover:text-blue-400 transition-colors">
                        {g.modelName}
                      </h3>
                    </div>

                    <p className="text-slate-500 text-sm leading-relaxed mb-8 h-10 overflow-hidden line-clamp-2">
                      {g.techSpecs}
                    </p>

                    <div className="flex justify-between items-center bg-black/20 p-2 rounded-2xl border border-white/5">
                      <div className="px-4">
                        <span className={`text-[10px] font-black uppercase tracking-widest ${g.stockQty > 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {g.stockQty > 0 ? `${g.stockQty} UNITS` : 'DEPLETED'}
                        </span>
                      </div>
                      <button 
                        disabled={g.stockQty === 0}
                        className={`px-6 py-3 rounded-xl font-black text-xs tracking-widest transition-all ${
                          g.stockQty > 0 
                          ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.2)]' 
                          : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                        }`}
                      >
                        ACQUIRE
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
