import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import { ReactQueryProvider } from '@/providers/ReactQueryProvider';
import { Toaster } from 'sonner';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#0F0D0B',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.foxal.in'),
  title: {
    default: 'FOXAL | 100% Charcoal-Free Natural Incense Sticks & Cones',
    template: '%s | FOXAL Natural Incense',
  },
  description:
    'Experience pure spiritual aroma with FOXAL. Handcrafted charcoal-free incense sticks (250g) and dhoop cones (60 pcs). Organic, non-toxic, enriched with sacred temple flowers and Ayurvedic herbs.',
  keywords: [
    'FOXAL',
    'natural incense sticks',
    'charcoal free incense',
    'organic dhoop cones',
    'incense cones',
    'agarbatti India',
    'temple flower incense',
    'breathe pure',
    'kasturi incense',
    'oudh incense',
    'sandalwood dhoop',
  ],
  authors: [{ name: 'FOXAL Organics India' }],
  creator: 'FOXAL',
  publisher: 'FOXAL',
  openGraph: {
    title: 'FOXAL | 100% Charcoal-Free Natural Incense',
    description:
      'Handcrafted natural incense sticks & cones. No charcoal, no toxic black smoke. Pure organic fragrance for prayer, yoga and mindful living.',
    url: 'https://www.foxal.in',
    siteName: 'FOXAL',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FOXAL | Pure Charcoal-Free Incense',
    description: 'Breathe clean spirituality with 100% natural incense sticks and cones.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-[#FAF7F2] text-[#0F0D0B] font-sans antialiased selection:bg-gold selection:text-white">
        <ReactQueryProvider>
          {children}
          <Toaster
            position="top-right"
            richColors
            toastOptions={{
              style: {
                background: '#0F0D0B',
                color: '#FAF7F2',
                border: '1px solid rgba(200, 146, 42, 0.4)',
                fontFamily: 'var(--font-inter)',
              },
            }}
          />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
