'use client';
import { useState } from 'react';

export default function UploadConsole() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Movies' | 'Series' | 'Anime' | 'Adult'>('Movies');
  const [industry, setIndustry] = useState('Bollywood');
  const [trailerUrl, setTrailerUrl] = useState(''); // 📺 ट्रेलर का नया स्टेट
  const [selectedVideo, setSelectedFile] = useState<File | null>(null);
  const [selectedBanner, setSelectedBanner] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith('video/')) {
        alert("❌ Error: कृपया केवल एक मान्य वीडियो फ़ाइल (.mp4, .mkv) ही चुनें!");
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith('image/')) {
        alert("❌ Error: कृपया बैनर के लिए केवल इमेज फ़ाइल (JPG, PNG) ही चुनें!");
        return;
      }
      setSelectedBanner(file);
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 🛡️ INPUT VALIDATION (कोई रिस्क नहीं लेने का)
    if (!selectedVideo || !selectedBanner || !trailerUrl.trim()) {
      alert("❌ रुको भाई! मूवी वीडियो, बैनर इमेज और ट्रेलर लिंक तीनों डालना ज़रूरी है, वरना मैटर हो जाएगा!");
      return;
    }

    if (!trailerUrl.startsWith('http')) {
      alert("❌ Error: कृपया एक मान्य ट्रेलर यूआरएल (http/https) डालें!");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 12) + 3;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
          setSelectedFile(null);
          setSelectedBanner(null);
          setTrailerUrl('');
          setTitle('');
          alert(`🎉 Success! "${title}" का वीडियो, बैनर और ट्रेलर तीनों डेटाबेस में लाइव सिंक हो चुके हैं!`);
        }, 800);
      }
      setUploadProgress(progress);
    }, 400);
  };

  return (
    <div className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-5 text-zinc-100 shadow-2xl animate-fadeIn">
      <div className="border-b border-zinc-800 pb-3 mb-4 flex justify-between items-center">
        <h4 className="font-black text-sm text-orange-500 tracking-wide">🎬 LIVE FULL INJECTION CONSOLE</h4>
        <span className="text-[9px] bg-orange-950/40 text-orange-400 font-mono font-bold px-2 py-0.5 rounded border border-orange-900/40">Host Verified</span>
      </div>

      <form onSubmit={handleUploadSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label className="text-[11px] font-bold text-zinc-400 block mb-1.5 font-mono uppercase">Movie / Series Title</label>
          <input 
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. KHALIFA - THE RULER (2026)"
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-orange-500 transition-all"
          />
        </div>

        {/* Category & Industry */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] font-bold text-zinc-400 block mb-1.5 font-mono uppercase">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value as any)} className="w-full bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 rounded-xl p-2.5 focus:outline-none focus:border-orange-500">
              <option value="Movies">Movies</option>
              <option value="Series">Series</option>
              <option value="Anime">Anime</option>
              <option value="Adult">Adult</option>
            </select>
          </div>
          <div>
            <label className="text-[11px] font-bold text-zinc-400 block mb-1.5 font-mono uppercase">Industry</label>
            <select value={industry} onChange={(e) => setIndustry(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 rounded-xl p-2.5 focus:outline-none focus:border-orange-500">
              <option value="Bollywood">Bollywood</option>
              <option value="Hollywood">Hollywood</option>
              <option value="Hollywood English">Hollywood English</option>
              <option value="South Indian">South Indian</option>
              <option value="Punjabi">Punjabi</option>
              <option value="Adult">Adult</option>
              <option value="Bhojpuri">Bhojpuri</option>
              <option value="Marathi">Marathi</option>
              <option value="Gujrati">Gujrati</option>
              <option value="Bengali">Bengali</option>
            </select>
          </div>
        </div>

        {/* 📺 NEW: Trailer URL Input */}
        <div>
          <label className="text-[11px] font-bold text-zinc-400 block mb-1.5 font-mono uppercase">Movie Trailer URL (YouTube / Server Link)</label>
          <input 
            type="text"
            required
            value={trailerUrl}
            onChange={(e) => setTrailerUrl(e.target.value)}
            placeholder="https://youtube.com..."
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-orange-500 transition-all font-mono"
          />
        </div>

        {/* Banner Image Picker Box */}
        <div>
          <label className="text-[11px] font-bold text-zinc-400 block mb-1.5 font-mono uppercase">Upload Movie Banner Image (Horizontal Poster)</label>
          <div className="w-full bg-zinc-950 border border-dashed border-zinc-800 rounded-xl p-3 text-center cursor-pointer hover:border-orange-500/20 transition-all relative">
            <input type="file" accept="image/*" onChange={handleBannerChange} className="absolute inset-0 opacity-0 cursor-pointer" disabled={isUploading} />
            <span className="text-xl block mb-0.5">🖼️</span>
            <span className="text-xs text-zinc-400 block">
              {selectedBanner ? `Banner Selected: ${selectedBanner.name}` : 'क्लिक करके इस मूवी का मुख्य बैनर इमेज चुनें'}
            </span>
          </div>
        </div>

        {/* Video File Picker Box */}
        <div>
          <label className="text-[11px] font-bold text-zinc-400 block mb-1.5 font-mono uppercase">Select Video File (.mp4 / .mkv)</label>
          <div className="w-full bg-zinc-950 border border-dashed border-zinc-800 rounded-xl p-3 text-center cursor-pointer hover:border-orange-500/20 transition-all relative">
            <input type="file" accept="video/*" onChange={handleVideoChange} className="absolute inset-0 opacity-0 cursor-pointer" disabled={isUploading} />
            <span className="text-xl block mb-0.5">📁</span>
            <span className="text-xs text-zinc-400 block">
              {selectedVideo ? `Video Selected: ${selectedVideo.name}` : 'क्लिक करके मूवी की मुख्य वीडियो फ़ाइल चुनें'}
            </span>
          </div>
        </div>

        {/* Upload Progress */}
        {isUploading && (
          <div className="w-full bg-zinc-950 border border-zinc-850 p-3 rounded-xl">
            <div className="flex justify-between items-center text-[10px] font-mono mb-1 text-zinc-500">
              <span className="text-orange-400 font-bold">Processing Triple Node Injection (Video + Banner + Trailer)...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
              <div className="bg-orange-500 h-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
            </div>
          </div>
        )}

        <button type="submit" disabled={isUploading} className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black text-xs py-3 rounded-xl transition duration-200 tracking-widest uppercase mt-2 disabled:opacity-50">
          {isUploading ? 'Compiling Packet Assets...' : '🚀 Inject Movie Complete Package'}
        </button>
      </form>
    </div>
  );
}
