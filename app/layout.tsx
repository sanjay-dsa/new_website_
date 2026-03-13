import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Cormorant_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Aurum | Fine Dining Excellence',
  description: 'Experience culinary artistry at its finest. Aurum offers an unforgettable fine dining journey with exquisite dishes crafted by world-renowned chefs.',
  keywords: ['fine dining', 'restaurant', 'gourmet', 'luxury dining', 'culinary excellence'],
  authors: [{ name: 'Aurum Restaurant' }],
  openGraph: {
    title: 'Aurum | Fine Dining Excellence',
    description: 'Experience culinary artistry at its finest',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${playfair.variable} ${cormorant.variable} font-sans antialiased bg-background text-foreground`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
