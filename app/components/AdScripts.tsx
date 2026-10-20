'use client';
import { useEffect, useState } from 'react';

export default function AdScripts() {
  const [showAdOverlay, setShowAdOverlay] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [onAdCompleteCallback, setOnAdCompleteCallback] = useState<(() => void) | null>(null);

  useEffect(() => {
    // ग्लोबल ट्रिगर जो डाउनलोड बटन दबाने पर कॉल होगा
    (window as any).executePopunder = (callback: () => void) => {
      console.log('⚡ Streamflix Monetization: Safe In-App Interstitial Active!');
      setOnAdCompleteCallback(() => callback);
      setCountdown(5); // 5 सेकंड का जबरदस्ती होल्ड (Forced Stop)
      setShowAdOverlay(true);
    };
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showAdOverlay && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (showAdOverlay && countdown === 0) {
      setShowAdOverlay(false);
      if (onAdCompleteCallback) {
        onAdCompleteCallback(); // ऐड खत्म होते ही डाउनलोड एक्शन चालू करें
      }
    }
    return () => clearTimeout(timer);
  }, [showAdOverlay, countdown, onAdCompleteCallback]);

  if (!showAdOverlay) return null;

  return (
    <div className="fixed inset-0 bg-zinc-950/95 backdrop-blur-md z-[9999] flex flex-col items-center justify-center p-6 selection:bg-orange-500">
      <div className="max-w-sm w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center shadow-2xl relative overflow-hidden">
        
        {/* Top Header Label */}
        <div className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 mb-4">
          Sponsored Advertisement
        </div>

        {/* Dynamic Ad Block Frame Content */}
        <div className="w-full aspect-video bg-zinc-950 border border-zinc-800 rounded-xl flex flex-col items-center justify-center gap-3 p-4 my-4 cursor-pointer hover:border-orange-500/30 transition-all">
          <span className="text-3xl animate-bounce">🎁</span>
          <div>
            <h4 className="text-sm font-black text-orange-400">WIN PREMIUM REWARDS!</h4>
            <p className="text-[11px] text-zinc-500 mt-1">Click here to claim your mega streaming credits.</p>
          </div>
        </div>

        {/* Counter System Note */}
        <div className="mt-6 text-xs text-zinc-400 font-medium">
          आपका डाउनलोड बैकग्राउंड में तैयार हो रहा है...
          <div className="text-orange-500 font-black text-lg mt-1 font-mono">
            {countdown}s
          </div>
        </div>

        <p className="text-[10px] text-zinc-600 mt-4 font-mono">Adsterra Smart Rate Verification Active</p>
      </div>
    </div>
  );
}
