import Navbar from '@/components/Navbar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import React from 'react'

// Fuente elegante importada desde Google Fonts (Playfair Display)
import { Playfair_Display } from 'next/font/google'
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.className} bg-background dark:bg-background-dark text-text-main dark:text-text-dark-main antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <Header />
          <main className="w-full max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
