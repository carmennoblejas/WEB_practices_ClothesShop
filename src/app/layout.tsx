// src/app/(sections)/layout.tsx
import type { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'
import '/src/app/globals.css' 
import { ThemeProvider } from 'next-themes'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Bag Shop',
  description: 'Your perfect shop to find your dream bag',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${playfair.className} bg-gray-900 text-white antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
