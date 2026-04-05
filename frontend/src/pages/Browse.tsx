import { useEffect, useState } from 'react';

export default function Browse() {
  const [gadgets, setGadgets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app we'd fetch from http://localhost:3000/api/gadgets
    // For now we mock the API response
    setTimeout(() => {
      setGadgets([
        { id: '1', modelName: 'RTX 4090', manufacturer: 'NVIDIA', price: 1599, stockQty: 10, techSpecs: '24GB GDDR6X, 16384 CUDA Cores' },
        { id: '2', modelName: 'Ryzen 9 7950X', manufacturer: 'AMD', price: 599, stockQty: 5, techSpecs: '16 Cores, 32 Threads, 5.7GHz Boost' },
        { id: '3', modelName: 'ROG Crosshair X670E', manufacturer: 'ASUS', price: 479, stockQty: 12, techSpecs: 'AM5 Socket, DDR5, PCIe 5.0' },
        { id: '4', modelName: 'Samsung 990 PRO 2TB', manufacturer: 'Samsung', price: 169, stockQty: 0, techSpecs: 'PCIe 4.0 NVMe M.2 7450 MB/s' }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold">Professional Hardware</h2>
        <div className="flex gap-4">
          <input 
            type="text" 
            placeholder="Search specs, models..." 
            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none w-64"
          />
          <button className="bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-2 rounded-lg transition-colors">
            Filter
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gadgets.map((g) => (
            <div key={g.id} className="bg-slate-800/80 border border-slate-700/80 rounded-xl overflow-hidden hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all hover:-translate-y-1">
              <div className="h-48 bg-slate-700/50 flex items-center justify-center border-b border-slate-700">
                <span className="text-5xl opacity-40">💻</span>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-blue-400 text-sm font-semibold">{g.manufacturer}</p>
                    <h3 className="text-xl font-bold">{g.modelName}</h3>
                  </div>
                  <span className="text-lg font-bold text-green-400">${g.price}</span>
                </div>
                <p className="text-slate-400 text-sm mt-4 mb-6 leading-relaxed">
                  {g.techSpecs}
                </p>
                <div className="flex justify-between items-center">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${g.stockQty > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {g.stockQty > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                  <button 
                    disabled={g.stockQty === 0}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${g.stockQty > 0 ? 'bg-blue-600 hover:bg-blue-500' : 'bg-slate-700 text-slate-500 cursor-not-allowed'}`}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
