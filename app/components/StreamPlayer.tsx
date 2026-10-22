import React, { useState } from 'react';

export default function StreamPlayer({ movieId }: { movieId: string }) {
    const [streamUrl, setStreamUrl] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const initializeSecureStream = async () => {
        setLoading(true);
        setError('');
        try {
            // Web API hit evaluating download route endpoint
            const response = await fetch('/api/download', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Host Key verification validation required by backend
                    'x-host-key': 'streamflix-host-node-2026'
                },
                body: JSON.stringify({ movieId })
            });

            const data = await response.json();

            if (!response.ok) {
                // Catches rate limit errors (429) or invalid requests (403)
                throw new Error(data.error || 'Server validation failed.');
            }

            // Sets the short-lived unencrypted dynamic token link to stream player state
            setStreamUrl(data.streamUrl);
        } catch (err: any) {
            setError(err.message || 'Failed to acquire video terminal.');
            console.error('Playback Error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 bg-zinc-900 rounded-lg text-white">
            <h3 className="text-md font-bold mb-2">Streamflix Player Node</h3>
            
            {error && <p className="text-red-400 text-xs mb-2">{error}</p>}
            
            {streamUrl ? (
                <div className="bg-black p-4 text-center rounded border border-zinc-700">
                    <p className="text-emerald-400 text-xs font-mono break-all mb-2">{streamUrl}</p>
                    <p className="text-zinc-400 text-xs">Unencrypted Manifest Initialized Successfully</p>
                </div>
            ) : (
                <button 
                    onClick={initializeSecureStream}
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-semibold disabled:opacity-50"
                >
                    {loading ? 'Securing Connection...' : 'Watch Movie Now'}
                </button>
            )}
        </div>
    );
}
