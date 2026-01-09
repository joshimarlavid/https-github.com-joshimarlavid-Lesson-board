
import React from 'react';

const NetworkingCoach: React.FC = () => {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-[3rem] border border-white/10 p-10 flex flex-col md:flex-row gap-10 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-500/10 blur-[60px] -ml-16 -mt-16"></div>
      
      <div className="flex flex-col items-center md:items-start gap-6 shrink-0">
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&h=300&q=80" 
            alt="Professional Coach" 
            className="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] object-cover ring-4 ring-cyan-500/20 shadow-2xl"
          />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 border-4 border-slate-950 rounded-full shadow-lg shadow-emerald-500/50"></div>
        </div>
        <div className="text-center md:text-left">
          <h3 className="font-black text-2xl text-white tracking-tight">Coach Julian</h3>
          <p className="text-xs text-cyan-400 font-black uppercase tracking-[0.3em] mt-1">Networking Expert</p>
        </div>
      </div>

      <div className="flex-1 space-y-8">
        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-3xl p-8 relative">
          <div className="absolute top-8 -left-2 w-4 h-4 bg-cyan-950 border-l border-t border-cyan-500/20 rotate-[135deg] hidden md:block"></div>
          <p className="text-xl text-cyan-50 leading-relaxed font-medium italic">
            "Playa is a unique mix of vacation vibes and high-stakes business. When you report back on networking events, accuracy and professional tone are your most valuable assets."
          </p>
        </div>

        <div className="space-y-6">
          <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] px-2">Key Social Strategies</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: "Precision", text: "When reporting a 'previous engagement', you demonstrate respect for existing commitments." },
              { title: "Tone Mastery", text: "In high-end circles, using 'I'd be delighted!' creates immediate professional rapport." }
            ].map((tip, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all group">
                <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 shrink-0 group-hover:scale-125 transition-transform"></div>
                <div>
                  <span className="font-bold block text-white text-sm mb-1 uppercase tracking-wider">{tip.title}</span>
                  <p className="text-sm text-slate-400 leading-relaxed">{tip.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkingCoach;
