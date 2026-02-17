import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'
import { StoreProvider } from '@/context/store-context'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ShopHub - Modern Storefront',
  description: 'A minimal and elegant e-commerce storefront built with shadcn components',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-background text-foreground">
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  )
}
