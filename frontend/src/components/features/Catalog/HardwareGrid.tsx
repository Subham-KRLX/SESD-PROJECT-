import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { useCartStore } from '../../../store/cartStore';

interface GadgetCardModel {
  id: string;
  name?: string;
  modelName?: string;
  stockQty?: number;
  stockCount?: number;
  price?: number;
  category?: string;
  techSpecs?: string;
  description?: string;
  image?: string;
}

export function HardwareGrid({ gadgets }: { gadgets: GadgetCardModel[] }) {
  const addItem = useCartStore((state) => state.addItem);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4 md:px-8 py-12"
    >
      {gadgets.map((gadget) => {
        const name = gadget.name || gadget.modelName || 'Unknown Hardware';
        const stockQty = gadget.stockQty ?? gadget.stockCount ?? 0;
        const price = Number(gadget.price ?? 0);
        const category = gadget.category || gadget.techSpecs || 'Tech Component';
        const image = gadget.image || `https://source.unsplash.com/featured/800x600?hardware,computer&sig=${gadget.id}`;

        return (
          <motion.div
            key={gadget.id}
            variants={itemVariants}
            whileHover={{ y: -8, transition: { duration: 0.25 } }}
            className="group relative overflow-hidden rounded-[28px] border border-white/8 bg-gradient-to-b from-[#171d2a] to-[#0f1419] shadow-[0_18px_50px_rgba(0,0,0,0.28)] transition-all duration-300 hover:border-white/12"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 opacity-80" />

            <div className="relative h-56 overflow-hidden border-b border-white/8 bg-[#0c1118]">
              <img
                src={image}
                alt={name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
              />

              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/8 bg-[#0f1419]/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-200 backdrop-blur-sm">
                {category}
              </div>

              <div className={`absolute right-4 top-4 flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] backdrop-blur-sm ${
                stockQty > 0
                  ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300'
                  : 'border-amber-500/20 bg-amber-500/10 text-amber-300'
              }`}>
                <span className={`h-2 w-2 rounded-full ${stockQty > 0 ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                {stockQty > 0 ? `${stockQty} available` : 'Out of stock'}
              </div>

              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0f1419] to-transparent" />
            </div>

            <div className="relative z-10 flex h-full flex-col p-5">
              <div className="mb-5 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold leading-tight text-white transition-colors group-hover:text-blue-300">
                    {name}
                  </h3>
                  <button className="rounded-lg border border-white/8 bg-white/5 p-2 text-gray-400 transition-colors hover:border-white/12 hover:text-white">
                    <Eye size={17} />
                  </button>
                </div>

                <p className="min-h-12 text-sm leading-6 text-gray-400">
                  {gadget.techSpecs || gadget.description || 'Selected for performance, reliability, and clean integration.'}
                </p>
              </div>

              <div className="mt-auto space-y-5">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.28em] text-gray-500">Price</p>
                    <p className="mt-1 text-3xl font-bold text-white">${price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-white/8 bg-white/5 px-3 py-1.5 text-xs text-gray-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                    Trusted listing
                  </div>
                </div>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      addItem({
                        id: gadget.id,
                        name,
                        price,
                        quantity: 1,
                        image,
                      });
                    }}
                    className="flex-1 rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
                  >
                    <span className="inline-flex items-center justify-center gap-2">
                      <ShoppingCart size={17} />
                      Add to cart
                    </span>
                  </motion.button>

                  <button className="rounded-xl border border-white/8 bg-white/5 px-4 py-3.5 text-gray-300 transition-colors hover:border-white/12 hover:bg-white/[0.08] hover:text-white">
                    <Heart size={17} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
