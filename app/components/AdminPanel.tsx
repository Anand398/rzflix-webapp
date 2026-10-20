'use client';
import { useState, useEffect } from 'react';
import UploadConsole from './UploadConsole';

export default function AdminPanel() {
  const [isHostDevice, setIsHostDevice] = useState(false);
  const [secretInput, setSecretInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Live Ad Revenue State
  const [walletBalance, setWalletBalance] = useState('0.00');

  // Master Key
  const MASTER_HOST_KEY = "streamflix-host-node-2026";

  // 🔄 लाइव अर्निंग सिमुलेशन: जब भी यूजर ऐड देखेगा, बैंक वॉलेट में बैलेंस बढ़ेगा
  useEffect(() => {
    if (isHostDevice) {
      const savedBalance = localStorage.getItem('streamflix_wallet') || '12.45';
      setWalletBalance(savedBalance);

      // हर कुछ सेकंड में एडस्टेरा रेवेन्यू इंप्रेशन को सिमुलेट करना
      const interval = setInterval(() => {
        setWalletBalance(prev => {
          const current = parseFloat(prev);
          const newBalance = (current + (Math.random() * 0.05 + 0.01)).toFixed(2);
          localStorage.setItem('streamflix_wallet', newBalance);
          return newBalance;
        });
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [isHostDevice]);

  const verifyHostDevice = () => {
    if (secretInput === MASTER_HOST_KEY) {
      setIsHostDevice(true);
      setSecretInput('');
    } else {
      alert("❌ Access Denied: Invalid Host Token Protocol!");
    }
  };

  if (!isHostDevice) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl text-center max-w-2xl mx-auto">
        <h3 className="font-black text-sm text-zinc-300 border-b border-zinc-800 pb-3 mb-4 font-mono uppercase tracking-wider">🔒 Streamflix App Security Panel</h3>
        <p className="text-xs text-zinc-500 mb-4">यह सेक्शन सुरक्षित है। होस्ट या ओनरशिप डिवाइसेस को सिंक करने के लिए सीक्रेट टोकन की दर्ज करें।</p>
        <div className="flex gap-2 max-w-sm mx-auto items-center">
          <div className="relative w-full flex items-center">
            <input 
              type={showPassword ? "text" : "password"}
              value={secretInput}
              onChange={(e) => setSecretInput(e.target.value)}
              placeholder="Enter Host Device Verification Key..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-3 pr-14 py-2 text-xs text-zinc-200 focus:outline-none focus:border-orange-500 font-mono"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 text-zinc-500 hover:text-zinc-300 font-bold text-[10px] uppercase tracking-wider focus:outline-none">{showPassword ? "Hide" : "Show"}</button>
          </div>
          <button onClick={verifyHostDevice} className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-black px-4 py-2 rounded-xl transition duration-200">Verify</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-3 mb-4">
          <h3 className="font-black text-base text-orange-500">☰ STREAMFLIX ADVANCED SETTINGS</h3>
          <button onClick={() => setIsHostDevice(false)} className="text-[10px] bg-zinc-950 border border-zinc-800 text-zinc-500 font-bold px-2 py-1 rounded hover:text-red-400">Lock Panel</button>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-zinc-950 rounded-xl border border-zinc-850">
            <div><p className="text-sm font-bold">Multi-Device Backup Sync</p><p className="text-[11px] text-zinc-500">Link node server keys</p></div>
            <button className="bg-zinc-900 border border-zinc-800 text-orange-400 text-xs font-bold py-1.5 px-3 rounded-lg">Configure</button>
          </div>
          
          {/* Live Monetization Wallet Row */}
          <div className="flex justify-between items-center p-3 bg-zinc-950 rounded-xl border border-zinc-850">
            <div>
              <p className="text-sm font-bold">Adsterra Revenue Wallet</p>
              <p className="text-[11px] text-zinc-500">Live active CPM impressions balance</p>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-black bg-emerald-950/30 border border-emerald-900/50 px-3 py-1.5 rounded animate-pulse">
              $ {walletBalance} USD
            </span>
          </div>
        </div>
      </div>
      <UploadConsole />
    </div>
  );
}
