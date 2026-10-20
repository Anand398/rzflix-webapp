'use client';
import { useState } from 'react';

interface MovieItem {
  id: string;
  title: string;
  year: string;
  category: 'Movies' | 'Series' | 'Anime' | 'Adult';
  lang: string;
}

export default function SearchPanel({ onSelectMovie }: { onSelectMovie: (id: string) => void }) {
  const [searchQuery, setSearchQuery] = useState('');

  const movieDatabase: MovieItem[] = [
    { id: '1', title: 'KHALIFA - THE RULER', year: '2026', category: 'Movies', lang: 'Hindi' },
    { id: '2', title: 'JAILER 2', year: '2026', category: 'Movies', lang: 'South Indian' },
    { id: '3', title: 'DARK WEB CHRONICLES', year: '2025', category: 'Series', lang: 'English' },
    { id: '4', title: 'NARUTO SHIPPUDEN', year: '2026', category: 'Anime', lang: 'Hindi Dub' },
    { id: '5', title: 'PREMIUM ADULT SERIES', year: '2026', category: 'Adult', lang: 'Hindi' },
  ];

  const filteredMovies = movieDatabase.filter(movie => 
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto text-zinc-100 pb-24">
      <div className="relative mb-6">
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Type movie name to search..." 
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-orange-500 text-zinc-200 transition-all shadow-inner"
        />
        <span className="absolute left-3.5 top-3.5 text-zinc-500">🔍</span>
      </div>

      <div>
        <h3 className="text-sm font-bold text-zinc-400 mb-4 border-l-2 border-orange-500 pl-2">Results</h3>
        {filteredMovies.length === 0 ? (
          <div className="text-center py-12 bg-zinc-900/40 border border-zinc-800 rounded-xl">
            <p className="text-sm text-zinc-500">कोई मूवी नहीं मिली!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {filteredMovies.map((movie) => (
              <div key={movie.id} onClick={() => onSelectMovie(movie.id)} className="bg-zinc-900 border border-zinc-800 p-3 rounded-xl hover:border-orange-500/40 transition-all cursor-pointer group">
                <div className="aspect-[2/3] bg-zinc-950 rounded-lg flex items-center justify-center mb-3 text-zinc-700 border border-zinc-800 text-xs font-mono relative overflow-hidden">
                  <span>POSTER</span>
                </div>
                <h4 className="font-black text-xs text-zinc-200 truncate group-hover:text-orange-400 transition-colors">{movie.title}</h4>
                <p className="text-[10px] text-zinc-500 mt-0.5 font-mono">{movie.year} • {movie.lang}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
