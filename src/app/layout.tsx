import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono, Noto_Sans_Bengali, Noto_Sans_Devanagari } from 'next/font/google';
import './styles/globals.css';
import { Providers } from './providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  variable: '--font-noto-sans-bengali',
  display: 'swap',
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  variable: '--font-noto-sans-devanagari',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'BazaarConnect - India\'s Multi-Vendor Marketplace',
    template: '%s | BazaarConnect',
  },
  description: 'Buy and sell products on India\'s trusted multi-vendor marketplace. Secure payments, fast delivery, and seller protection.',
  keywords: ['marketplace', 'ecommerce', 'india', 'multi-vendor', 'buy', 'sell', 'online shopping'],
  authors: [{ name: 'BazaarConnect' }],
  creator: 'BazaarConnect',
  publisher: 'BazaarConnect',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://bazaarconnect.in',
    siteName: 'BazaarConnect',
    title: 'BazaarConnect - India\'s Multi-Vendor Marketplace',
    description: 'Buy and sell products on India\'s trusted multi-vendor marketplace.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BazaarConnect Marketplace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BazaarConnect',
    description: 'India\'s trusted multi-vendor marketplace',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.razorpay.com" />
      </head>
      <body
        className={`${inter.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} ${notoSansBengali.variable} ${notoSansDevanagari.variable} font-sans antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}