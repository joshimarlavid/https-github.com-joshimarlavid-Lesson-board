
import React, { useRef } from 'react';
import NetworkingCoach from './components/NetworkingCoach';
import VocabularyChallenge from './components/VocabularyChallenge';
import WarmUpSection from './components/WarmUpSection';
import TelephoneGame from './components/TelephoneGame';
import DilemmaMatrix from './components/DilemmaMatrix';

const App: React.FC = () => {
  const warmupRef = useRef<HTMLDivElement>(null);
  const challengeRef = useRef<HTMLDivElement>(null);
  const coachRef = useRef<HTMLDivElement>(null);
  const reportedRef = useRef<HTMLDivElement>(null);
  const dilemmaRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const navItems = [
    { id: 'warmup', label: '1. Discovery', icon: '🔍', ref: warmupRef },
    { id: 'challenge', label: '2. Match', icon: '🧩', ref: challengeRef },
    { id: 'coach', label: '3. Coach Julian', icon: '👔', ref: coachRef },
    { id: 'reported', label: '4. What Did They Say?', icon: '🗣️', ref: reportedRef },
    { id: 'dilemma', label: '5. The Chain Game', icon: '⛓️', ref: dilemmaRef },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-slate-200 flex flex-col font-sans selection:bg-cyan-500/30">
      {/* Header */}
      <header className="bg-black/60 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-700 rounded-2xl flex items-center justify-center text-white shadow-[0_0_25px_rgba(6,182,212,0.4)] ring-1 ring-white/10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tighter leading-none">PLAYA CONNECT</h1>
              <p className="text-[10px] text-cyan-400 font-bold tracking-[0.4em] uppercase mt-1">Networking Excellence</p>
            </div>
          </div>
          
          <nav className="hidden md:flex gap-2">
            {navItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => scrollTo(item.ref)}
                className="px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 text-slate-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 uppercase tracking-widest"
              >
                <span>{item.icon}</span>
                {item.label.split('. ')[1]}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero Header Section */}
      <div className="max-w-5xl mx-auto w-full px-6 pt-20 pb-12 text-center">
        <div className="animate-in fade-in slide-in-from-top-6 duration-1000">
          <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
            Welcome back, everyone!
          </div>
          <h2 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
            Social <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600">Networking</span> Expert
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-xl leading-relaxed font-medium">
            Elevate your professional communication. Learn to navigate the social circles of Playa del Carmen with elegance and strategic precision.
          </p>
        </div>
      </div>

      {/* Main Content Layout - Single Column Flow */}
      <main className="max-w-4xl mx-auto w-full px-6 pb-32 space-y-32">
        
        {/* Section 1: Discovery */}
        <section ref={warmupRef} className="scroll-mt-32">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl shadow-2xl">🔍</div>
            <h3 className="text-3xl font-black text-white uppercase tracking-wider">1. The Discovery</h3>
          </div>
          <WarmUpSection onContinue={() => scrollTo(challengeRef)} />
        </section>

        {/* Section 2: Match Challenge */}
        <section ref={challengeRef} className="scroll-mt-32">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl shadow-2xl">🧩</div>
            <h3 className="text-3xl font-black text-white uppercase tracking-wider">2. The Match Activity</h3>
          </div>
          <VocabularyChallenge />
          <div className="mt-12 flex justify-center">
            <button 
                onClick={() => scrollTo(coachRef)}
                className="group bg-white/5 hover:bg-white/10 border border-white/10 px-10 py-5 rounded-3xl flex items-center gap-3 transition-all"
            >
              <span className="text-base font-black text-white uppercase tracking-widest">Connect with Coach Julian</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </section>

        {/* Section 3: Coach Julian */}
        <section ref={coachRef} className="scroll-mt-32">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl shadow-2xl">👔</div>
            <h3 className="text-3xl font-black text-white uppercase tracking-wider">3. Expert Guidance</h3>
          </div>
          <NetworkingCoach />
          <div className="mt-12 flex justify-center">
            <button 
                onClick={() => scrollTo(reportedRef)}
                className="group bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 px-10 py-5 rounded-3xl flex items-center gap-3 transition-all shadow-xl shadow-cyan-900/20"
            >
              <span className="text-base font-black text-white uppercase tracking-widest">Start: What Did They Say?</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </section>

        {/* Section 4: What Did They Say? */}
        <section ref={reportedRef} className="scroll-mt-32">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl shadow-2xl">🗣️</div>
            <h3 className="text-3xl font-black text-white uppercase tracking-wider">4. What Did They Say?</h3>
          </div>
          <TelephoneGame onContinue={() => scrollTo(dilemmaRef)} />
        </section>

        {/* Section 5: The Chain Game */}
        <section ref={dilemmaRef} className="scroll-mt-32">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl shadow-2xl">⛓️</div>
            <h3 className="text-3xl font-black text-white uppercase tracking-wider">5. The Sentence Chain</h3>
          </div>
          <DilemmaMatrix />
        </section>

      </main>

      <footer className="py-20 border-t border-white/5 text-center bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center gap-6">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11l7-7 7 7M5 19l7-7 7 7" />
              </svg>
            </div>
            <p className="text-slate-500 text-sm font-bold tracking-[0.2em] uppercase">
              Playa del Carmen Business English Hub • Premium Series
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
