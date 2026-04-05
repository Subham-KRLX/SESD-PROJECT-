import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col pt-20 pb-12 px-6 lg:px-24">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-8 animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">
          Unleash Ultimate Performance
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
          The premium marketplace for verified tech enthusiats and vendors. Discover, compare, and acquire top-tier professional computing hardware.
        </p>
        
        <div className="flex gap-4 pt-6">
          <Link to="/browse" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            Explore Hardware
          </Link>
          <Link to="/login" className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-slate-500 px-8 py-3 rounded-full font-semibold transition-all">
            Vendor Portal
          </Link>
        </div>
      </div>
      
      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 backdrop-blur-sm hover:border-blue-500/50 transition-colors group">
          <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            ⚡
          </div>
          <h3 className="text-xl font-bold mb-3">Atomic Specs</h3>
          <p className="text-slate-400">Deep technical filtering for exactly what you need. From CPU sockets to granular TDP limits.</p>
        </div>
        <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 backdrop-blur-sm hover:border-indigo-500/50 transition-colors group">
          <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            🛡️
          </div>
          <h3 className="text-xl font-bold mb-3">Verified Vendors</h3>
          <p className="text-slate-400">Every brand and seller is manually vetted by our Admin team to ensure authenticity.</p>
        </div>
        <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 backdrop-blur-sm hover:border-purple-500/50 transition-colors group">
          <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            🚀
          </div>
          <h3 className="text-xl font-bold mb-3">Instant Checkout</h3>
          <p className="text-slate-400">Atomic transactions ensure high-demand hardware drops are processed without overselling.</p>
        </div>
      </div>
    </div>
  );
}
