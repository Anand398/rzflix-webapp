import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const fallbackMovies = [
      { id: '1', title: 'KHALIFA - THE RULER', year: '2026', category: 'Movies', industry: 'Bollywood', lang: 'Hindi' },
      { id: '2', title: 'JAILER 2', year: '2026', category: 'Movies', industry: 'South Indian', lang: 'Hindi Dub' },
      { id: '3', title: 'DARK WEB CHRONICLES', year: '2025', category: 'Series', industry: 'Hollywood', lang: 'English' },
      { id: '4', title: 'NARUTO SHIPPUDEN', year: '2026', category: 'Anime', industry: 'Hollywood', lang: 'Hindi Dub' },
      { id: '5', title: 'PREMIUM ADULT SERIES', year: '2026', category: 'Adult', industry: 'Bollywood', lang: 'Hindi' },
    ];
    return NextResponse.json(fallbackMovies, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
