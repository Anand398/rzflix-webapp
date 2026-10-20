import './globals.css';
import { DownloadProvider } from './context';

export const metadata = {
  title: 'Streamflix - 1DM Engine v1',
  description: 'Fast HLS Downloader App',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <DownloadProvider>
          {children}
        </DownloadProvider>
      </body>
    </html>
  );
}
