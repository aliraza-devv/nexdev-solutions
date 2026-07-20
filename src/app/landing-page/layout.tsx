import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export default function LandingPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.variable} font-sans bg-white text-[#0A0A0E] min-h-screen w-full antialiased`}>
      {children}
    </div>
  );
}
