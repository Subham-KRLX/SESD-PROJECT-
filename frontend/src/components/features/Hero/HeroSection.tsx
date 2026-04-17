import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Boxes, ShieldCheck, Sparkles } from 'lucide-react';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const ctatRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation - scale + fade in
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 42, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' }
      );

      // Subtitle stagger
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' }
      );

      // CTA button bounce
      gsap.fromTo(
        ctatRef.current,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.6, delay: 0.4, ease: 'elastic.out(1, 0.5)' }
      );

      // Floating animation on scroll
      gsap.to(titleRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 0.5,
        },
        y: -100,
        opacity: 0.5,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#0F1419] via-[#111725] to-[#0A0D12]"
    >
      <div className="absolute inset-0 opacity-[0.05]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.65) 1px, transparent 1px)',
            backgroundSize: '42px 42px'
          }}
        />
      </div>

      <motion.div
        aria-hidden
        animate={{ x: [0, 24, 0], y: [0, -16, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-10 top-16 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, -20, 0], y: [0, 18, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-10 left-6 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"
      />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 rounded-full border border-white/8 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-gray-400"
          >
            <Sparkles size={14} className="text-blue-400" />
            Curated hardware marketplace
          </motion.div>

          <div className="max-w-3xl">
            <h1
              ref={titleRef}
              className="display-font text-5xl font-extrabold leading-[0.95] text-white sm:text-6xl lg:text-7xl"
            >
              Premium hardware
              <span className="block bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                for serious builds.
              </span>
            </h1>
            <p
              ref={subtitleRef}
              className="mt-6 max-w-2xl text-lg leading-8 text-gray-400 sm:text-xl"
            >
              TechSpark curates validated processors, graphics cards, peripherals, and storage for teams and enthusiasts who value reliability over noise.
            </p>
          </div>

          <div ref={ctatRef} className="flex flex-col gap-4 sm:flex-row">
            <Link
              to="/browse"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-blue-950/30 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-blue-500"
            >
              Browse catalog
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-7 py-3.5 font-semibold text-gray-200 transition-colors duration-300 hover:border-white/15 hover:bg-white/[0.08]"
            >
              View dashboard
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: 'Verified vendors', value: '18+', icon: ShieldCheck },
              { label: 'Catalog items', value: '240+', icon: Boxes },
              { label: 'Repeat buyers', value: '98%', icon: Sparkles },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="card rounded-2xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-blue-300">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                      <p className="text-xl font-semibold text-white">{stat.value}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-8 rounded-[2rem] bg-gradient-to-br from-blue-500/10 via-transparent to-violet-500/10 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-gradient-to-b from-[#171d2b] to-[#0e131b] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
            <div className="flex items-start justify-between gap-4 border-b border-white/8 pb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">Curated signal</p>
                <h2 className="mt-2 text-2xl font-bold text-white">Where the catalog feels alive</h2>
              </div>
              <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                Live inventory
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/8 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-gray-500">Top category</p>
                <p className="mt-3 text-lg font-semibold text-white">Graphics cards</p>
                <div className="mt-5 h-2 rounded-full bg-white/6">
                  <div className="h-2 w-[72%] rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
                </div>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-gray-500">Fulfilment</p>
                <p className="mt-3 text-lg font-semibold text-white">48 hour dispatch</p>
                <div className="mt-5 flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="text-sm text-gray-400">Consistent stock coverage</span>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-white/8 bg-[#0c1118] p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-gray-500">Featured workflow</p>
                  <p className="mt-2 text-base font-medium text-white">Browse, compare, and deploy hardware in one workflow.</p>
                </div>
                <div className="hidden items-center gap-2 rounded-full border border-white/8 bg-white/5 px-3 py-2 text-xs font-semibold text-gray-300 sm:flex">
                  <span className="h-2 w-2 rounded-full bg-blue-400" />
                  Active session
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
