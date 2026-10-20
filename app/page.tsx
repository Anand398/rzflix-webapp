'use client';
import { useState } from 'react';
import BottomNav from './components/BottomNav';
import MovieDetails from './components/MovieDetails';
import DownloadManager from './components/DownloadManager';
import SearchPanel from './components/SearchPanel';
import InstallAppButton from './components/InstallAppButton';
import AdScripts from './components/AdScripts';
import AdminPanel from './components/AdminPanel';

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<'Movies' | 'Series' | 'Anime' | 'Adult'>('Movies');
  const [selectedSubFilter, setSelectedSubFilter] = useState<string>('All');
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);

  const movieDatabase = [
    { id: '1', title: 'Nayyi Navelli 2026', type: 'HDTC-V2', category: 'Movies', industry: 'Bollywood', tag: 'Latest Movies', img: 'https://placeholder.com' },
    { id: '2', title: 'Prahaar 2026', type: 'HDTC', category: 'Movies', industry: 'Bollywood', tag: 'Latest Movies', img: 'https://placeholder.com' },
    { id: '3', title: 'Jailer 2 2026', type: 'HDTC-V2', category: 'Movies', industry: 'South Indian', tag: 'Latest Movies', img: 'https://placeholder.com' }
  ];

  const latestMovies = movieDatabase.filter(m => m.category === selectedCategory && (selectedSubFilter === 'All' || m.industry === selectedSubFilter));

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-orange-500 selection:text-white pb-24">
      
      {/* Sticky Category Tabs Header */}
      {activeTab === 'home' && !selectedMovieId && (
        <div className="sticky top-0 bg-zinc-950/90 backdrop-blur-md z-40 border-b border-zinc-900/50">
          <div className="flex justify-around py-3 px-4 text-sm font-black tracking-wider text-zinc-400">
            {(['Movies', 'Series', 'Anime', 'Adult'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setSelectedSubFilter('All'); }}
                className={`transition-all relative py-1 ${selectedCategory === cat ? 'text-white scale-105' : 'hover:text-zinc-200'}`}
              >
                {cat}
                {selectedCategory === cat && <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-cyan-500 rounded-full" />}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Framework Tabs Routing Body Layout */}
      <div className="p-4 max-w-6xl mx-auto space-y-6">
        
        {activeTab === 'home' && (
          <div>
            {selectedMovieId ? (
              <div className="animate-fadeIn">
                <button onClick={() => setSelectedMovieId(null)} className="mb-4 text-xs font-bold text-orange-400 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg">← Back to Home</button>
                <MovieDetails />
              </div>
            ) : (
              <div className="space-y-6 animate-fadeIn">
                {selectedCategory === 'Movies' && (
                  <div className="space-y-4">
                    {/* Industry Filters Navigation Row Carousel */}
                    <div>
                      <p className="text-xs font-bold text-zinc-400 mb-2 uppercase tracking-wide">Browse By Industry</p>
                      <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
                        {['All', 'Bollywood', 'Hollywood', 'Hollywood English', 'South Indian', 'Punjabi', 'Adult', 'Bhojpuri', 'Marathi', 'Gujrati', 'Bengali'].map((ind) => (
                          <button 
                            key={ind} 
                            onClick={() => setSelectedSubFilter(ind)} 
                            className={`py-2 px-5 rounded-xl text-xs font-black border transition-all whitespace-nowrap ${selectedSubFilter === ind ? 'bg-orange-600 border-orange-400 text-white shadow-lg' : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'}`}
                          >
                            {ind}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Genres Filters Navigation Row Carousel */}
                    <div>
                      <p className="text-xs font-bold text-zinc-400 mb-2 uppercase tracking-wide">Browse By Genre</p>
                      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                        {['Western', 'War', 'Thriller', 'Suspense', 'Spy', 'Sci-fi', 'Satire', 'Romance', 'Psychology', 'Political', 'Mystery', 'Legal', 'Korean', 'Horror', 'History', 'Heist', 'Drama', 'Documentary', 'Comedy', 'Crime'].map((genre) => (
                          <button key={genre} className="py-1.5 px-4 rounded-full text-xs font-medium border border-zinc-800 bg-zinc-900/40 text-zinc-400 whitespace-nowrap">
                            {genre}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Main Content Dynamic Poster Carousel Cards View */}
                <div>
                  <h3 className="text-base font-black tracking-wide border-l-3 border-cyan-500 pl-2 mb-3">Latest {selectedCategory}</h3>
                  <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
                    {latestMovies.map((movie) => (
                      <div key={movie.id} onClick={() => setSelectedMovieId(movie.id)} className="w-[135px] flex-shrink-0 cursor-pointer">
                        <div className="relative aspect-[2/3] bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                          <img src={movie.img} alt={movie.title} className="w-full h-full object-cover" />
                          <span className="absolute top-1.5 left-1.5 bg-black/70 text-[8px] font-extrabold px-1.5 py-0.5 rounded text-zinc-200 border border-zinc-800 font-mono">{movie.type}</span>
                        </div>
                        <h4 className="font-bold text-xs mt-2 text-zinc-300 truncate">{movie.title}</h4>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>
        )}

        {activeTab === 'search' && <SearchPanel onSelectMovie={setSelectedMovieId} />}
        {activeTab === 'download' && <DownloadManager />}
        {activeTab === 'more' && <AdminPanel />}
        
      </div>

      <InstallAppButton />
      <AdScripts />
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </main>
  );
}
