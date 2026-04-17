import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import TechCanvas from '../components/TechCanvas.js';
export default function Home() {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const cardsRef = useRef(null);
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero Title Animation
            gsap.from(titleRef.current, {
                y: 100,
                opacity: 0,
                duration: 1.2,
                ease: 'power4.out',
                delay: 0.2
            });
            // Cards stagger animation
            if (cardsRef.current) {
                gsap.from(cardsRef.current.children, {
                    y: 60,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power3.out',
                    delay: 0.6
                });
            }
        }, heroRef);
        return () => ctx.revert();
    }, []);
    return (_jsxs("div", { ref: heroRef, className: "relative min-h-screen bg-black text-slate-100 flex flex-col pt-32 pb-12 px-6 lg:px-24 overflow-hidden", children: [_jsx(TechCanvas, {}), _jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-blue-900/10 via-black to-black pointer-events-none" }), _jsxs("div", { className: "relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center space-y-10", children: [_jsx(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.5 }, className: "px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium tracking-wide uppercase", children: "Project Genesis v2.0" }), _jsxs("h1", { ref: titleRef, className: "text-6xl md:text-8xl font-black tracking-tight leading-[1.1]", children: ["REDEFINING ", _jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 animate-gradient-x", children: "HARDWARE" })] }), _jsx("p", { className: "text-xl text-slate-400 max-w-2xl leading-relaxed font-light", children: "The premium marketplace for verified tech enthusiasts and vendors. Discover, compare, and acquire top-tier professional computing hardware through clean architecture." }), _jsxs("div", { className: "flex flex-wrap justify-center gap-6 pt-6", children: [_jsxs(Link, { to: "/browse", className: "group relative bg-white text-black px-10 py-4 rounded-full font-bold transition-all hover:bg-blue-500 hover:text-white", children: ["Explore Hardware", _jsx("span", { className: "absolute -inset-0.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-30 blur-lg transition-opacity" })] }), _jsx(Link, { to: "/login", className: "bg-transparent hover:bg-slate-900 text-white border border-slate-700/50 px-10 py-4 rounded-full font-bold transition-all backdrop-blur-md", children: "Vendor Portal" })] })] }), _jsx("div", { ref: cardsRef, className: "relative z-10 mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto", children: [
                    { icon: '⚡', title: 'Atomic Specs', desc: 'Deep technical filtering for exactly what you need. From CPU sockets to TDP limits.', color: 'blue' },
                    { icon: '🛡️', title: 'Verified Vendors', desc: 'Every brand and seller is manually vetted by our Admin team to ensure authenticity.', color: 'indigo' },
                    { icon: '🚀', title: 'Instant Checkout', desc: 'Atomic transactions ensure hardware drops are processed without overselling.', color: 'purple' }
                ].map((item, i) => (_jsxs("div", { className: "group bg-slate-900/40 p-10 rounded-3xl border border-slate-800/50 backdrop-blur-xl hover:border-blue-500/50 transition-all hover:-translate-y-2", children: [_jsx("div", { className: `w-14 h-14 bg-${item.color}-500/20 rounded-2xl flex items-center justify-center mb-8 border border-${item.color}-500/20 group-hover:scale-110 transition-transform text-2xl`, children: item.icon }), _jsx("h3", { className: "text-2xl font-bold mb-4 tracking-tight", children: item.title }), _jsx("p", { className: "text-slate-500 leading-relaxed font-medium", children: item.desc })] }, i))) })] }));
}
//# sourceMappingURL=Home.js.map