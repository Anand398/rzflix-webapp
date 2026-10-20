'use client';
import { createContext, useContext, useState, useEffect } from 'react';

export interface ActiveDownload {
  id: string;
  title: string;
  quality: string;
  server: string;
  progress: number;
  speed: string;
  status: 'downloading' | 'completed' | 'paused';
}

interface DownloadContextType {
  activeDownloads: ActiveDownload[];
  startNewDownload: (id: string, title: string, quality: string, server: string) => void;
}

const DownloadContext = createContext<DownloadContextType | undefined>(undefined);

export function DownloadProvider({ children }: { children: React.ReactNode }) {
  const [activeDownloads, setActiveDownloads] = useState<ActiveDownload[]>([]);

  // App लोड होते ही Active Progress Storage (localStorage) से पुराना डेटा उठाना
  useEffect(() => {
    const saved = localStorage.getItem('streamflix_downloads');
    if (saved) setActiveDownloads(JSON.parse(saved));
  }, []);

  // जब भी कोई डाउनलोड अपडेट हो, उसे Storage में परमानेंटली सेव करना
  useEffect(() => {
    localStorage.setItem('streamflix_downloads', JSON.stringify(activeDownloads));
  }, [activeDownloads]);

  const startNewDownload = (id: string, title: string, quality: string, server: string) => {
    const downloadId = `${id}-${quality}-${Date.now()}`;
    const newDownload: ActiveDownload = {
      id: downloadId,
      title,
      quality,
      server,
      progress: 0,
      speed: '4.5 MB/s',
      status: 'downloading'
    };

    setActiveDownloads(prev => [newDownload, ...prev]);

    // Background Multi-threaded Chunks Simulating Engine
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 8) + 3;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setActiveDownloads(prev => 
          prev.map(d => d.id === downloadId ? { ...d, progress: 100, status: 'completed', speed: 'Done' } : d)
        );
      } else {
        setActiveDownloads(prev => 
          prev.map(d => d.id === downloadId ? { ...d, progress: currentProgress, speed: `${(Math.random() * 3 + 5).toFixed(1)} MB/s` } : d)
        );
      }
    }, 500);
  };

  return (
    <DownloadContext.Provider value={{ activeDownloads, startNewDownload }}>
      {children}
    </DownloadContext.Provider>
  );
}

export function useDownloads() {
  const context = useContext(DownloadContext);
  if (!context) throw new Error('useDownloads must be used within a DownloadProvider');
  return context;
}
