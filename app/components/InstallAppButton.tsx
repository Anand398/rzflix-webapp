'use client';
import { useEffect, useState } from 'react';

export default function InstallAppButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    });
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('User installed the Web APK!');
    }
    setDeferredPrompt(null);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-zinc-900 p-4 border border-zinc-800 rounded-xl flex items-center justify-between z-50 shadow-2xl max-w-md mx-auto">
      <div>
        <h4 className="text-orange-500 font-bold text-sm">Streamflix App Install Karein</h4>
        <p className="text-zinc-400 text-xs">Fast downloading aur premium streaming ke liye</p>
      </div>
      <button 
        onClick={handleInstallClick}
        className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs py-2 px-4 rounded-md transition duration-200"
      >
        Install 📲
      </button>
    </div>
  );
}
