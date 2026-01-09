
import React, { useState, useCallback, useMemo } from 'react';
import { VocabularyTerm, ContextItem, MatchState } from '../types';
import { TERMS_DATA } from './WarmUpSection';

const CONTEXTS: ContextItem[] = [
  { 
    id: 'c1', 
    description: 'A relaxed networking BBQ on a condo rooftop overlooking the Caribbean.', 
    correctTermId: 't1',
    playaLocation: 'Zazil-Ha Rooftops'
  },
  { 
    id: 'c2', 
    description: 'A pre-wedding brunch for a colleague at a luxury Riviera Maya hotel.', 
    correctTermId: 't2',
    playaLocation: 'Mayakoba Resort'
  },
  { 
    id: 'c3', 
    description: 'Politely declining a coffee invitation on 5th Avenue because you already have plans.', 
    correctTermId: 't3',
    playaLocation: 'Quinta Avenida'
  },
  { 
    id: 'c4', 
    description: 'Moving a real estate site visit to next week due to a tropical storm.', 
    correctTermId: 't5',
    playaLocation: 'New Development Zone'
  },
  { 
    id: 'c5', 
    description: 'A quick, informal message to a coworker saying you cannot attend the sunset beach drinks.', 
    correctTermId: 't4',
    playaLocation: 'Mamitas Beach'
  },
  { 
    id: 'c6', 
    description: 'The most enthusiastic and professional way to accept an invite to a Luxury Yacht Gala.', 
    correctTermId: 't6',
    playaLocation: 'Puerto Aventuras Marina'
  }
];

