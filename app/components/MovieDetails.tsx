'use client';
import { useState } from 'react';
import { useDownloads } from '../context';

export default function MovieDetails() {
  const [selectedQuality, setSelectedQuality] = useState<'480p' | '720p' | '1080p' | null>(null);
  const [selectedServer, setSelectedServer] = useState<string | null>(null);
  const { startNewDownload } = useDownloads();

  const handleDownloadClick = (type: 'normal' | '1dm') => {
    if (!selectedQuality || !selectedServer) return;
    
    // 💥 POPUNDER AD INTERCEPTOR
    if ((window as any).executePopunder) {
      (window as any).executePopunder(() => {
        startNewDownload("khalifa-2026", "KHALIFA - THE RULER", selectedQuality, selectedServer);
        alert(`⚡ Streamflix Engine: Task added successfully to Download Manager!`);
      });
    }
  };

  return (
    <div className="max-w-md mx-auto bg-zinc-950 text-zinc-100 rounded-3xl overflow-hidden shadow-2xl pb-24 border border-zinc-900 font-sans relative">
      
      {/* 1. Top Premium Background Movie Banner */}
      <div className="relative w-full aspect-[16/10] bg-zinc-900">
        <img 
          src="https://unsplash.com" 
          alt="Khalifa Banner" 
          className="w-full h-full object-cover opacity-80"
        />
        {/* Top Floating Cross/Close Button */}
        <button className="absolute top-4 right-4 bg-black/40 backdrop-blur-md p-1.5 rounded-full text-zinc-400 hover:text-white transition-colors text-xs font-bold">
          ✕
        </button>
        {/* Overlay Fade Gradient at Bottom of Banner */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
      </div>

      {/* 2. Center Aligned Movie Info Screen Meta */}
      <div className="text-center px-6 -mt-6 relative z-10 space-y-2">
        <h2 className="text-2xl font-black tracking-wide text-zinc-100 uppercase">KHALIFA - THE RULER</h2>
        <div className="text-xs font-bold text-zinc-400 space-y-1">
          <p>HD | 2026</p>
          <p className="text-zinc-500 font-medium">Hindi</p>
        </div>
      </div>

      {/* 3. Solid White Premium Watch Now Button */}
      <div className="px-5 mt-5">
        <button className="w-full bg-white hover:bg-zinc-200 text-zinc-950 font-black py-3 rounded-xl transition duration-200 flex items-center justify-center gap-2 text-sm shadow-lg tracking-wide">
          <span>▶</span> Watch Now
        </button>
      </div>

      {/* 4. Tiny Category Genres Bar */}
      <div className="text-center text-[11px] font-bold text-zinc-400 mt-4 tracking-wide font-sans">
        Action | Crime | Drama | Thriller
      </div>

      {/* 5. Custom Audio Track Information Grey Box */}
      <div className="px-5 mt-5">
        <div className="bg-zinc-900/60 border border-zinc-900 rounded-xl p-3.5 flex gap-2.5 items-start">
          <span className="text-orange-500 text-sm mt-0.5">ⓘ</span>
          <p className="text-[11px] text-zinc-400 leading-relaxed font-medium">
            Note: Agar movie multiple audios me he to play krte time audio track me jakr change krle.
          </p>
        </div>
      </div>

      {/* 6. 5-Button Premium Action Icons Row Grid */}
      <div className="px-4 mt-6 border-b border-zinc-900/50 pb-5">
        <div className="grid grid-cols-5 gap-1 text-center">
          <button className="flex flex-col items-center gap-1.5 group">
            <span className="text-lg text-zinc-400 group-hover:text-orange-400 transition-colors">📺</span>
            <span className="text-[10px] font-bold text-zinc-500 group-hover:text-zinc-300">Trailer</span>
          </button>
          
          <button 
            onClick={() => setSelectedQuality(selectedQuality ? null : '720p')}
            className={`flex flex-col items-center gap-1.5 group ${selectedQuality ? 'text-orange-400' : ''}`}
          >
            <span className="text-lg text-zinc-400 group-hover:text-orange-400 transition-colors">📥</span>
            <span className="text-[10px] font-bold text-zinc-500 group-hover:text-zinc-300">Download</span>
          </button>

          <button className="flex flex-col items-center gap-1.5 group">
            <span className="text-lg text-zinc-400 group-hover:text-orange-400 transition-colors">🔗</span>
            <span className="text-[10px] font-bold text-zinc-500 group-hover:text-zinc-300">Share</span>
          </button>

          <button className="flex flex-col items-center gap-1.5 group">
            <span className="text-lg text-zinc-400 group-hover:text-orange-400 transition-colors">🔖</span>
            <span className="text-[10px] font-bold text-zinc-500 group-hover:text-zinc-300">Watchlist</span>
          </button>

          <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1.5 group">
            <span className="text-lg text-zinc-400 group-hover:text-orange-400 transition-colors">📢</span>
            <span className="text-[10px] font-bold text-zinc-500 group-hover:text-zinc-300">Telegram</span>
          </a>
        </div>
      </div>

      {/* 🛠️ Dynamic Server Options Drawer (Visible only when Download Button is tapped) */}
      {selectedQuality && (
        <div className="px-5 mt-5 space-y-4 bg-zinc-900/30 p-4 border border-zinc-900 rounded-2xl mx-5 animate-fadeIn">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider font-mono">Select Dynamic Quality & Server</p>
          <div className="flex gap-2">
            {(['480p', '720p', '1080p'] as const).map((q) => (
              <button 
                key={q} 
                onClick={() => { setSelectedQuality(q); setSelectedServer(null); }} 
                className={`flex-1 py-2 text-xs font-black rounded-lg border ${selectedQuality === q ? 'bg-orange-600 border-orange-400 text-white' : 'bg-zinc-950 border-zinc-800 text-zinc-400'}`}
              >
                {q}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-2">
            {['Server 1', 'Server 2', 'Server 3', 'Server 4'].map((srv) => (
              <button 
                key={srv} 
                onClick={() => setSelectedServer(srv)}
                className={`py-2 px-3 text-xs font-bold border rounded-lg text-left flex justify-between items-center ${selectedServer === srv ? 'bg-amber-600 border-amber-400 text-white' : 'bg-zinc-950 border-zinc-800 text-zinc-300'}`}
              >
                <span>🚀 {srv}</span>
              </button>
            ))}
          </div>

          {selectedServer && (
            <div className="grid grid-cols-2 gap-2 border-t border-zinc-800 pt-3 animate-fadeIn">
              <button onClick={() => handleDownloadClick('normal')} className="bg-zinc-950 border border-zinc-800 py-3 rounded-xl text-center text-xs font-bold text-zinc-200">📁 Normal DL</button>
              <button onClick={() => handleDownloadClick('1dm')} className="bg-orange-600 hover:bg-orange-700 py-3 rounded-xl text-center text-xs font-black text-white">⚡ Fast Core Engine</button>
            </div>
          )}
        </div>
      )}

      {/* 7. Beautiful Sky Blue Sky Channel Banner Footer */}
      <div className="px-5 mt-6">
        <a 
          href="https://t.me" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-full h-14 bg-gradient-to-r from-sky-500 via-sky-400 to-sky-500 rounded-xl p-3 flex items-center justify-between shadow-lg shadow-sky-500/10 cursor-pointer hover:scale-[1.01] transition-transform"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">✈️</span>
            <div className="text-left leading-tight">
              <p className="text-xs font-black text-zinc-950 uppercase tracking-wide">Join Our</p>
              <p className="text-sm font-black text-zinc-950 tracking-wider">Telegram Channel</p>
            </div>
          </div>
          <span className="bg-zinc-950/20 backdrop-blur-sm text-zinc-950 font-black text-[10px] px-3 py-1 rounded-full uppercase border border-zinc-950/10 tracking-widest">
            Join Now
          </span>
        </a>
      </div>

    </div>
  );
}
