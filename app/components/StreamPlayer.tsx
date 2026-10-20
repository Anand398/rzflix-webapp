'use client';
import { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export default function StreamPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (videoRef.current) {
      // Initialize Video.js player with HLS support
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        autoplay: false,
        preload: 'auto',
        fluid: true,
        responsive: true,
      });

      playerRef.current.src({ src, type: 'application/x-mpegURL' });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [src]);

  return (
    <div className="w-full max-w-4xl mx-auto bg-black rounded-xl overflow-hidden border border-zinc-800 shadow-2xl my-6">
      <div data-vjs-player>
        <video ref={videoRef} className="video-js vjs-big-play-centered vjs-theme-city w-full" />
      </div>
    </div>
  );
}
