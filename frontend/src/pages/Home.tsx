import { HeroSection } from '../components/features/Hero/HeroSection';
import { PageTransition } from '../contexts/PageTransition';

export default function Home() {
  return (
    <PageTransition>
      <div className="bg-transparent">
        <HeroSection />
        
        {/* Features Section */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-8 py-20 md:grid-cols-3 md:gap-8">
            {[
              { title: 'Validated inventory', desc: 'Every listing is shaped for real purchase decisions, not filler content.' },
              { title: 'Operational clarity', desc: 'Catalog, checkout, and history views are structured to stay readable at a glance.' },
              { title: 'Reliable flows', desc: 'Orders, reviews, and analytics are wired into the backend API and Prisma data layer.' }
            ].map((feature, i) => (
              <div key={i} className="card rounded-[28px] p-8 transition-transform duration-300 hover:-translate-y-1">
                <div className="mb-5 h-1.5 w-14 rounded-full bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400" />
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gray-500">0{i + 1}</p>
                <h3 className="mt-3 text-2xl font-bold text-white">{feature.title}</h3>
                <p className="mt-4 leading-7 text-gray-400">{feature.desc}</p>
              </div>
            ))}
        </div>
      </div>
    </PageTransition>
  );
}
