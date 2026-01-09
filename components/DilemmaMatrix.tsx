
import React, { useState, useEffect, useRef } from 'react';

const TOPICS = [
  { label: 'Gym & Padel', icon: '🎾' },
  { label: 'Hobbies & Yachting', icon: '⛵' },
  { label: 'Music & Beach Clubs', icon: '🎷' },
  { label: 'Movies & Screenings', icon: '🎬' },
  { label: 'Travel & Retreats', icon: '✈️' },
  { label: 'Fine Dining', icon: '🍷' },
  { label: 'Luxury Real Estate', icon: '🏡' },
  { label: 'Golf & Networking', icon: '⛳' }
];

const DilemmaMatrix: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<typeof TOPICS[0] | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [rotation, setRotation] = useState(0);
  
  // Use ReturnType<typeof setInterval> instead of NodeJS.Timeout to be environment-agnostic in TypeScript
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    setIsActive(true);
    setTimeLeft(60);
  };

  const stopTimer = () => {
    setIsActive(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft]);

  const spinRoulette = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setIsActive(false);
    setSelectedTopic(null);
    
    const extraSpins = 5 + Math.random() * 5;
    const newRotation = rotation + (360 * extraSpins);
    setRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const normalizedRotation = newRotation % 360;
      const index = Math.floor(((360 - (normalizedRotation % 360)) / 360) * TOPICS.length) % TOPICS.length;
      setSelectedTopic(TOPICS[index]);
    }, 3000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-12">
      {/* Header Info */}
      <div className="relative group overflow-hidden bg-gradient-to-br from-indigo-600/20 to-indigo-900/10 border border-indigo-500/30 rounded-[3.5rem] p-12 backdrop-blur-2xl shadow-2xl text-center">
        <h3 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">THE CHAIN GAME</h3>
        <p className="text-indigo-100/70 text-xl md:text-2xl leading-relaxed font-semibold max-w-3xl mx-auto">
          Test your professional stamina. Build a sentence chain based on the topic. <br />
          <span className="text-white">Don't hesitate. Don't repeat. Don't run out of time.</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Roulette Section */}
        <div className="lg:col-span-7 flex flex-col items-center gap-12">
          <div className="relative w-80 h-80 md:w-[450px] md:h-[450px]">
            {/* Roulette Outer Ring */}
            <div 
              className="absolute inset-0 rounded-full border-8 border-white/10 shadow-[0_0_80px_rgba(99,102,241,0.2)] bg-slate-900/50 backdrop-blur-xl flex items-center justify-center transition-transform duration-[3000ms] ease-out"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              {TOPICS.map((topic, i) => (
                <div 
                  key={i} 
                  className="absolute h-full flex flex-col items-center pt-8 md:pt-12"
                  style={{ transform: `rotate(${(360 / TOPICS.length) * i}deg)`, width: '40px' }}
                >
                  <span className="text-3xl md:text-4xl drop-shadow-xl">{topic.icon}</span>
                </div>
              ))}
              {/* Divider lines */}
              {TOPICS.map((_, i) => (
                <div 
                  key={`line-${i}`} 
                  className="absolute w-px h-full bg-white/10"
                  style={{ transform: `rotate(${(360 / TOPICS.length) * i + (360 / (TOPICS.length * 2))}deg)` }}
                ></div>
              ))}
            </div>
            
            {/* Pointer */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-10 h-10 bg-indigo-500 rounded-b-full shadow-2xl z-20 flex items-center justify-center border-x-4 border-b-4 border-white/20">
              <div className="w-2 h-4 bg-white rounded-full animate-pulse"></div>
            </div>

            {/* Center Button */}
            <button 
              onClick={spinRoulette}
              disabled={isSpinning}
              className={`absolute inset-[30%] rounded-full z-30 flex flex-col items-center justify-center gap-2 transition-all duration-300 border-4 border-white/10 shadow-inner group
                ${isSpinning ? 'bg-indigo-900/50 cursor-not-allowed' : 'bg-gradient-to-br from-indigo-500 to-indigo-700 hover:scale-110 active:scale-95 hover:shadow-[0_0_50px_rgba(99,102,241,0.6)]'}
              `}
            >
              <span className="text-white font-black text-xl uppercase tracking-tighter group-hover:tracking-widest transition-all">
                {isSpinning ? 'Spinning...' : 'Spin'}
              </span>
              {!isSpinning && <span className="text-[10px] text-indigo-200 font-bold uppercase tracking-widest">Topic Wheel</span>}
            </button>
          </div>

          {selectedTopic && !isSpinning && (
            <div className="animate-in zoom-in duration-500 text-center space-y-4">
              <h4 className="text-[12px] font-black text-indigo-400 uppercase tracking-[0.5em]">Current Topic</h4>
              <div className="flex items-center justify-center gap-6 px-12 py-6 rounded-[2.5rem] bg-white/5 border border-indigo-500/30 shadow-2xl backdrop-blur-xl ring-1 ring-white/10">
                <span className="text-6xl">{selectedTopic.icon}</span>
                <span className="text-4xl md:text-5xl font-black text-white tracking-tighter">{selectedTopic.label}</span>
              </div>
            </div>
          )}
        </div>

        {/* Timer & Controls Section */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-slate-900/40 border border-white/10 rounded-[3rem] p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[50px] transition-all duration-1000 ${isActive ? 'opacity-100 scale-150' : 'opacity-0'}`}></div>
            
            <header className="mb-10 text-center">
              <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.4em] mb-4 block">Session Clock</span>
              <div className={`text-8xl md:text-9xl font-black tracking-tighter tabular-nums transition-colors duration-500 ${timeLeft < 10 ? 'text-rose-500 animate-pulse' : 'text-white'}`}>
                {formatTime(timeLeft)}
              </div>
            </header>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={startTimer}
                disabled={isActive || !selectedTopic || isSpinning}
                className={`py-6 rounded-3xl font-black uppercase tracking-widest text-sm transition-all shadow-xl
                  ${isActive || !selectedTopic || isSpinning 
                    ? 'bg-white/5 text-slate-600 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white hover:-translate-y-1 active:translate-y-0'}
                `}
              >
                Start Clock
              </button>
              <button 
                onClick={stopTimer}
                className="py-6 rounded-3xl font-black uppercase tracking-widest text-sm bg-white/5 text-white/40 hover:text-rose-400 hover:bg-rose-500/10 transition-all border border-white/5"
              >
                Pause
              </button>
            </div>

            {timeLeft === 0 && (
              <div className="mt-8 p-6 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-center animate-in slide-in-from-top-4">
                <p className="text-rose-200 font-black uppercase tracking-widest text-xs">⏰ Time's Up! The chain breaks.</p>
              </div>
            )}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 space-y-6">
            <h5 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em]">Elimination Rules</h5>
            <ul className="space-y-4">
              {[
                { rule: "Speed", desc: "You have 5 seconds to add to the chain on your turn." },
                { rule: "Precision", desc: "Use phrases like 'I'd be delighted' or 'As they said' naturally." },
                { rule: "Loss", desc: "Hesitation, repetition, or silence results in elimination." }
              ].map((item, i) => (
                <li key={i} className="flex gap-4 group">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0 group-hover:scale-150 transition-transform"></div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    <span className="text-white font-bold">{item.rule}:</span> {item.desc}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Action Guide */}
      <div className="bg-gradient-to-br from-indigo-500/10 to-transparent border border-white/10 rounded-[3.5rem] p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.5)]"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h5 className="text-3xl font-black text-white mb-6 tracking-tight">How to play the Chain</h5>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              The first person starts a professional story. Every following player must add a detail that <span className="text-white italic">logically connects</span> to the previous statement.
            </p>
            <div className="flex gap-4 p-6 rounded-3xl bg-black/40 border border-white/5">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block mb-1">Coach Tip</span>
                <p className="text-sm text-slate-300 italic">"Use connectors like 'Furthermore', 'Following that', or 'In addition to what he mentioned' to bridge sentences."</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-8 rounded-[2rem] bg-indigo-500/5 border border-indigo-500/20 group hover:bg-indigo-500/10 transition-all">
              <span className="text-[11px] font-black text-white uppercase tracking-widest mb-4 block opacity-50">Example Chain</span>
              <p className="text-slate-300 text-xl font-medium leading-relaxed italic">
                Player 1: "I'd be delighted to discuss the private gym membership." <br />
                <span className="text-indigo-400 not-italic block mt-4 group-hover:translate-x-2 transition-transform">
                  Player 2: "He mentioned the gym, but he also said we should invite the CEO."
                </span>
              </p>
            </div>
            <button 
              onClick={() => {
                spinRoulette();
                setTimeout(startTimer, 3500);
              }}
              className="w-full py-6 rounded-3xl bg-white text-black font-black uppercase tracking-[0.2em] text-sm hover:bg-indigo-400 transition-all shadow-2xl flex items-center justify-center gap-4 group"
            >
              Quick Start Pro Challenge
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-2 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.3 1.047a1 1 0 01.897.45l6.413 11.223A1 1 0 0117.737 14.5H12v5a1 1 0 11-2 0v-5H4.263a1 1 0 01-.873-1.48L9.803 1.497a1 1 0 011.497-.45z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DilemmaMatrix;