const VocabularyChallenge: React.FC = () => {
  const [selectedTermId, setSelectedTermId] = useState<string | null>(null);
  const [matches, setMatches] = useState<MatchState>({});
  const [feedback, setFeedback] = useState<Record<string, 'correct' | 'incorrect' | null>>({});

  const challengeTerms = useMemo(() => {
    // Shuffled order to make them think more
    return [
      TERMS_DATA.find(t => t.id === 't6')!, // I'd be delighted!
      TERMS_DATA.find(t => t.id === 't3')!, // previous engagement
      TERMS_DATA.find(t => t.id === 't1')!, // cookout
      TERMS_DATA.find(t => t.id === 't5')!, // postpone
      TERMS_DATA.find(t => t.id === 't2')!, // bridal shower
      TERMS_DATA.find(t => t.id === 't4')!, // can't make it
    ];
  }, []);

  const handleTermClick = (termId: string) => {
    const isMatched = Object.values(matches).includes(termId);
    if (isMatched) return;
    setSelectedTermId(prev => prev === termId ? null : termId);
  };

  const handleContextClick = useCallback((contextId: string) => {
    if (!selectedTermId) return;

    const context = CONTEXTS.find(c => c.id === contextId);
    if (!context) return;

    const isCorrect = context.correctTermId === selectedTermId;

    setMatches(prev => ({ ...prev, [contextId]: selectedTermId }));
    setFeedback(prev => ({ ...prev, [contextId]: isCorrect ? 'correct' : 'incorrect' }));
    setSelectedTermId(null);
  }, [selectedTermId]);

  const handleReset = () => {
    setMatches({});
    setFeedback({});
    setSelectedTermId(null);
  };

  const correctCount = Object.values(feedback).filter(v => v === 'correct').length;
  const progress = (correctCount / CONTEXTS.length) * 100;

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden animate-in zoom-in duration-500 shadow-2xl">
      <div className="p-8 border-b border-white/5 bg-gradient-to-r from-cyan-500/10 to-transparent">
        <h3 className="text-2xl font-black text-white tracking-tight">Networking Vocabulary Challenge</h3>
        <p className="text-sm text-slate-400 mt-2">Strategically match the high-stakes phrases to their professional context.</p>
        
        <div className="mt-8">
          <div className="flex justify-between text-[10px] font-black text-cyan-400 mb-2 uppercase tracking-[0.2em]">
            <span>Social Mastery</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden shadow-inner border border-white/5">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(6,182,212,0.6)]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="mb-12">
          <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6">Select Active Term</h4>
          <div className="flex flex-wrap gap-4">
            {challengeTerms.map(term => {
              const isMatched = Object.values(matches).includes(term.id);
              const isSelected = selectedTermId === term.id;
              
              return (
                <button
                  key={term.id}
                  onClick={() => handleTermClick(term.id)}
                  disabled={isMatched}
                  className={`
                    px-6 py-3 rounded-2xl text-sm font-black transition-all duration-300 transform
                    ${isMatched 
                      ? 'bg-white/5 text-white/10 cursor-not-allowed border border-transparent' 
                      : isSelected
                        ? 'bg-white text-slate-900 shadow-2xl scale-110 ring-4 ring-cyan-500/20'
                        : 'bg-white/10 text-slate-200 border border-white/10 hover:border-cyan-500 hover:bg-white/20 hover:-translate-y-1'
                    }
                  `}
                >
                  {term.text}
                </button>
              );
            })}
          </div>
        </div>

        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6">Business Scenarios</h4>
        <div className="space-y-4">
          {CONTEXTS.map(context => {
            const matchedTermId = matches[context.id];
            const matchedTerm = challengeTerms.find(t => t.id === matchedTermId);
            const status = feedback[context.id];

            return (
              <div 
                key={context.id}
                onClick={() => handleContextClick(context.id)}
                className={`
                  p-6 rounded-3xl border-2 transition-all duration-300 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6 relative group
                  hover:scale-[1.01] hover:shadow-2xl hover:bg-white/5
                  ${status === 'correct' 
                    ? 'border-emerald-500/30 bg-emerald-500/5' 
                    : status === 'incorrect'
                      ? 'border-rose-500/30 bg-rose-500/5'
                      : 'border-white/5 bg-transparent'
                  }
                `}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-black text-cyan-400 uppercase bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full tracking-wider">
                      📍 {context.playaLocation}
                    </span>
                  </div>
                  <span className="text-white text-lg font-bold leading-tight group-hover:text-cyan-400 transition-colors">
                    {context.description}
                  </span>
                </div>

                <div className="flex items-center gap-6 shrink-0">
                  {matchedTerm ? (
                    <div className={`
                      px-5 py-2.5 rounded-2xl text-sm font-black shadow-xl animate-in zoom-in-50
                      ${status === 'correct' 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-rose-500 text-white'
                      }
                    `}>
                      {matchedTerm.text}
                    </div>
                  ) : (
                    <div className={`
                      px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 border-dashed
                      ${selectedTermId ? 'border-cyan-500 text-cyan-400 animate-pulse bg-cyan-500/10' : 'border-white/10 text-slate-600'}
                    `}>
                      Assign Response
                    </div>
                  )}
                  
                  {status === 'correct' && (
                    <div className="bg-emerald-500/20 p-2 rounded-full shadow-inner">
                      <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                  {status === 'incorrect' && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setMatches(prev => {
                          const next = { ...prev };
                          delete next[context.id];
                          return next;
                        });
                        setFeedback(prev => {
                          const next = { ...prev };
                          delete next[context.id];
                          return next;
                        });
                      }}
                      className="bg-rose-500/20 p-2 rounded-full text-rose-400 hover:bg-rose-500/40 transition-all shadow-lg"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6 bg-white/5 p-6 rounded-[2.5rem] border border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm text-slate-400 leading-snug">
              <span className="font-black text-white block mb-0.5">Coach's Professional Strategy:</span> 
              Always prioritize enthusiasm with <strong>"I'd be delighted!"</strong> when interacting with C-suite executives.
            </p>
          </div>
          <button 
            onClick={handleReset}
            className="text-[10px] font-black text-slate-500 hover:text-white transition-all bg-white/5 px-6 py-3 rounded-xl border border-white/10 hover:border-white/20 uppercase tracking-[0.2em]"
          >
            Reset Simulation
          </button>
        </div>
      </div>
    </div>
  );
};

export default VocabularyChallenge;
