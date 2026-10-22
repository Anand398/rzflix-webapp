import { NextResponse } from 'next/server';
import crypto from 'crypto';

// Global scope initialization to prevent compilation errors
declare global {
    var activeTokens: Map<string, { movieId: string; expiresAt: number }>;
    var rateLimitMap: Map<string, { count: number; resetTime: number }>;
}

if (!global.activeTokens) global.activeTokens = new Map();
if (!global.rateLimitMap) global.rateLimitMap = new Map();

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { movieId } = body;
        
        // 1. Host Key Validation Check
        const hostKey = request.headers.get('x-host-key');
        if (!hostKey || hostKey !== 'streamflix-host-node-2026') {
            return NextResponse.json({ error: 'Unauthorized host key allocation.' }, { status: 403 });
        }

        // 2. Strict Rate Limiting: Max 2 requests per minute
        const currentTime = Date.now();
        const limitWindow = 60 * 1000;
        const userLimitData = global.rateLimitMap.get(hostKey) || { count: 0, resetTime: currentTime + limitWindow };

        if (currentTime > userLimitData.resetTime) {
            userLimitData.count = 1;
            userLimitData.resetTime = currentTime + limitWindow;
        } else {
            userLimitData.count++;
        }
        global.rateLimitMap.set(hostKey, userLimitData);

        if (userLimitData.count > 2) {
            return NextResponse.json(
                { error: 'Too many requests. Limit exceeded (Max 2 per minute).' }, 
                { status: 429 }
            );
        }

        // 3. Dynamic URL Token Generation
        const streamToken = crypto.randomBytes(16).toString('hex');
        const expiresAt = currentTime + (2 * 60 * 60 * 1000); // 2 Hours Valid

        global.activeTokens.set(streamToken, { movieId, expiresAt });

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com';
        const dynamicStreamUrl = `${baseUrl}/api/stream/${streamToken}.m3u8`;

        return NextResponse.json({ streamUrl: dynamicStreamUrl });

    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
