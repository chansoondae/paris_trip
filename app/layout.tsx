import type { Metadata } from 'next';
import { Noto_Sans_KR, Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import BottomNav from '@/components/BottomNav';
import FontSizeProvider from '@/components/FontSizeProvider';

const notoSansKR = Noto_Sans_KR({
  variable: '--font-noto-sans-kr',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});

const playfairDisplay = Playfair_Display({
  variable: '--font-playfair-display',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
});

export const metadata: Metadata = {
  title: '🇫🇷 파리 2026 여행 플래너',
  description: '경애·경숙·경미·경화의 파리 여행 일정 플래너 (2026.04.24~27)',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🇫🇷</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${notoSansKR.variable} ${playfairDisplay.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#FAF7F2] text-[#1A2332]">
        <FontSizeProvider />
        <div className="pb-20">{children}</div>
        <BottomNav />
      </body>
    </html>
  );
}
