
import React, { useState } from 'react';

const QUOTES = [
  {
    id: 1,
    speaker: "Mr. Thompson (Real Estate Mogul)",
    quote: "Do you want to watch a movie tonight at my private screening?",
    location: "The Fives Downtown",
    hint: "He asked if I wanted to watch a movie..."
  },
  {
    id: 2,
    speaker: "Sarah (Project Manager)",
    quote: "Would you care to attend the banquet with us at the Rosewood?",
    location: "Mayakoba Luxury District",
    hint: "She asked if I would care to attend..."
  },
  {
    id: 3,
    speaker: "The CEO",
    quote: "I'm hosting a VIP dinner on 5th Avenue and I need your presence.",
    location: "Quinta Avenida VIP Lounge",
    hint: "He said that he was hosting a VIP dinner..."
  }
];

const TelephoneGame: React.FC<{ onContinue: () => void }> = ({ onContinue }) => {
  const [showHints, setShowHints] = useState<Record<number, boolean>>({});

  const toggleHint = (id: number) => {
    setShowHints(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 blur-[100px] -mr-40 -mt-40"></div>
        
        <div className="mb-10">
          <h3 className="text-4xl font-black text-white mb-4 tracking-tighter">WHAT DID THEY SAY?</h3>
          <p className="text-slate-400 text-xl leading-relaxed font-medium">
            Listen to the direct invitation. Now, turn to your colleague and tell them exactly what the boss or client said or asked.
          </p>
        </div>

        <div className="grid gap-8">
          {QUOTES.map((q) => (
            <div key={q.id} className="group bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-[2.5rem] p-8 hover:border-cyan-500/40 transition-all duration-500 hover:shadow-2xl relative">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em] block mb-3 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 w-fit">📍 {q.location}</span>
                  <h4 className="text-2xl font-black text-white tracking-tight">{q.speaker}</h4>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-cyan-400 group-hover:scale-110 transition-all shadow-inner">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
              </div>
              
              <div className="relative mb-8 p-6 bg-black/20 rounded-2xl border border-white/5">
                <blockquote className="text-2xl font-bold text-slate-100 italic leading-snug">
                  "{q.quote}"
                </blockquote>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-white/5">
                <p className="text-[11px] text-slate-500 font-black uppercase tracking-widest flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping"></span>
                  Challenge: Start with <span className="text-cyan-400">"He/She said that..."</span> or <span className="text-cyan-400">"They asked if..."</span>
                </p>
                <button 
                  onClick={() => toggleHint(q.id)}
                  className="px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all border border-white/10"
                >
                  {showHints[q.id] ? 'Hide Phrase Logic' : 'Show Phrase Logic'}
                </button>
              </div>

              {showHints[q.id] && (
                <div className="mt-6 p-8 bg-cyan-500/10 border border-cyan-500/20 rounded-3xl animate-in slide-in-from-top-4 duration-500">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Recommended Structure</span>
                  </div>
                  <p className="text-cyan-50 text-xl font-bold font-mono">
                    {q.hint}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <button 
            onClick={onContinue}
            className="bg-white text-black font-black px-14 py-6 rounded-[2rem] hover:bg-cyan-400 transition-all shadow-[0_30px_70px_rgba(0,0,0,0.6)] flex items-center gap-4 group hover:scale-105"
          >
            Go to: The Dilemma
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 group-hover:translate-x-2 transition-transform" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TelephoneGame;
