
import React from 'react';
import { VocabularyTerm } from '../types';

export const TERMS_DATA: VocabularyTerm[] = [
  { 
    id: 't1', 
    text: 'cookout', 
    imageUrl: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=600&q=80',
    example: "We're hosting a rooftop cookout for the new project launch."
  },
  { 
    id: 't2', 
    text: 'bridal shower', 
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
    example: "The marketing team is organizing a bridal shower for Elena at the Fairmont."
  },
  { 
    id: 't3', 
    text: 'previous engagement', 
    imageUrl: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=600&q=80',
    example: "I'd love to join you for coffee on 5th Ave, but I have a previous engagement."
  },
  { 
    id: 't4', 
    text: "can't make it", 
    imageUrl: 'https://images.unsplash.com/photo-1551290464-670908869c9b?auto=format&fit=crop&w=600&q=80',
    example: "Sorry, I can't make it to the sunset mixer today. Catch you next time!"
  },
  { 
    id: 't5', 
    text: 'postpone', 
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
    example: "Should we postpone the construction site visit until the 'Norte' passes?"
  },
  { 
    id: 't6', 
    text: "I'd be delighted!", 
    imageUrl: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=600&q=80',
    example: "Invite to the Yacht Gala? I'd be delighted to attend!"
  }
];

const WarmUpSection: React.FC<{ onContinue: () => void }> = ({ onContinue }) => {
  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {TERMS_DATA.map((term) => (
          <div key={term.id} className="group bg-white/5 rounded-[2.5rem] border border-white/10 overflow-hidden hover:border-cyan-500/50 transition-all duration-500 hover:shadow-[0_0_50px_rgba(6,182,212,0.15)] relative">
            <div className="h-56 overflow-hidden relative">
              <img 
                src={term.imageUrl} 
                alt={term.text} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60 group-hover:opacity-100 grayscale-[40%] group-hover:grayscale-0" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-xl px-5 py-2 rounded-2xl text-white font-black text-sm uppercase tracking-[0.2em] border border-white/20 shadow-2xl">
                {term.text}
              </div>
            </div>
            <div className="p-8">
              <p className="text-slate-300 text-lg leading-relaxed font-medium italic group-hover:text-white transition-colors">
                "{term.example}"
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center pt-8">
        <button 
          onClick={onContinue}
          className="bg-white text-slate-950 font-black px-14 py-6 rounded-3xl shadow-[0_25px_60px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95 transition-all flex items-center gap-4 group hover:bg-cyan-400"
        >
          <span className="text-lg">Initiate Match Module</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:translate-x-2 transition-transform" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default WarmUpSection;
