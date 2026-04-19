import { useEffect, useState } from 'react';
import { PageTransition } from '../contexts/PageTransition';
import { HardwareGrid } from '../components/features/Catalog/HardwareGrid';
import { Terminal, Search, Layers, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiClient } from '../utils/apiClient';

export default function Browse() {
  const [gadgets, setGadgets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [compList, setCompList] = useState<any[]>([]);
  const [showCompModal, setShowCompModal] = useState(false);

  useEffect(() => {
    const fetchGadgets = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching gadgets...');
        const response = await apiClient.fetch('/api/gadgets');
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: System failure`);
        }
        
        const data = await response.json();
        console.log('Gadgets fetched:', data.length);
        setGadgets(data);
      } catch (err: any) {
        console.error('Error fetching gadgets:', err);
        setError(err.message);
        
        // Fallback data
        setGadgets([
          { id: '1', name: 'RTX 5090 Prototype', manufacturer: 'QuantumTech', price: 2499, stockQty: 5, techSpecs: '32GB GDDR7, Blackwell Architecture', image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=1000' },
          { id: '2', name: 'Ryzen 9 9950X', manufacturer: 'QuantumTech', price: 699, stockQty: 15, techSpecs: '16 Cores, 32 Threads, 5.8GHz', image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=1000' },
          { id: '3', name: 'Z790 Dark King', manufacturer: 'Evoga', price: 799, stockQty: 3, techSpecs: 'E-ATX, 24 Phase VRM, DDR5-8400+', image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&q=80&w=1000' }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchGadgets();
  }, []);

  const toggleCompare = (g: any) => {
    if (compList.find(i => i.id === g.id)) {
      setCompList(compList.filter(i => i.id !== g.id));
    } else if (compList.length < 3) {
      setCompList([...compList, g]);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-transparent py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-blue-300">
                  <Terminal size={20} />
                  <span className="text-xs font-semibold uppercase tracking-[0.3em]">Inventory overview</span>
              </div>
              <h1 className="display-font text-5xl font-bold text-white sm:text-6xl">
                  Hardware <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">catalog</span>
              </h1>
            </div>

            <div className="flex gap-4 w-full md:w-auto">
                <div className="relative flex-1 group md:w-80">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-300 transition-colors" size={20} />
                    <input type="text" placeholder="Filter by specs..." className="w-full rounded-2xl border border-white/8 bg-white/5 pl-14 pr-6 py-4 text-white focus:border-blue-500/30 focus:outline-none" />
                </div>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center min-h-96">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mb-4"></div>
                <p className="text-gray-400">Loading hardware catalog...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center min-h-96">
              <div className="text-center">
                <p className="text-red-400 mb-4">⚠️ {error}</p>
                <p className="text-gray-400">Showing cached fallback data...</p>
              </div>
            </div>
          ) : gadgets.length === 0 ? (
            <div className="flex items-center justify-center min-h-96">
              <p className="text-gray-400">No hardware found</p>
            </div>
          ) : null}

          <HardwareGrid gadgets={gadgets} onCompare={toggleCompare} compList={compList} />

          {/* Analysis tray for hardware comparison */}
          <AnimatePresence>
            {compList.length > 0 && (
              <motion.div 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-6 rounded-3xl border border-blue-500/20 bg-[#121823]/95 p-4 pr-6 backdrop-blur-xl shadow-2xl"
              >
                <div className="flex -space-x-3">
                  {compList.map(g => (
                    <div key={g.id} className="relative w-12 h-12 rounded-2xl border-2 border-[#121823] overflow-hidden">
                      <img src={g.image} alt="" className="w-full h-full object-cover" />
                      <button onClick={() => toggleCompare(g)} className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                        <X size={14} className="text-white" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div className="text-sm font-bold text-white pr-2">{compList.length}/3 selected</div>
                <button 
                  onClick={() => setShowCompModal(true)}
                  disabled={compList.length < 2}
                  className="rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Analyze Specs
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Deep spec correlation matrix */}
          <AnimatePresence>
            {showCompModal && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[300] flex items-center justify-center bg-black/80 backdrop-blur-md p-6"
              >
                <motion.div 
                  initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                  className="w-full max-w-5xl rounded-[32px] border border-white/10 bg-[#0F1419] p-8 shadow-2xl"
                >
                  <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-3">
                      <Layers className="text-blue-400" />
                      <h2 className="text-2xl font-bold">Hardware Correlation Analysis</h2>
                    </div>
                    <button onClick={() => setShowCompModal(false)} className="rounded-xl bg-white/5 p-3 hover:bg-white/10">
                      <X size={20} />
                    </button>
                  </div>

                  <div className="grid grid-cols-4 gap-4 border-t border-white/8 pt-8 text-sm">
                    <div className="text-gray-500 font-bold uppercase tracking-wider py-4">Component</div>
                    {compList.map(g => (
                      <div key={g.id} className="text-center font-bold text-blue-300 py-4 underline underline-offset-8">
                        {g.name}
                      </div>
                    ))}

                    <div className="text-gray-500 font-bold uppercase tracking-wider py-4 border-t border-white/5">Price</div>
                    {compList.map(g => (
                      <div key={g.id} className="text-center py-4 text-xl font-bold border-t border-white/5">${g.price}</div>
                    ))}

                    <div className="text-gray-500 font-bold uppercase tracking-wider py-4 border-t border-white/5">Specifications</div>
                    {compList.map(g => (
                      <div key={g.id} className="text-center py-4 text-gray-400 text-xs leading-relaxed border-t border-white/5">{g.techSpecs}</div>
                    ))}

                    <div className="text-gray-500 font-bold uppercase tracking-wider py-4 border-t border-white/5">Status</div>
                    {compList.map(g => (
                      <div key={g.id} className="text-center py-4 border-t border-white/5">
                        <span className="rounded-lg bg-emerald-500/10 px-3 py-1 text-[10px] font-bold text-emerald-400 uppercase tracking-widest border border-emerald-500/20">
                          {g.stockQty > 0 ? 'Optimal' : 'Depleted'}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}
