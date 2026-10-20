'use client';
import { useDownloads } from '../context';

export default function DownloadManager() {
  const { activeDownloads } = useDownloads();

  return (
    <div className="max-w-2xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-zinc-100 shadow-2xl mt-4 min-h-[400px]">
      <div className="flex justify-between items-center border-b border-zinc-800 pb-3 mb-4">
        <h3 className="font-black text-base text-orange-500 tracking-wide">📥 1DM ACTIVE DOWNLOADS</h3>
        <span className="text-[10px] bg-zinc-950 px-2.5 py-1 rounded-full border border-zinc-800 text-zinc-400 font-mono">
          Task Count: {activeDownloads.length}
        </span>
      </div>

      {activeDownloads.length === 0 ? (
        <div className="text-center py-20 bg-zinc-950/40 border border-zinc-800/50 border-dashed rounded-xl">
          <p className="text-sm Regal text-zinc-500">कोई एक्टिव डाउनलोड्स नहीं चल रहे हैं।</p>
          <p className="text-[11px] text-zinc-600 mt-1">होम स्क्रीन पर जाकर मूवी डाउनलोड शुरू करें।</p>
        </div>
      ) : (
        <div className="space-y-4">
          {activeDownloads.map((task) => (
            <div key={task.id} className="bg-zinc-950 border border-zinc-800/80 p-4 rounded-xl flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-black text-sm text-zinc-200">{task.title}</h4>
                  <p className="text-[10px] text-zinc-500 mt-0.5 font-mono uppercase">{task.quality} • {task.server}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase font-mono border ${
                  task.status === 'completed' 
                    ? 'bg-emerald-950/50 border-emerald-900 text-emerald-400' 
                    : 'bg-orange-950/50 border-orange-900 text-orange-400'
                }`}>
                  {task.status}
                </span>
              </div>

              {/* Progress Loading Bar */}
              <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden mt-1">
                <div 
                  className={`h-full transition-all duration-300 ${task.status === 'completed' ? 'bg-emerald-500' : 'bg-gradient-to-r from-orange-500 to-amber-500'}`}
                  style={{ width: `${task.progress}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-[11px] font-mono text-zinc-500">
                <span>Progress: <strong className="text-zinc-300">{task.progress}%</strong></span>
                <span>Speed: <strong className="text-orange-400">{task.speed}</strong></span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
