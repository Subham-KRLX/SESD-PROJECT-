import { useState } from 'react';
import { Plus, Package, Edit2, Share2, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiClient } from '../../../utils/apiClient';

export function InventoryManager() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [items, setItems] = useState([
    { id: '1', name: 'RTX 5090 Prototype', price: 2499, stock: 5, category: 'GPU' },
    { id: '2', name: 'Ryzen 9 9950X', price: 699, stock: 15, category: 'CPU' },
  ]);

  const [form, setForm] = useState({
    modelName: '',
    manufacturer: '',
    price: '',
    stockQty: '',
    techSpecs: '',
    type: 'GPU' as 'CPU' | 'GPU' | 'IoT'
  });

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resp = await apiClient.fetch('/api/gadgets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          stockQty: Number(form.stockQty),
          vendorId: 'demo-vendor-id' // Placeholder for authenticated vendor session
        })
      });
      if (resp.ok) {
        const newItem = await resp.json();
        setItems([...items, { 
            id: newItem.id, 
            name: newItem.modelName, 
            price: newItem.price, 
            stock: newItem.stockQty, 
            category: newItem.type 
        }]);
        setShowAddModal(false);
        setForm({ modelName: '', manufacturer: '', price: '', stockQty: '', techSpecs: '', type: 'GPU' });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-bold text-white">Inventory <span className="text-blue-400">Control</span></h2>
          <p className="text-gray-500 mt-2 text-sm">Manage your listed hardware, prices, and deployment signals.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 font-bold text-white shadow-lg shadow-blue-900/20 hover:bg-blue-500 transition-all"
        >
          <Plus size={18} />
          List New Item
        </button>
      </div>

      <div className="overflow-hidden rounded-[32px] border border-white/8 bg-[#121823] shadow-2xl">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5 bg-white/2">
              <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-gray-500">Hardware Asset</th>
              <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-gray-500">Unit Price</th>
              <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-gray-500">Reserve</th>
              <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-gray-500">Status</th>
              <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {items.map(item => (
              <tr key={item.id} className="group hover:bg-white/[0.02] transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                      <Package size={20} />
                    </div>
                    <div>
                      <div className="font-bold text-white">{item.name}</div>
                      <div className="text-[10px] uppercase font-bold text-gray-600 mt-0.5">{item.category} Module</div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 font-mono text-blue-200">${item.price}</td>
                <td className="px-8 py-6 text-gray-400">{item.stock} units</td>
                <td className="px-8 py-6">
                  <span className={`rounded-lg px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${
                    item.stock > 0 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {item.stock > 0 ? 'Optimal' : 'Depleted'}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="rounded-lg bg-white/5 p-2 text-gray-400 hover:text-white"><Edit2 size={16}/></button>
                    <button className="rounded-lg bg-white/5 p-2 text-gray-400 hover:text-white"><Share2 size={16}/></button>
                    <button className="rounded-lg bg-red-500/10 p-2 text-red-400 hover:bg-red-500/20"><Trash2 size={16}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Technical entry portal for new assets */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center bg-black/80 backdrop-blur-md p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="w-full max-w-2xl rounded-[32px] border border-white/10 bg-[#0F1419] p-8 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold">Hardware <span className="text-blue-400">Uplink</span></h3>
                <button onClick={() => setShowAddModal(false)} className="rounded-xl bg-white/5 p-2 hover:bg-white/10"><X size={20} /></button>
              </div>

              <form onSubmit={handleAdd} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Model Name</label>
                    <input required value={form.modelName} onChange={e => setForm({...form, modelName: e.target.value})} className="w-full rounded-2xl border border-white/8 bg-white/5 p-4 text-white focus:border-blue-500/30 focus:outline-none" placeholder="e.g. RTX 5090 Prototype" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Manufacturer</label>
                    <input required value={form.manufacturer} onChange={e => setForm({...form, manufacturer: e.target.value})} className="w-full rounded-2xl border border-white/8 bg-white/5 p-4 text-white focus:border-blue-500/30 focus:outline-none" placeholder="e.g. QuantumTech" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Price ($)</label>
                    <input required type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="w-full rounded-2xl border border-white/8 bg-white/5 p-4 text-white focus:border-blue-500/30 focus:outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Stock</label>
                    <input required type="number" value={form.stockQty} onChange={e => setForm({...form, stockQty: e.target.value})} className="w-full rounded-2xl border border-white/8 bg-white/5 p-4 text-white focus:border-blue-500/30 focus:outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Type</label>
                    <select value={form.type} onChange={e => setForm({...form, type: e.target.value as any})} className="w-full rounded-2xl border border-white/8 bg-[#0c1118] p-4 text-white focus:border-blue-500/30 focus:outline-none">
                      <option value="GPU">GPU Asset</option>
                      <option value="CPU">CPU Asset</option>
                      <option value="IoT">IoT Module</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Technical Specifications</label>
                  <textarea required value={form.techSpecs} onChange={e => setForm({...form, techSpecs: e.target.value})} className="w-full h-32 rounded-2xl border border-white/8 bg-white/5 p-4 text-white focus:border-blue-500/30 focus:outline-none resize-none" placeholder="Enter detailed specs (VRAM, TDP, Architecture...)" />
                </div>

                <button type="submit" className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 py-4 font-black uppercase tracking-widest text-white shadow-xl shadow-blue-900/40 hover:from-blue-500 hover:to-violet-500 transition-all">
                  Initialize Deployment
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const X = ({ size }: { size: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
