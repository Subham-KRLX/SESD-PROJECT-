import { useEffect, useState } from 'react';
import { PageTransition } from '../contexts/PageTransition';
import { HardwareGrid } from '../components/features/Catalog/HardwareGrid';
import { Terminal, Search, Filter } from 'lucide-react';

export default function Browse() {
  const [gadgets, setGadgets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGadgets = async () => {
      try {
        const response = await fetch('/api/gadgets');
        if (!response.ok) throw new Error('System failure: Unable to sync with hardware grid');
        const data = await response.json();
        setGadgets(data);
      } catch (err: any) {
        setGadgets([
          { id: '1', name: 'RTX 5090 Prototype', manufacturer: 'QuantumTech', price: 2499, stockQty: 5, techSpecs: '32GB GDDR7, Blackwell Architecture', image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=1000' },
          { id: '2', name: 'Ryzen 9 9950X', manufacturer: 'QuantumTech', price: 699, stockQty: 15, techSpecs: '16 Cores, 32 Threads, 5.8GHz', image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=1000' },
          { id: '3', name: 'Z790 Dark King', manufacturer: 'Evoga', price: 799, stockQty: 3, techSpecs: 'E-ATX, 24 Phase VRM, DDR5-8400+', image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&q=80&w=1000' },
          { id: '4', name: 'Kraken Z73 Elite', manufacturer: 'NZXT', price: 299, stockQty: 10, techSpecs: '360mm AIO, LCD Display, RGB', image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=1000' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchGadgets();
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-transparent py-16">
        <div className="max-w-7xl mx-auto px-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-blue-300">
                  <Terminal size={20} />
                  <span className="text-xs font-semibold uppercase tracking-[0.3em]">Inventory overview</span>
              </div>
              <h1 className="display-font text-5xl font-bold text-white sm:text-6xl">
                  Hardware <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">catalog</span>
              </h1>
              <p className="max-w-lg text-base leading-7 text-gray-400">Browse verified components with a focused product view, cleaner filtering, and stronger inventory signals.</p>
            </div>

            <div className="flex gap-4 w-full md:w-auto">
                <div className="relative flex-1 group md:w-80">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-300 transition-colors" size={20} />
                    <input 
                      type="text" 
                      placeholder="Filter by specs..." 
                      className="w-full rounded-2xl border border-white/8 bg-white/5 pl-14 pr-6 py-4 text-white transition-all placeholder:text-gray-600 focus:border-blue-500/30 focus:outline-none focus:ring-1 focus:ring-blue-500/20"
                    />
                </div>
                <button className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/5 px-8 py-4 font-semibold text-white transition-all hover:bg-white/[0.08]">
                  <Filter size={20} />
                  <span>Filters</span>
                </button>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center h-96 space-y-6">
                <div className="relative w-20 h-20">
                    <div className="absolute inset-0 rounded-full border-4 border-white/10" />
                    <div className="absolute inset-0 rounded-full border-t-4 border-blue-400 animate-spin" />
                </div>
                <p className="animate-pulse text-blue-300 font-semibold uppercase tracking-widest">Synchronizing catalog...</p>
            </div>
          ) : (
            <HardwareGrid gadgets={gadgets} />
          )}
        </div>
      </div>
    </PageTransition>
  );
}
