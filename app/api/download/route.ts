import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const movieId = searchParams.get('id');

  // यहाँ हम डमी लिंक्स रख रहे हैं, बाद में इसे डेटाबेस (MongoDB) से कनेक्ट करेंगे
  const movieLinks: { [key: string]: string } = {
    '1': 'https://w3schools.com', // डमी टेस्ट वीडियो लिंक 1
    '2': 'https://w3schools.com',   // डमी टेस्ट वीडियो लिंक 2
    '3': 'https://w3schools.com', // डमी टेस्ट वीडियो लिंक 3
  };

  const actualStorageUrl = movieLinks[movieId || ''];

  if (!actualStorageUrl) {
    return NextResponse.json({ error: 'Movie file not found!' }, { status: 404 });
  }

  // Content-Disposition header ब्राउज़र को मजबूर करता है कि वो वीडियो प्ले करने के बजाय 
  // सीधे सिंगल-क्लिक में डाउनलोड शुरू कर दे।
  return new NextResponse(null, {
    status: 302,
    headers: {
      'Location': actualStorageUrl,
      'Content-Disposition': `attachment; filename="Streamflix-Movie-${movieId}.mp4"`,
      'Content-Type': 'video/mp4',
    },
  });
}
